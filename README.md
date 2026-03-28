# insTelegramBot

**Disclaimer:** This project was created strictly for educational purposes and phishing awareness. Do not use this tool for malicious purposes.

## Overview
**insTelegramBot** is a simple webpage designed to look exactly like the Instagram login screen. It demonstrates how a phishing attack works by capturing the login details someone types in and sending them directly to a Telegram chat. 

The goal of this project is to help people understand how fake login pages operate so they can better protect themselves from losing their accounts.

## Features
* **Accurate Design:** Looks just like the real Instagram login page, including the layout and images.
* **Telegram Integration:** Sends the captured username and password straight to your Telegram app using a bot.
* **Easy to Host:** Because it is just HTML, CSS, and JavaScript, you can host it easily on static sites like GitHub Pages without needing a complex backend server.

## Tech Stack
* **HTML & CSS:** Used to build the structure and design of the fake login page (`index.html`, `login.html`).
* **JavaScript:** Used to capture the form data and send it to Telegram (`login.js`, `img.js`).
* **Telegram Bot API:** Used as the backend to receive the stolen credentials.

## Setup Instructions

If you want to test this project locally to see how it works:

1. **Download the project:** Clone this repository to your computer.
   ```bash
   git clone [https://github.com/saheermk/insTelegramBot.git](https://github.com/saheermk/insTelegramBot.git)
   ```

2. **Create a Telegram Bot:** Open Telegram, search for `@BotFather`, create a new bot, and copy the `BOT_TOKEN` it gives you.

3. **Get your Chat ID:** Find your personal Telegram `CHAT_ID` (you can message a bot like `@userinfobot` to find out your ID number).

4. **Update the code:** Open the `login.js` file and replace the placeholder variables with your actual `BOT_TOKEN` and `CHAT_ID`.

5. **Run the site:** Double-click `index.html` or `login.html` to open it in your web browser and test the form.

## How it Works
1. A person opens the fake login page, thinking it is real.
2. They type in their username and password and click "Log In".
3. The JavaScript file catches the details before the page can actually log them in.
4. The script sends a hidden web request to the Telegram Bot API with the username and password.
5. The details instantly pop up in your Telegram chat.

## Author
**Saheer**
* GitHub: [@saheermk](https://github.com/saheermk)

## License
This project is open-source and available under the MIT License.
