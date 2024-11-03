// Get buttons and modals
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');
const closeBtns = document.querySelectorAll('.close');

// Show the registration modal on button click
registerBtn.addEventListener('click', function () {
    registerModal.style.display = 'block';
    loginModal.style.display = 'none'; // Hide login modal if open
});

// Show the login modal on button click
loginBtn.addEventListener('click', function () {
    loginModal.style.display = 'block';
    registerModal.style.display = 'none'; // Hide registration modal if open
});

// Close modals on clicking the close button
closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        registerModal.style.display = 'none';
        loginModal.style.display = 'none';
    });
});

// Capture Selfie Logic
const captureBtn = document.getElementById('captureBtn');
const cameraSection = document.getElementById('cameraSection');
const video = document.getElementById('video');
const takePhotoBtn = document.getElementById('takePhotoBtn');
const capturedImage = document.getElementById('capturedImage');

captureBtn.addEventListener('click', function () {
    cameraSection.style.display = 'block';

    // Access the device camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                alert("Camera access is required to capture a selfie.");
            });
    }
});

function toggleChatbot() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = chatbox.style.display === 'none' || chatbox.style.display === '' ? 'block' : 'none';
}
function closeChatbot() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = 'none';

    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML = "";  // Clears the chat content
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatMessages = document.getElementById('chat-messages');

    // Add user message to chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';
    userMessageDiv.textContent = "You: " + userInput;
    chatMessages.appendChild(userMessageDiv);

    // Clear input field
    document.getElementById('user-input').value = '';

    // Fetch response from the chatbot route
    const response = await fetch('/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    let botResponse;

    if (response.ok) {
        botResponse = data.response; // Extract the bot's response
    } else {
        botResponse = "I'm sorry, I couldn't process your request."; // Fallback message
    }

    // Add bot response to chat
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'bot-message';
    botMessageDiv.textContent = "AgriAid: " + botResponse;
    chatMessages.appendChild(botMessageDiv);

    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


const carousel = document.getElementById("carousel");
const productCards = document.querySelectorAll(".product-card");
let currentIndex = 0;
const productCount = productCards.length;
const displayCount = 4; // Number of products to display at a time

// Function to update the carousel position based on current index
function updateCarousel() {
    const offset = currentIndex * displayCount * (productCards[0].offsetWidth + 20); // 20 is the margin
    carousel.style.transform = `translateX(-${offset}px)`;
}



// Start the carousel movement
setInterval(() => {
    currentIndex = (currentIndex + 1) % (productCount / displayCount);
    updateCarousel();
}, 2000); // Change products every 5 seconds







