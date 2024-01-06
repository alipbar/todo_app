
//NOTES

const date = document.querySelector('#date')
const list = document.querySelector('#list')
const input = document.querySelector('#input')
const btnEnter = document.querySelector('#btnEnter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let LIST

//date function
const DATE = new Date ()
date.innerHTML = DATE.toLocaleDateString('eng-US',{weekday:'long',month:'short',day:'numeric'})

//add task function
function addTask (task,id,done,removed) {
    if(removed){return}

    const DONE = done ?check :uncheck
    const LINE = done ?lineThrough :''

    const item = `
                <li id="item">
                    <i class="far ${DONE}" data="done" id="${id}"></i>
                    <p class="text ${LINE}">${task}</p>
                    <i class="fas fa-trash de" data="removed" id="${id}""></i>
                </li>
                `
    list.insertAdjacentHTML("beforeend",item)
}

//doneTask function
function doneTask(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].done = LIST[element.id].done ?false :true
}

//removedTask function
function removedTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].removed = true
}

btnEnter.addEventListener('click',()=> {
    const task = input.value 
    if(task){
        addTask(task,id,false,false)
        LIST.push({
            name: task,
            id: id,
            done: false,
            removed: false
        })
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=''
    id++
})

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const task = input.value
        if(task){
            addTask(task,id,false,false)
            LIST.push({
                name: task,
                id: id,
                done: false,
                removed: false
            })
        }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=''
    id++
    }
})

list.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData==='done'){
        doneTask(element)
    }
    else if(elementData==='removed'){
        removedTask(element)
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})

//localStorage getItem
let data = localStorage.getItem('TODO')
if(data){
    LIST=JSON.parse(data)
    id=LIST.length
    loadList(LIST)
} else {
    LIST = []
    id=0
}

function loadList(DATA){
    DATA.forEach(function(i){
        addTask(i.name,i.id,i.done,i.removed)
    })
}