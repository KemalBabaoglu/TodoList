//ELEMENT SEÇİMİ
const form=document.querySelector("#todoAddForm")
const addInput=document.querySelector("#todoName")
const todoList=document.querySelector(".list-group"); 
const firstCardBody=document.querySelectorAll(".card-body")[0]
const secondCardBody=document.querySelectorAll(".card-body")[1]
const clearButton=document.querySelector("#clearButton")
const filterr=document.querySelector("#todoSearch")


let todos=[]

runEvents()

function runEvents(){
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", pageLoaded)
    secondCardBody.addEventListener("click", removeTodoToUI)
    clearButton.addEventListener("click", clearTodos) 
    filterr.addEventListener("keyup", filter)
}

//STORAGE'dan Todo Çekme
function pageLoaded(){
    checkTodosFromStorage()
    todos.forEach(function(todo){
        addTodoToUI(todo)
    })
}

//TODO EKLEME
function addTodo(e){
    const inputText=addInput.value.trim()
    if(inputText==null || inputText==""){
        //Uyarı Mesajı
        showAlert("warning", "Lütfen boş bırakmayınız")
    }else{
        //Arayüze Ekleme
        addTodoToUI(inputText)
        //Storage Ekleme
        addTodoToStorage(inputText)
        //Bilgilendirme Mesajı
        showAlert("success", "Todo Eklendi")
    }
    e.preventDefault()
}


//ARAYÜZE TODO EKLEME
function addTodoToUI(newTodo){
    const li=document.createElement("li")
    li.className="list-group-item d-flex justify-content-between"
    li.textContent=newTodo

    const a=document.createElement("a")
    a.className="delete-item"
    a.href="#"

    const i=document.createElement("i")
    i.className="fa fa-remove"

    a.appendChild(i)
    li.appendChild(a)
    todoList.appendChild(li)

    addInput.value=""
}



//STORAGE TODO EKLEME
function addTodoToStorage(newTodo){
    checkTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

//STORAGE KONTROL
function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
}

//UYARI VEYA BİLGİLENDİRME
function showAlert(type, message){
    const div=document.createElement("div")
    div.className=`mt-5 alert alert-${type}`
    
    div.role="alert"
    div.textContent=message
    
    firstCardBody.appendChild(div)

    setTimeout(() => {
        div.remove()
    }, 2500);
}


    

//TODO SİLME
function removeTodoToUI(e){
    if(e.target.className=="fa fa-remove"){
        //Ekrandan Silme
        const todo=e.target.parentElement.parentElement
        todo.remove()        
        //Storage'dan Silme
        removeTodoToStorage(todo.textContent)
        showAlert("success", "Todo Başarılı Bir Şekilde Silindi")
    }
    e.preventDefault()
    
   }



   //STORAGE TODO SİLME
function removeTodoToStorage(removeTodo){
    checkTodosFromStorage()
    todos.forEach(function(todo, index){
        if(removeTodo==todo){
            todos.splice(index, 1)
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}



// TÜM TODOLARI TEMİZLEME
function clearTodos(){
    const todosList=document.querySelectorAll(".list-group-item")
    if(todosList.length>0){
        //Ekrandan Silme
        todosList.forEach(function(todos){
            todos.remove()       
        })
        //Storage'dan Silme
        todos=[]
        localStorage.setItem("todos", JSON.stringify(todos))
        showAlert("success", "Tüm Todolar Silindi")
    }else{
        showAlert("warning", "Todo Listeniz Zaten Boş")
    }
}


//TODO ARAMA
function filter(e){
    const filterValue=e.target.value.toLowerCase().trim()
    const todoList=document.querySelectorAll(".list-group-item")
    if(todoList.length>0){
        todoList.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style", "display : block")
            }else{
                todo.setAttribute("style", "display : none !important")
            }
        })

    }
}























