/*                    CARDS ↓↓↓*/

const btnAdd = document.querySelector(".add-btn")
const toDoCards = document.querySelector(".todo-cards")
const listDesc = document.querySelector(".list-desc")

const nav = document.querySelector(".nav")
const addListBtn = document.querySelector(".add-list-btn")

const headerTitle = document.querySelector(".header-title")

const sideBar = document.querySelector(".side-bar")
const menuBtn = document.querySelector(".menu-btn")

menuBtn.addEventListener("click", () => {
    sideBar.classList.toggle("open")
})

let groups = [
    {
        id: 1,
        name: "Alle Aufgaben"
    },
    {
        id: 2,
        name: "Einkaufs-liste",
        todos: []
    }
]

let currentGroup = 1

renderGroups(groups)

/* let todos = [] */
function createToDo(todosArray) {
    toDoCards.innerHTML = ""
    toggleEmptyMessage(todosArray)
    todosArray.forEach((todo) => {
        const toDoCard = document.createElement("div")
        const toDoCardTitle = document.createElement("h2")
        const toDoCardDesc = document.createElement("p")
        const btnRemove = document.createElement("button")
        const btnComplete = document.createElement("button")

        toDoCardTitle.textContent = todo.title
        toDoCardDesc.textContent = todo.desc
        btnRemove.textContent = "Remove"
        btnComplete.textContent = "Complete"

        toDoCard.classList.add("todo-card")
        toDoCardTitle.classList.add("card-title")
        toDoCardDesc.classList.add("card-desc")
        btnRemove.classList.add("card-btn-remove")
        btnComplete.classList.add("card-btn-complete")


        toDoCard.append(toDoCardTitle, toDoCardDesc, btnRemove, btnComplete)

        toDoCards.append(toDoCard)

        btnRemove.addEventListener("click", () => {
            const selectedGroup = groups.find((group) => {
                return group.id === todo.groupId
            })

            selectedGroup.todos = selectedGroup.todos.filter((item) => {
                return item.id !== todo.id
            })

            if (currentGroup === 1) {
                createToDo(getAlltodos())
            } else {
                createToDo(selectedGroup.todos)
            }

            updateCounter()
            localStorage.setItem("groups", JSON.stringify(groups))
        })

        btnComplete.addEventListener("click", () => {
            todo.completed = true
            localStorage.setItem("groups", JSON.stringify(groups))
            btnComplete.textContent = "°"
            updateCounter()
        })
    })
}

function toggleEmptyMessage(todosArray) {
    if (todosArray.length > 0) {
        listDesc.classList.add("hide")
    } else {
        listDesc.classList.remove("hide")
    }
}

btnAdd.addEventListener("click", () => {
    const inputs = document.querySelector(".inputs")
    const inputItem = document.createElement("div")
    const inputTitle = document.createElement("input")
    const inputDesc = document.createElement("input")
    const inputBtns = document.createElement("div")
    const btnSave = document.createElement("button")
    const btnCancel = document.createElement("button")

    inputItem.classList.add("input")
    inputTitle.classList.add("input-title")
    inputDesc.classList.add("input-desc")
    inputBtns.classList.add("input-btns")
    btnSave.classList.add("input-btn")
    btnCancel.classList.add("input-btn")

    listDesc.classList.add("hide")

    inputBtns.append(btnSave, btnCancel)

    inputTitle.placeholder = "Neue Aufgabe"
    inputDesc.placeholder = "Beschreibung"
    btnSave.textContent = "Save"
    btnCancel.textContent = "Cancel"

    btnSave.addEventListener("click", () => {
        if (!inputTitle.value.trim()) {
            alert("Du musst zuerst was schreiben :)")
            return
        }

        if (currentGroup === 1) {
            alert("Wähle zuerst eine Gruppe :)")
            return
        }

        const newToDo = {
            id: Date.now(),
            title: inputTitle.value,
            desc: inputDesc.value,
            completed: false,
            groupId: currentGroup
        }

        inputItem.remove()

        const selectedGroup = groups.find((group) => {
            return group.id === currentGroup
        })
        console.log(selectedGroup)

        selectedGroup.todos.push(newToDo)

        localStorage.setItem("groups", JSON.stringify(groups))

        createToDo(selectedGroup.todos)

        updateCounter()
    })

    btnCancel.addEventListener("click", () => {
        inputItem.remove()
    })

    inputItem.append(inputTitle, inputDesc, inputBtns)
    inputs.append(inputItem)

})

