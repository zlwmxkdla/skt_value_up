document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const stopButton = document.getElementById('stop-button');
    const startButton = document.getElementById('start-button');

    if (startButton) {
        startButton.addEventListener('click', function() {
            window.location.href = '/situation';
        });
    }

    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    if (stopButton) {
        stopButton.addEventListener('click', function() {
            window.location.href = '/result';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const hospitalBtn = document.getElementById('hospital-btn');
    const marketBtn = document.getElementById('market-btn');
    const schoolBtn = document.getElementById('school-btn');
    const familyBtn = document.getElementById('family-btn');

    if (hospitalBtn) {
        hospitalBtn.addEventListener('click', function() {
            window.location.href = '/chatting';
        });
    }

    if (marketBtn) {
        marketBtn.addEventListener('click', function() {
            window.location.href = '/chatting';
        });
    }

    if (schoolBtn) {
        schoolBtn.addEventListener('click', function() {
            window.location.href = '/chatting';
        });
    }

    if (familyBtn) {
        familyBtn.addEventListener('click', function() {
            window.location.href = 'chatting';
        });
    }
});

const chatContainer = document.getElementById('chat-container');
const chat = document.getElementById('chat');

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
