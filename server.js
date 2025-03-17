const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server started on port 8080');

// Handle new connection events
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle messages from client
  ws.on('message', (message) => {
    try {
      // Parse the received message to an integer
      const receivedValue = parseInt(message.toString(), 10);

      // Check if it's a valid number
      if (isNaN(receivedValue)) {
        ws.send('Please send a valid integer value');
        return;
      }

      // Multiply the value by 2
      const result = receivedValue * 2;

      console.log(`Received: ${receivedValue}, Sent back: ${result}`);

      // Send the result back to the client
      ws.send(result.toString());
    } catch (error) {
      ws.send('Error processing your message');
      console.error('Error:', error);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Send welcome message
  ws.send('Connected to multiplication server. Send an integer to multiply by 2.');
});
