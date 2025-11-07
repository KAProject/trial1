// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

let logs = []; // Store login/logout events
const MAX_LOGS = 1000; // Limit the number of logs stored in memory

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(express.static(path.join(__dirname, 'public')));

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('employeeAction', (data) => {
    try {
      // Validate data
      if (!data.name || !data.number || !data.action || !data.time) {
        console.error('Invalid data received:', data);
        return;
      }

      // Add to logs with limit
      logs.push(data);
      if (logs.length > MAX_LOGS) {
        logs.shift(); // Remove oldest log if we exceed the limit
      }

      io.emit('updateLogs', logs); // Broadcast to all clients
    } catch (error) {
      console.error('Error processing employee action:', error);
    }
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server shutting down');
    process.exit(0);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});