const baseURL = "https://www.dnd5eapi.co"

// fetch("https://www.dnd5eapi.co/api")
//     .then(resp => resp.json())
//     .then(endpoints => console.log(endpoints))

/* returns:
{
    "ability-scores": "/api/ability-scores",
    "alignments": "/api/alignments",
    "backgrounds": "/api/backgrounds",
    "classes": "/api/classes",
    "conditions": "/api/conditions",
    "damage-types": "/api/damage-types",
    "equipment": "/api/equipment",
    "equipment-categories": "/api/equipment-categories",
    "feats": "/api/feats",
    "features": "/api/features",
    "languages": "/api/languages",
    "magic-items": "/api/magic-items",
    "magic-schools": "/api/magic-schools",
    "monsters": "/api/monsters",
    "proficiencies": "/api/proficiencies",
    "races": "/api/races",
    "rule-sections": "/api/rule-sections",
    "rules": "/api/rules",
    "skills": "/api/skills",
    "spells": "/api/spells",
    "subclasses": "/api/subclasses",
    "subraces": "/api/subraces",
    "traits": "/api/traits",
    "weapon-properties": "/api/weapon-properties"
}
*/

fetch(`${baseURL}/api/spells`)
    .then(resp => resp.json())
    .then(spells => {
        renderSpellName(spells);
        searchSpells(spells);
    })

fetch("http://localhost:3000/my-faves")
    .then(resp => resp.json())
    .then(myFaves => {
        renderMyFaves(myFaves)
    })

function renderMyFaves(arrayOfSpells) {
    arrayOfSpells.forEach(obj => {
        const favesUl = document.querySelector("#my-faves")
                const li = document.createElement("li")
                const title = document.querySelector("#spell-name")
                li.textContent = obj.name
                li.addEventListener('click', (e) => {
                    renderFeaturedSpell(obj)
                })
                favesUl.appendChild(li)
    })
}

//returns an object where the key "results" contains an array of 319 spell objects
//each spell object has keys "index", "name", and "url" (which has a location to fetch from for spell details)


//We want range, damage, level, name, description
//Task 1: renderSpellName function [DONE]
//task 2: click event for each spell name [DONE]
//Task 3: Render featured spell in center on click [DONE]
//task 4: Make a button which adds featured spell to spells library [DONE]
//task 5: Add text submit form for list of spells[]
//task 6: Add styling

function renderSpellName(spellObj) {
    const spellList = document.querySelector('#spell-list')
    const spellArray = spellObj.results
    // console.log(spellArray)
    spellArray.forEach((spell) => {
        const spellLi = document.createElement('li')
        spellLi.textContent = spell.name
        spellLi.className = 'spell-name'
        spellList.append(spellLi)
        spellLi.addEventListener('click', (e) => {
            fetch(`${baseURL}${spell.url}`)
                .then(resp => resp.json())
                .then(clickedSpell => renderFeaturedSpell(clickedSpell))
        })
    })
}

function searchSpells(spells){
   // console.log(spells.results)

    const form = document.querySelector('.search-spells')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const userInput = e.target.spell.value
        //console.log(userInput)
        let spellResult = {}
        spells.results.forEach(spell=>{
            // console.log(spell)
            if (spell.name.toLowerCase() === userInput.toLowerCase()){
                spellResult = spell
            } else {
                console.log('did not find spell =(')
            }
            //console.log(spell.name)
        })
        // console.log(spellResult)
       fetch(`${baseURL}${spellResult.url}`)
        .then(resp => resp.json())
        .then(data => renderFeaturedSpell(data))

        
})}


