# Live-Chat

Live-Chat is a web-based application that enables users to communicate in a single, large chat room without the need for registration. It provides a seamless, real-time chatting experience, where users can set temporary usernames, choose avatars, and view chat history. This application focuses on simplicity and usability, making it easy for anyone to join and start chatting immediately.

## Overview

The application is built using Node.js with Express for the backend, MongoDB for storing chat messages, and EJS for templating. The frontend is developed with vanilla JavaScript and styled using either Bootstrap or Tailwind CSS. Live-Chat integrates the DiceBear JS library for generating unique avatars based on user input. The architecture supports real-time communication using Socket.IO, ensuring messages are delivered and displayed without page refreshes.

## Features

- **Temporary Username and Avatar Selection:** Choose a username and an avatar upon entering the chat room. This information is stored in the browser for returning users.
- **Persistent Chat History:** View previous messages upon returning to the chat. Older messages are automatically removed after 30 days.
- **Markdown Support:** Enhance messages with simple markdown formatting, including bold, italic, and hyperlinks.
- **Real-time Communication:** Messages are sent and received in real-time, providing a seamless chatting experience.

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