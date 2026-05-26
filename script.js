/*                    CARDS ↓↓↓*/

const btnAdd = document.querySelector(".add-btn")
const toDoCards = document.querySelector(".todo-cards")
const listDesc = document.querySelector(".list-desc")

const nav = document.querySelector(".nav")
const addListBtn = document.querySelector(".add-list-btn")

const headerTitle = document.querySelector(".header-title")

const sideBar = document.querySelector(".side-bar")
const menuBtn = document.querySelector(".menu-btn")
const overlay = document.querySelector(".overlay")

menuBtn.addEventListener("click", () => {
    sideBar.classList.toggle("open")
    overlay.classList.toggle("show")
})

overlay.addEventListener("click", () => {
    sideBar.classList.remove("open")
    overlay.classList.remove("show")
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

let selectedColor = "purple"

let currentGroup = 1

renderGroups(groups)

function sortToDos(todosArray) {
    const activeToDos = todosArray.filter((todo) => {
        return !todo.completed
    })

    const completedToDos = todosArray.filter((todo) => {
        return todo.completed
    })

    return [...activeToDos, ...completedToDos]
}

/* let todos = [] */
function createToDo(todosArray) {
    toDoCards.innerHTML = ""
    toggleEmptyMessage(todosArray)

    const sortedTodos = sortToDos(todosArray)
    sortedTodos.forEach((todo) => {
        const toDoCard = document.createElement("div")

        const toDoCardText = document.createElement("div")
        const toDoCardTitle = document.createElement("h2")
        const toDoCardDesc = document.createElement("p")

        const toDoCardBtns = document.createElement("div")
        const btnRemove = document.createElement("button")
        const btnComplete = document.createElement("button")

        const btnEdit = document.createElement("button")

        toDoCardTitle.textContent = todo.title
        toDoCardDesc.textContent = todo.desc
        btnRemove.textContent = "Remove"
        btnComplete.textContent = "Complete"

        btnEdit.textContent = "Edit"
        btnEdit.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bolt-icon lucide-bolt"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="4"/></svg>`

        toDoCard.classList.add("todo-card", todo.color)

        toDoCardText.classList.add("card-text")
        toDoCardTitle.classList.add("card-title")
        toDoCardDesc.classList.add("card-desc")

        toDoCardBtns.classList.add("card-buttons")
        btnRemove.classList.add("card-btn-remove")
        btnComplete.classList.add("card-btn-complete")

        btnEdit.classList.add("card-btn-edit")

        toDoCardText.append(toDoCardTitle, toDoCardDesc)
        toDoCardBtns.append(btnComplete, btnRemove, btnEdit)

        toDoCard.append(toDoCardText, toDoCardBtns)

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

        if (todo.completed) {
            btnComplete.textContent = "✓"
            toDoCard.classList.add("completed")
        } else {
            btnComplete.textContent = "Complete"
        }

        btnComplete.addEventListener("click", () => {
            todo.completed = !todo.completed
            if (todo.completed) {
                btnComplete.textContent = "✓"
                toDoCard.classList.add("completed")
            } else {
                btnComplete.textContent = "Complete"
                toDoCard.classList.remove("completed")
            }

            setTimeout(() => {
                createToDo(todosArray)
            }, 300)
            localStorage.setItem("groups", JSON.stringify(groups))
            updateCounter()
        })

        btnEdit.addEventListener("click", () => {
            toDoCardBtns.innerHTML = ""
            const btnSave = document.createElement("button")
            const btnCancel = document.createElement("button")
            const editTitle = document.createElement("input")
            const editDesc = document.createElement("input")

            editTitle.classList.add("input-title")
            editDesc.classList.add("input-desc")

            btnSave.classList.add("btn-save-edit")
            btnCancel.classList.add("btn-cancel-edit")
            btnSave.textContent = "Save"
            btnCancel.textContent = "Cancel"

            toDoCardBtns.append(btnSave, btnCancel)

            toDoCardTitle.replaceWith(editTitle)
            toDoCardDesc.replaceWith(editDesc)

            editTitle.value = todo.title
            editDesc.value = todo.desc

            btnSave.addEventListener("click", () => {
                todo.title = editTitle.value
                todo.desc = editDesc.value

                localStorage.setItem("groups", JSON.stringify(groups))
                createToDo(todosArray)
            })

            btnCancel.addEventListener("click", () => {
                createToDo(todosArray)
            })
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

    if (document.querySelector(".input")) {
        return
    }

/*                     ПОЛЯ ВВОДА И КНОПКИ
 */ const inputs = document.querySelector(".inputs")
    const inputItem = document.createElement("div")
    const inputTitle = document.createElement("input")
    const inputDesc = document.createElement("input")
    const inputBtns = document.createElement("div")
    const mainBtns = document.createElement("div")
    const btnSave = document.createElement("button")
    const btnCancel = document.createElement("button")
/*                         ВЫБОР ЦВЕТА
 */ const colorPicker = document.createElement("div")
    const yellowBtn = document.createElement("button")
    const greenBtn = document.createElement("button")
    const purpleBtn = document.createElement("button")
    /*                             ВЫБОР ГРУППЫ */
    const groupPicker = document.createElement("div")
    const groupPickerBtn = document.createElement("button")
    const groupPickerMenu = document.createElement("div")

    colorPicker.classList.add("color-btns", "yellow")
    yellowBtn.classList.add("color-btn", "yellow")
    greenBtn.classList.add("color-btn", "green")
    purpleBtn.classList.add("color-btn", "purple")

    yellowBtn.textContent = "yellow"
    greenBtn.textContent = "green"
    purpleBtn.textContent = "purple"

    yellowBtn.addEventListener("click", () => {
        const allSelected = document.querySelectorAll(".selected")

        allSelected.forEach((item) => {
            return item.classList.remove("selected")
        })
        selectedColor = "yellow"
        yellowBtn.classList.add("selected")
    })
    greenBtn.addEventListener("click", () => {
        const allSelected = document.querySelectorAll(".selected")

        allSelected.forEach((item) => {
            return item.classList.remove("selected")
        })
        selectedColor = "green"
        greenBtn.classList.add("selected")
    })
    purpleBtn.addEventListener("click", () => {
        const allSelected = document.querySelectorAll(".selected")

        allSelected.forEach((item) => {
            return item.classList.remove("selected")
        })
        selectedColor = "purple"
        purpleBtn.classList.add("selected")
    })

    colorPicker.append(yellowBtn, greenBtn, purpleBtn)

    groupPicker.classList.add("group-picker")
    groupPickerMenu.classList.add("group-picker-menu")
    groupPickerBtn.classList.add("group-picker-btn")

    groupPickerBtn.textContent = "Liste"

    groupPickerBtn.addEventListener("click", () => {
        groupPickerMenu.classList.toggle("show")
        groupPickerMenu.innerHTML = ""
        const groupList = document.createElement("div")

        getSelectableGroups().forEach((group) => {

            const groupItem = document.createElement("button")

            groupItem.textContent = group.name
            groupList.append(groupItem)

            groupItem.addEventListener("click", () => {
                currentGroup = group.id
                groupPickerBtn.textContent = group.name
                groupPickerMenu.classList.remove("show")
            })
        })

        groupPickerMenu.append(groupList)
    })
    groupPicker.append(groupPickerMenu, groupPickerBtn)

    inputItem.classList.add("input")
    inputTitle.classList.add("input-title")
    inputDesc.classList.add("input-desc")
    inputBtns.classList.add("input-btns")
    mainBtns.classList.add("main-btns")
    btnSave.classList.add("input-btn")
    btnCancel.classList.add("input-btn")

    listDesc.classList.add("hide")

    mainBtns.append(btnSave, btnCancel)

    inputBtns.append(colorPicker, mainBtns)

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
            groupId: currentGroup,
            color: selectedColor
        }

        inputItem.remove()

        const selectedGroup = groups.find((group) => {
            return group.id === currentGroup
        })
        console.log(selectedGroup)

        selectedGroup.todos.push(newToDo)

        localStorage.setItem("groups", JSON.stringify(groups))

        createToDo(selectedGroup.todos)

        renderGroups(groups)

        updateCounter()
    })

    btnCancel.addEventListener("click", () => {
        inputItem.remove()
    })

    inputItem.append(inputTitle, inputDesc, inputBtns, groupPicker)
    inputs.append(inputItem)

})

function getSelectableGroups() {
    return groups.filter((group) => {
        return group.id !== 1
    })
}

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
        const actionsBtn = document.createElement("button")
        const menu = document.createElement("div")
        const deleteGroupBtn = document.createElement("button")

        navItem.classList.add("nav-wrapper")
        btn.classList.add("nav-item")
        actionsBtn.classList.add("action-btn")
        menu.classList.add("menu")
        deleteGroupBtn.classList.add("group-delete-btn")

        menu.append(deleteGroupBtn)

        btn.textContent = group.name
        actionsBtn.textContent = "⋮"
        deleteGroupBtn.textContent = "Delete"


        if (group.id === currentGroup) {
            btn.classList.add("active")
            headerTitle.textContent = group.name
        }

        if (group.id !== 1) {
            navItem.append(btn, actionsBtn, menu)
        } else {
            navItem.append(btn)
        }

        nav.append(navItem)

        actionsBtn.addEventListener("click", () => {
            menu.classList.toggle("show")
        })

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
            overlay.classList.remove("show")
            headerTitle.textContent = group.name

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
