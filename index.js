require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const Chat = require("./models/chat.js");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MongoDB connection
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("MongoDB connection successful");
}

main().catch((err) => {
  console.log("MongoDB connection error:", err);
});

// Index
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

app.get("/", (req, res) => {
  res.redirect("/chats");
});

// New chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create chat
app.post("/chats", async (req, res) => {
  const { from, to, msg } = req.body;

  const newChat = new Chat({
    from: from,
    to: to,
    msg: msg
  });

  await newChat.save();
  res.redirect("/chats");
});

// Edit route
app.get("/chats/:id/edit", async (req, res) => {
  const { id } = req.params;

  const chat = await Chat.findById(id);

  res.render("edit.ejs", { chat });
});

app.put("/chats/:id", async (req, res) => {
  const { id } = req.params;
  const { newmsgg } = req.body;

  await Chat.findByIdAndUpdate(id, {
    msg: newmsgg
  });

  res.redirect("/chats");
});

// Delete route
app.delete("/chats/:id", async (req, res) => {
  const { id } = req.params;

  await Chat.findByIdAndDelete(id);

  res.redirect("/chats");
});

// Start server
app.listen(PORT, () => {
  console.log(`server is alive on port ${PORT}`);
});