function renderFeaturedSpell(spell) {
    
    //console.log(spell)
    const title = document.querySelector("#spell-name")
    title.textContent = spell.name

    const level = document.querySelector("#level")
    level.textContent = `Level ${spell.level}`

    const ul = document.querySelector("#description")
    ul.innerHTML = ""
    spell.desc.forEach(item => {
        const li = document.createElement("li")
        li.textContent = item
        ul.append(li)
    })

    const concentration = document.querySelector("#concentration")
    if (spell.concentration) {
        concentration.textContent = "This spell requires concentration."
    } else {
        concentration.textContent = "This spell does not require concentration."
    }
    const featuredContainer = document.querySelector('#classes-container')
    featuredContainer.innerHTML = ''
    const classesH3 = document.createElement('h3')
    classesH3.textContent = 'Classes:'
    classesH3.id = 'classes-header'
    featuredContainer.append(classesH3)
    
    const spellClasses = document.querySelector("#spell-classes")
    spellClasses.innerHTML = ""
    const arrayOfClasses = spell.classes
    arrayOfClasses.forEach(classObj => {
        const li = document.createElement("li")
        li.textContent = classObj.name
        spellClasses.append(li)
    })

    const buttonContainer = document.querySelector("#button-container")
    buttonContainer.innerHTML = ""
    const faveButton = document.createElement("button")
    faveButton.id = "fave-button"
    faveButton.textContent = "Add to faves"
    faveButton.addEventListener("click", (e) => {
        const faveObj = {
            'name' : spell.name,
            'level' : spell.level,
            'desc' : spell.desc,
            'concentration' : spell.concentration,
            'classes' : spell.classes
        }
        // console.log(faveObj)
        fetch('http://localhost:3000/my-faves', {method: 'POST', headers: {
            'Content-Type': 'application/json' // Set the content type
          },
          body: JSON.stringify(faveObj) // Attach the JSON payload to the body of the request
          
        })
            .then(resp => resp.json())
            .then(featuredObj => { 
                // console.log(featuredObj)
                const favesUl = document.querySelector("#my-faves")
                const li = document.createElement("li")
                const title = document.querySelector("#spell-name")
                li.textContent = featuredObj.name
                li.addEventListener('click', (e) => {
                    renderFeaturedSpell(featuredObj)
                })
                favesUl.appendChild(li)
            })
        //console.log("I was clicked")
        
    //     //console.log(newSpellObj)
    })
    buttonContainer.append(faveButton)

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete from my faves"
    const deleteButtonDiv = document.querySelector("#delete-button-container")
    deleteButtonDiv.innerHTML=""
    deleteButtonDiv.append(deleteButton)
    deleteButton.addEventListener("click", e => {
        // console.log(e.target)
        //target the featured spell in the database
        // console.log(spell.name)
        fetch("http://localhost:3000/my-faves")
            .then(resp => resp.json())
            .then(allMyFaves => {
                //get the ids for all faves that match the spell.name
                console.log(allMyFaves)
                allMyFaves.forEach(fave => {
                    if (fave.name === spell.name) {
                        const index = fave.id
                        fetch(`http://localhost:3000/my-faves/${index}`, {method: 'DELETE'})
                            .then(resp => resp.json())
                            .then(deleteObj => {
                                spell.name
                                const libraryDiv = document.querySelector("#spell-library")
                                const myFavesList = libraryDiv.querySelectorAll("ul li")
                                myFavesList.forEach(node => {
                                    if (node.innerText === spell.name) {
                                        node.remove()
                                    }
                                })
                            })
                    }
                
                })
            })
        // const index = s
        // fetch(`http://localhost:3000/my-faves/${index}`, {method: 'DELETE'})
        //     .then(resp => resp.json())
        //     .then(featuredObj => { 
        //         console.log(featuredObj)
                // const favesUl = document.querySelector("#my-faves")
                // const li = document.createElement("li")
                // const title = document.querySelector("#spell-name")
                // li.textContent = featuredObj.name
                // li.addEventListener('click', (e) => {
                //     renderFeaturedSpell(featuredObj)
                // })
                // favesUl.appendChild(li)
            // })
    })

    // myFavesList.
   

    
    // renderSpellLibrary(spell)
} 




const div = document.querySelector("#feature-spell-container")

// Create an ul and li's to house our spell library
// Create button element
// Create event listener on click for rendering selected spell to spell library

// function renderSpellLibrary(newSpellObj) {
//     //console.log(newSpellObj)
//     const button = document.querySelector("#fave-button")
//     //console.log(button)
//     button.addEventListener("click", (e) => {
//         //console.log("I was clicked")
//         const favesUl = document.querySelector("#my-faves")
//         const li = document.createElement("li")
//         const title = document.querySelector("#spell-name")
//         li.textContent = title.textContent
//         favesUl.appendChild(li)
//         //console.log(newSpellObj)
//     })
// }
const spellList = document.querySelector('#spell-list')
document.addEventListener('keydown', (e) => {
    if(e.key === '1') {
        if(spellList.style.display === 'none') {
            spellList.style.display = 'block';
        }
        else {
            spellList.style.display = 'none';
        }
    }
})
// // Select the HTML element you want to toggle. For example, an element with the ID "myElement"
// const myElement = document.getElementById("myElement");

// // Add the keydown event listener to the document
// document.addEventListener("keydown", function(event) {
//     // Check if the pressed key is "t" (for toggle)
//     if (event.key === "t") {
//         // Toggle the element's visibility
//         if (myElement.style.display === "none") {
//             myElement.style.display = "block";
//         } else {
//             myElement.style.display = "none";
//         }
//     }
// });
