document.addEventListener('DOMContentLoaded', e => {
    //create a variable for the monster container
    // create a form element to input the monster data
    //create a number variable for pagination

    let container = document.getElementById('monster-container')
    let number = 1 //the data will start from 'page number 1' 
    let form = document.createElement('form')
    let baseUrl = "http://localhost:3000/monsters/"

    
    //create the function to FETCH the data
    const getData = (number) => {
        fetch(baseUrl + '?_limit=50&_page=' + number)
        .then(response => response.json())
        .then(monsters => renderMonsters(monsters)) //aspirational code to render all the monsters
    }

    //create the function to render all monsters (Plural)
    function renderMonsters(monsters){
        for (const monster of monsters){
            renderMonster(monster) //another aspirational code to render each indvidual monster
        }
    }

    //create the function to render each individual monster
    function renderMonster(monster) {
        //create the element that will hold each monster
        //create the inner html
        //append the element to the container (container was assigned to a variable in the outermost scope)
        let div = document.createElement('div')
        div.classList.add('monster')
        div.dataset.id = monster.id
        div.innerHTML = `
        <h2>Name: ${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
        `
        container.append(div)
    }

    function createForm() {
        let formContainer = document.getElementById('create-monster')
        formContainer.insertAdjacentElement('beforeend', form)
        form.innerHTML = `
            <input id="name" placeholder="name...">
            <input id="age" placeholder="age...">
            <input id="description" placeholder="description...">
            <button>Create</button>
        `
    }

    //create a 'submit' listener for the form to create a new monster and persist it to the DOM
    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            name = form.name.value
            age = form.age.value
            description = form.description.value
            // console.log(name, age, description)
            options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    age: age,
                    description: description
                })
            }
            fetch(baseUrl, options)
            .then(response => response.json())
            .then(renderMonster)
        })
    }

    function removeMonsters() {
        //create a variable to select all of the monsters on the current page
        let monsters = document.querySelectorAll('.monster')

        //now, iterate through each monster instance and remove them somehow
        for (const monster of monsters) {
            container.querySelectorAll('*').forEach(i => i.remove())
        }
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            // console.log(e.target)
            if (e.target.matches('#back') && number > 1) {
                removeMonsters() //aspirational code to clear out the page, then render the new set of monsters
                number = number - 1
                getData(number)
            } else if (e.target.matches('#forward')) {
                removeMonsters() //aspirational code to clear out the page, then render the new set of monsters
                number = number + 1
                getData(number)
            }
        })
    }

   

    //invoke appropriate functions
    getData()
    submitHandler()
    clickHandler()
    createForm()
})