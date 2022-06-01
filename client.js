const socket = io()

let user;
let textarea= document.getElementById('text')
let messageArea = document.querySelector('.container')

do{
    user = prompt('please enter your name:')
}while(!user)


textarea.addEventListener('keyup', (e) =>{
    if(e.key=='Enter'){
        sendMessage(e.target.value)
    }
})

function strikeIt() {
    textarea.addEventListener('keyup', (e) =>{
    let btn = document.getElementById('strike');
    if(btn.click()){
        textarea.style.setProperty('text-decoration', 'line-through');
    }})
  }

function sendMessage(message){
    let msg = {
        user: user,
        message:message
    }

//Append
appendMessage(msg, 'right')
textarea.value=''
scrollToBottom()

//send to server
socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}:</h4>    
        <hr><p>${msg.message}</p>
    `


    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//receive messages

socket.on('message', (msg) =>{
    appendMessage(msg, 'left')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}
