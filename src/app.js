const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { nanoid } = require("nanoid");
const monk = require("monk");
const path = require("path");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();
const notFoundPath = path.join(__dirname, "public/404.html");
 const roomPath = path.join(__dirname, "public/index.html");
//  const roomPath = path.join(__dirname, "build/index.html");


// This is the React client path.

// When you've finished the React app, move
// the build version and serve it.
// app.use(express.static(path.join(__dirname, "public")));


const db = monk(process.env.MONGODB_URI);
const rooms = db.get("rooms");
rooms.createIndex("room");

// const schema =
// Create schema for room.

app.use(morgan("dev"));
// app.use(helmet());

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
res.send("👋🏻")
});
app.get("/t", (req, res) => {
  res.send("👋🏻")
  });

app.get("/t/:id", async (req, res, next) => {
  const { id: roomID } = req.params;
  try {
    const room = await rooms.findOne({ roomID });
    if (room) {
      return res.status(200).sendFile(roomPath);
    }
    return res.sendFile(notFoundPath);
  } catch (error) {
    return res.status(404).sendFile(notFoundPath);
  }
});

app.get("/list", async (req, res, next) => {
  // Lists each ID.
  res.send("Hello");
  const ids = await rooms.find();
  // Returns array.
  ids.forEach((id) => console.log(id.roomID));
});
app.post("/gen/", async (req, res, next) => {
  let roomID = nanoid(5);
  const newRoom = {
    roomID: roomID,
  };
  const createdRoom = await rooms.insert(newRoom);
  res.json(createdRoom);
});
app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
