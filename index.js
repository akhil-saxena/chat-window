const chatWindows = {}

function createChat() {
    const nameInput = document.getElementById("create-chat-input");
    const name = nameInput.value;
    if (name === '' ) { 
       alert("Please enter a name.")
        return; }

        if (chatWindows[name]) { 
            alert("Username taken, try another one.")
             return; }
    const chatWindow = document.createElement("div");
    chatWindow.className = "chat-window"
    chatWindow.innerHTML = `
    <div id="chat-window-header">
        <h3 class="chat-window-name">${name}</h3>
    </div>
    <button class="close-button" onClick="closeChat(this)">X</button>
    <div class="messages-container">
    <ul class="message-list"></ul>
    </div>
    <input type="text" class="message-input" placeholder="Type your message">
    <button class="send-message" onClick="sendMessage('${name}')">Send</button>
    `;
    document.body.appendChild(chatWindow);
    chatWindows[name] = chatWindow;
    nameInput.value = '';
}

function closeChat(button){
    const chatWindow=button.parentNode;
    chatWindow.remove();
}
function getTimestamp() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    return time;
}

function sendMessage(name) {
    if (name === '') { return; }
    const chatWindow = chatWindows[name];
    const messageInput = chatWindow.querySelector(".message-input");
    const message = messageInput.value;
    const messageList = chatWindow.querySelector(".message-list");

    const messageItem = document.createElement("li");
    const timestamp = getTimestamp();
    const currentName = chatWindow.querySelector("h3").textContent;

    if (name == currentName) {
        messageItem.innerHTML = `
        <div class="message-block">
        <span class = "message-sender">You</span>
        <span class = "message-content">${message}</span>
        <span class = "message-timestamp">${timestamp}</span>
        </div>
        `
    }
    else {
        messageItem.innerHTML = `
        <div class="message-block">
        <span class = "message-sender">${name}</span>
        <span class = "message-content">${message}</span>
        <span class = "message-timestamp">${timestamp}</span>
        </div>
        `
    }

    messageList.appendChild(messageItem);
    messageInput.value = '';

    //Send messages to other users' window
    Object.values(chatWindows).forEach(individualChat => {
        if (individualChat !== chatWindow) {
            const otherMessagesList = individualChat.querySelector(".message-list");
            const otherMessagesItem = document.createElement("li");
            otherMessagesItem.innerHTML = `
            <div class="message-block">
            <span class = "message-sender">${name}</span>
            <span class = "message-content">${message}</span>
            <span class = "message-timestamp">${timestamp}</span>
            </div>
            `
            otherMessagesList.appendChild(otherMessagesItem);
        }
    });
}

// Code for typing indicator
// function typingIndicator(name) {
//     const chatWindow = chatWindows[name];
//     const typingIndicator = chatWindow.querySelector(".typing-indicator");
//     const messageInput = chatWindow.querySelector(".mesage-input");
//     const message = messageInput.value;

//     clearTimeout(typingTimeouts[name]);
//     if (message !== '') {
//         typingIndicator.textContent = "Typing...";
//         typingIndicatorTimeout = setTimeout(() => {
//             removeTypingIndicator(chatWindow)
//         }, 3000);
//     }
//     else{
//         removeTypingIndicator(name)
//     }
// }

// function removeTypingIndicator(chatWindow){
//     const typingIndicator = chatWindow.querySelector(".typing-indicator");
//     typingIndicator.textContent = "";

// }