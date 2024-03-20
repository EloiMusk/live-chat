const socket = io();

function changeUsername() {
  let username = prompt("Please enter your username:", "")
  localStorage.setItem('username', username)
  return username
}

function setUID() {
  let uid = Math.floor(Math.random() * 1000000)
  localStorage.setItem('uid', uid)
  return uid
}

document.addEventListener('DOMContentLoaded', () => {
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');
  const messagesContainer = document.getElementById('messages-container');
  const chatInterface = document.querySelector('.chat-interface'); // Assuming there's a chat interface div
  let username = localStorage.getItem('username') || changeUsername();
  const uid = localStorage.getItem('uid') || setUID();

  if (!username) {
    username = "Anonymous" + Math.floor(Math.random() * 10);
  }
  localStorage.setItem('username', username);
  let avatarURL = `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${uid}`; // The avatar URL will be fetched based on the username

  // Add loading indicator while fetching chat history
  const loadingIndicator = document.createElement('div');
  loadingIndicator.textContent = 'Loading chat history...';
  loadingIndicator.id = 'loading-indicator';
  messagesContainer.appendChild(loadingIndicator);

  async function fetchChatHistory() {
    try {
      const response = await fetch('/api/messages');
      const messages = await response.json();
      messages.forEach(msg => displayMessage(msg)); // Use the displayMessage function
      // Remove loading indicator after loading messages
      document.getElementById('loading-indicator').remove();
    } catch (error) {
      console.error('Failed to fetch chat history:', error.message, error.stack);
    }
  }

  function displayMessage(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    const isCurrentUserMessage = msg.uid === localStorage.getItem('uid');
    messageElement.classList.add(isCurrentUserMessage ? 'current-user' : 'other-user');

    const avatarAndContentContainer = document.createElement('div');
    avatarAndContentContainer.classList.add('avatar-and-content-container');

    if (msg.avatarURL) {
      const avatarContainer = document.createElement('div');
      avatarContainer.classList.add('message-avatar-container');

      const avatarElement = document.createElement('img');
      avatarElement.src = msg.avatarURL;
      avatarElement.classList.add('message-avatar');
      avatarContainer.appendChild(avatarElement);

      avatarAndContentContainer.appendChild(avatarContainer);
    }

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('message-content-container');

    const usernameElement = document.createElement('div');
    usernameElement.textContent = msg.username + (isCurrentUserMessage ? ' (You)' : '');
    usernameElement.classList.add('message-username');

    const contentElement = document.createElement('div');
    contentElement.innerHTML = msg.messageContent; // Set HTML content from msg parameter
    contentElement.classList.add('message-content');

    contentContainer.appendChild(usernameElement);
    contentContainer.appendChild(contentElement);

    avatarAndContentContainer.appendChild(contentContainer);
    messageElement.appendChild(avatarAndContentContainer);

    messagesContainer.appendChild(messageElement);
    // Scroll to the bottom every time a new message is added
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Fetch chat history when the page is loaded
  fetchChatHistory();

  messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (messageInput.value) {
      const messageData = {
        content: messageInput.value,
        username: username,
        avatarURL: avatarURL,
        uid: uid
      };

      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: messageData.username,
            avatarURL: messageData.avatarURL,
            messageContent: messageData.content,
            uid: messageData.uid
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        messageInput.value = ''; // Clear input after sending
      } catch (error) {
        console.error('Message sending error:', error.message, error.stack);
        alert('Message sending failed. Please try again.');
      }
    }
  });

  socket.on('chat message', (msg) => {
    displayMessage(msg);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket.IO connection error:', error.message, error.stack);
    alert('Failed to connect to the server. Please refresh the page to try again.');
  });

  document.getElementById('clear-chat-btn').addEventListener('click', () => {
    // Clear the chat messages from the display
    messagesContainer.innerHTML = '';
    console.log('Chat history view cleared by the user.');
  });

  // Add a button to change the username within the chat interface
  document.getElementById('change-username-btn').addEventListener('click', () => {
    const newUsername = prompt('Please enter your new username:');
    if (newUsername && newUsername !== localStorage.getItem('username')) {
      localStorage.setItem('username', newUsername);
      window.location.reload(); // Reload the page to apply the new username
    }
  });
});