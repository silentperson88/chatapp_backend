require('dotenv').config();
const PORT = process.env.PORT || 8000;
const app = require('./app/server');
const { sendMesage, likeMessage } = require('./app/controllers/socket.controller');

const http = require('http');
const socketIo = require('socket.io');
const { getAllActiveGroups } = require('./app/services/group.service');

const server = http.createServer(app);
// const io = socketIo(server);

const io = new socketIo.Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://159.89.161.217:3078'],
  },
});

io.on('connection', async socket => {
  const res = await getAllActiveGroups();

  res.forEach(group => {
    sendMesage(group._id, io, socket);
    likeMessage(group._id, io, socket);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

module.exports = server.listen(PORT, () => {
  console.log('server is running on port', PORT);
});
