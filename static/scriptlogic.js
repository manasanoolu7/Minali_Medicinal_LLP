


// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Carousel functionality


// Scroll Animation (Fade In on Scroll)
const sections = document.querySelectorAll('.section-description');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fadeIn');
        }
    });
});

sections.forEach(section => {
    observer.observe(section);
});




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
}, 5000); // Change products every 5 seconds


// Toggle chatbox visibility
function toggleChatbot() {
const chatbox = document.getElementById('chatbox');
if (chatbox.style.display === 'none' || chatbox.style.display === '') {
    chatbox.style.display = 'block'; // Open chatbox
} else {
    chatbox.style.display = 'none'; // Close chatbox
}
}

// Close chatbox when close button is clicked
function closeChatbot() {
document.getElementById('chatbox').style.display = 'none';
}

// Handle sending a message
function sendMessage() {
const userInput = document.getElementById('user-input').value;
if (userInput.trim() !== '') {
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.textContent = `User: ${userInput}`;
    chatMessages.appendChild(userMessage);

    // Simulate bot response
    setTimeout(function() {
        const botMessage = document.createElement('div');
        botMessage.textContent = 'Bot: Let me look up that agriculture info for you!';
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    document.getElementById('user-input').value = ''; // Clear input
}
}


// Array of image URLs for the banner
const images = [
    'D:/agro-biotech/images/l1.jpg', // Replace with your image URLs
    'D:/agro-biotech/images/l2.webp',
    'https://example.com/image3.jpg'
];



// Function to change the background image
function changeBannerImage() {
    const banner = document.getElementById('banner');
    banner.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length; // Loop through the images
}

// Initial call to set the first image
changeBannerImage();

// Change the image every 40 seconds
setInterval(changeBannerImage, 40000);


document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
});





// Function to change the background image
function changeBannerImage() {
    const banner = document.getElementById('banner');
    banner.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length; // Loop through the images
}

// Initial call to set the first image
changeBannerImage();

// Change the image every 40 seconds
setInterval(changeBannerImage, 40000);


// Capture Selfie Logic
const captureBtn = document.getElementById('captureBtn');
const cameraSection = document.getElementById('cameraSection');
const video = document.getElementById('video');
const takePhotoBtn = document.getElementById('takePhotoBtn');
const capturedImage = document.getElementById('capturedImage');

captureBtn.addEventListener('click', function () {
    // Access the device camera only when the capture button is clicked
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                cameraSection.style.display = 'block'; // Show camera section
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                alert("Camera access is required to capture a selfie.");
            });
    } else {
        alert("Your device does not support camera access.");
    }
});

takePhotoBtn.addEventListener('click', function () {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image data and display it
    const imageData = canvas.toDataURL('image/png');
    capturedImage.src = imageData;

    // Stop video stream
    video.srcObject.getTracks().forEach(track => track.stop());
});
