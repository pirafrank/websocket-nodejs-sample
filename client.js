const WebSocket = require('ws');

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:8080');

// Handle connection open
ws.on('open', () => {
  console.log('Connected to the server');

  // Send a test integer
  const testValue = 0;
  console.log(`Sending value: ${testValue}`);
  ws.send(testValue.toString());

  // Setup readline interface to send more values
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askForNumber() {
    readline.question('Enter an integer (or "exit" to quit): ', (input) => {
      if (input.toLowerCase() === 'exit') {
        readline.close();
        ws.close();
        return;
      }

      ws.send(input);
      // Don't ask again immediately, wait for response
    });
  }

  // Ask for the first number after connection
  setTimeout(askForNumber, 1000);

  // Handle server messages
  ws.on('message', (message) => {
    console.log(`Server response: ${message}`);

    // Ask for another number after receiving a response
    askForNumber();
  });
});

// Handle errors
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

// Handle connection close
ws.on('close', () => {
  console.log('Disconnected from the server');
  process.exit(0);
});
