const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const io = require("socket.io")(80);

io.on("connection", (socket) => {
  socket.on("connected", () => {
    /* Code to run upon hearing an emit from the client */
    console.log(`a user connected ${socket.id}`);
  });
  socket.on("message", (message, roomID) => {
    // Message received and sent back to clients.
    // socket.broadcast.emit("receive",message);
    // Currently sends back to socket emitting data,
    // Needs to grab room ID to be specfic

    // Sends to specific room ID.
    const client = socket.id;
    io.in(roomID).emit("receive", message);
  });

  socket.on("join_room", (room) => {
    // Joins room specific to custom ID.
    socket.join(room);
    console.log(socket.id + ` joined  ` + room);
  });

  socket.on("leave_room", (room) => {
    // Joins room specific to custom ID.
    socket.leave(room);
    console.log(socket.id + `left ` + room);
  });

  socket.on("data", () => {
    console.log("Received Data");
  });
  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

server.listen(port, () => console.log(`Server running on ${port}`));

// app.listen(port, () => {
//   /* eslint-disable no-console */
//   console.log(`Listening: http://localhost:${port}`);
//   /* eslint-enable no-console */
// });
