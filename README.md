# Live-Chat

Live-Chat is a web-based live chat platform allowing users to communicate in real-time within a single, large chat room. Users can set a temporary username, select an avatar, and engage in conversations with ease. The app emphasizes simplicity and seamless communication, requiring no registration or login, making it accessible for anyone to start chatting instantly.

## Overview

The application utilizes Node.js with Express for the backend, MongoDB for data storage, and EJS for templating. The frontend leverages vanilla JavaScript for dynamic content and Bootstrap or Tailwind CSS for styling, ensuring a responsive and appealing design. Integration with the DiceBear JS library allows for customizable avatar selection. The application supports real-time messaging through Socket.IO, markdown formatting for messages, and includes a dark mode feature for enhanced user experience.

## Features

- **Temporary Username and Avatar Selection:** Users can choose a username and an avatar for their session, enhancing personalization.
- **Persistent Chat History:** Chat history is saved, allowing users to catch up on missed conversations. Messages older than 30 days are automatically deleted.
- **Markdown Support:** Users can format their messages with simple markdown syntax, adding richness to the chat.
- **Design and Usability:** A clean, flat design with support for dark mode, providing a modern and comfortable user interface.

## Getting Started

### Requirements

- Node.js
- MongoDB
- A modern web browser

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and configure your database URL and session secret.
4. Start the application using `npm start`. The server will launch on the defined port, or default to 3000.
5. Open your web browser and go to `http://localhost:3000` to start using Live-Chat.

### License

Copyright (c) 2024.