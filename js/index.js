document.addEventListener('DOMContentLoaded', e => {
    //create a variable for the monster container
    // create a form element to input the monster data
    //create a number variable for pagination
    
    let container = document.querySelector('#monster-container')
    let form = document.createElement('form')
    let baseUrl = "http://localhost:3000/monsters/"
    let number = 1

    //get the monster data
    function fetchData(number) {
        fetch(baseUrl + '?_limit=50&_page=' + number)
        .then(response => response.json())
        .then(monsters => renderMonsters(monsters))
    }

    //create the 'renderMonsters' function mentioned directly above
    function renderMonsters(monsters) {
        for (const monster of monsters) {
            renderMonster(monster)
            // console.log(monster)
        }
    }

    //create the function to render a single monster, mentioned directly above
    function renderMonster(monster) {
        let div = document.createElement('div') //create a variable for the element that will contain the monster
        div.classList.add('monster')  // add the monster instance into the element created above
        div.innerHTML = `    
        <h1>${monster.name}</h1>
        <h3>Age: ${monster.age}</h3>
        <p>Bio: ${monster.description}</p>` //create the html tags for the info of the monster

        container.append(div) //append the newly created monster to the monster-container --> line 6
    }

    // create the form to manually create new instances of a monster
    function createForm() {
        //create a variable to grab the area where a new monster will be contained
        let formDiv = document.querySelector("#create-monster")

        //use the 'form' variable created at the outermost scope 
        form.classList.add('form')  //add the 'form' class to 'form' element created on line 7
        form.innerHTML = `
        <input type="text" name="name" value="name">
        <input type="text" name="age" value="age">
        <input type="text" name="description" value="description">
        <input type="submit" value="Create Monster"> 
        ` //create all the individual input fields for each required piece of information

        //append the form to the formDiv
        formDiv.append(form)
    }

    //create an event listener for the 'submit' button for the create monster form
    form.addEventListener('submit', e => {
        e.preventDefault()

        // create variables for each form field
        let name = form.name.value
        let age = form.age.value
        let bio = form.description.value

        // for simplicity, create a variable that contains the details for the 
        // fetch-POST method
        options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                age: age,
                description: bio
            })
        }
        
        //use the fetch-POST method to update the DOM
        fetch('http://localhost:3000/monsters', options)
        .then(response => response.json())
        .then(monster => renderMonster(monster)) //use the renderMonster function created aove to show/render the newly created monster
    })


    //create function to remove the current list of monsters --> for pagination function afterwards
    function removeMonsters() {
        let monsters = document.querySelectorAll('.monster') // select all instances with the class of "monster"
        
        // use the for...of iterator to iterate through the monsters variable above
        // that contains all instances of monster on the page
        // and create a nested function to response to each of those instances
        // ('*') means to select any tag, in this case, any tag within the container ---> meaning every instance
        // chain with a .forEach method to remove each indiviual instance
        for (const monster of monsters) {
            container.querySelectorAll('*').forEach(i => i.remove())
        } 
    }


    //create a function for pagination
    // document will need an event listener for 'click'
    // conditional for the 'back' and 'forward' buttons
    // number variable created at outermost scope
    document.addEventListener('click', e => {
        // for the back button, make sure the click matches the button with the id of "back"
        // and make sure the page number is greater than 1, sine there is no page 0
        if (e.target.matches("#back") && number > 1) {
            removeMonsters()
            number = number - 1
            fetchData(number)
        } else if (e.target.matches("#forward")) {
            removeMonsters()
            number = number + 1
            fetchData(number)
        }
    })





    fetchData()
    createForm()
})