function updateCounter() {
    let todosArray = []

    if (currentGroup === 1) {
        todosArray = getAlltodos()
    } else {
        const selectedGroup = groups.find((group) => {
            return group.id === currentGroup
        })

        todosArray = selectedGroup.todos
    }
    const completed = todosArray.filter((todo) => {
        return todo.completed
    }).length


    document.querySelector(".counter-number").textContent = `${completed} / ${todosArray.length}`
}

/*                  SIDEBARS BUTTONS ↓↓↓ */



addListBtn.addEventListener("click", () => {
    const sideBarsInputs = document.createElement("div")
    const groupTitleBtn = document.createElement("input")
    const sideBarsBtns = document.createElement("div")
    const groupBtnSave = document.createElement("button")
    const groupBtnRemove = document.createElement("button")

    sideBarsInputs.classList.add("sidebars-inputs")
    groupTitleBtn.classList.add("nav-item")
    sideBarsBtns.classList.add("sidebars-buttons")
    groupBtnSave.classList.add("input-btn")
    groupBtnRemove.classList.add("input-btn")

    groupTitleBtn.placeholder = "Zm.B Sport"
    groupBtnSave.textContent = "Save"
    groupBtnRemove.textContent = "Remove"

    sideBarsBtns.append(groupBtnSave, groupBtnRemove)
    sideBarsInputs.append(groupTitleBtn, sideBarsBtns)
    nav.append(sideBarsInputs)

    groupBtnSave.addEventListener("click", () => {
        if (!groupTitleBtn.value.trim()) {
            alert("Du musst zuerst was schreiben :)")
            return
        }

        const newGroup = {
            id: groups.length + 1,
            name: groupTitleBtn.value,
            todos: []
        }

        groupTitleBtn.remove()

        groups.push(newGroup)

        localStorage.setItem("groups", JSON.stringify(groups))

        renderGroups(groups)


    })

    groupBtnRemove.addEventListener("click", () => {
        sideBarsInputs.remove()
    })

})

function getAlltodos() {
    return groups
        .filter((group) => group.id !== 1)
        .flatMap((group) => group.todos)
}

function renderGroups(groupsArray) {
    nav.innerHTML = ""

    groupsArray.forEach((group) => {
        const navItem = document.createElement("div")
        const btn = document.createElement("button")
        const deleteGroupBtn = document.createElement("button")

        navItem.classList.add("nav-wrapper")
        btn.classList.add("nav-item")
        deleteGroupBtn.classList.add("group-delete-btn")

        btn.textContent = group.name
        deleteGroupBtn.textContent = "x"
        headerTitle.textContent = group.name

        if (group.id === currentGroup) {
            btn.classList.add("active")
        }

        if (group.id !== 1) {
            navItem.append(btn, deleteGroupBtn)
        } else {
            navItem.append(btn)
        }

        nav.append(navItem)

        deleteGroupBtn.addEventListener("click", () => {
            groups = groups.filter((item) => {
                return item.id !== group.id
            })

            localStorage.setItem("groups", JSON.stringify(groups))

            currentGroup = 1

            renderGroups(groups)
            createToDo(getAlltodos())
            updateCounter()
        })

        btn.addEventListener("click", () => {
            const allBtns = document.querySelectorAll(".nav-item")

            allBtns.forEach((item) => {
                item.classList.remove("active")
            })

            currentGroup = group.id

            btn.classList.add("active")

            if (group.id === 1) {
                createToDo(getAlltodos())
            } else {
                createToDo(group.todos)
            }

            sideBar.classList.remove("open")

            updateCounter()
        })

    })

}

const savedGroups = JSON.parse(localStorage.getItem("groups"))
if (savedGroups) {
    groups = savedGroups
    renderGroups(groups)
}

if (currentGroup === 1) {
    createToDo(getAlltodos())
} else {
    const firstGroup = groups.find((group) => {
        return group.id === currentGroup
    })

    createToDo(firstGroup.todos)
}

updateCounter()