import { Server } from 'Socket.IO';
import { MongoServerError } from 'mongodb';
import clientPromise from '@lib/mongodb';

const SocketHandler = async (res: any) => {
  if (res.socket.server.io) {
    console.warn('Socket is already running');
  } else {
    console.warn('Socket is initializing');

    const client = await clientPromise;
    const db = client.db('chat_app');

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.warn(`Socket ${socket.id} connected.`);

      socket.on('create', (roomId) => {
        socket.join(roomId);
      });

      socket.on('get-messages', async (msg) => {
        try {
          const messages = await db
            .collection('messages')
            .find({ roomId: msg })
            .sort({ createdAt: -1 })
            .toArray();
          socket.emit('list-messages', messages);
        } catch (err) {
          if (err instanceof MongoServerError) {
            socket.emit('error-message', err.message);
          } else {
            socket.emit('error-message', err);
          }
        }
      });

      socket.on('send-message', async (msg) => {
        const { username, roomId, message } = msg;
        try {
          await db.collection('messages').insertOne({
            username,
            roomId,
            message,
          });
          io.to(roomId).emit('update-message', msg);
        } catch (err) {
          if (err instanceof MongoServerError) {
            socket.emit('error-message', err.message);
          } else {
            socket.emit('error-message', err);
          }
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;
