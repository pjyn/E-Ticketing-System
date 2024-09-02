// Start the server.

const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const connectDB = require('./config/dbConfig'); 

// Connect to MongoDB
connectDB();

io.on('connection', (socket) => {
  console.log('A user connected');
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
