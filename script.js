document.getElementById('start-button').addEventListener('click', startChat);
document.getElementById('send-button').addEventListener('click', sendMessage);

const chatContainer = document.getElementById('chat-container');
const chat = document.getElementById('chat');

function startChat() {
    chatContainer.style.display = 'block';
    appendMessage('컴퓨터', '안녕하세요! 저는 환자 역할을 맡은 AI입니다. 무엇이 궁금하신가요?');
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chat.appendChild(messageElement);
    chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
    const userMessage = document.getElementById('user-message').value;
    appendMessage('사용자', userMessage);
    document.getElementById('loading').style.display = 'block';  // 로딩 중 표시 활성화
    fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('user-message').value = '';
        document.getElementById('loading').style.display = 'none';  // 로딩 중 표시 비활성화
        appendMessage('컴퓨터', data.response);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none';  // 로딩 중 표시 비활성화
    });
}
