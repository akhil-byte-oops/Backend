require("dotenv").config();

const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

const MONGO_URL = process.env.MONGO_URL;

const allchats = [
  {
    from: "neha",
    to: "parth",
    msg: "Hey, how are you?",
    created_at: new Date(),
  },
  {
    from: "rahul",
    to: "priya",
    msg: "Are you coming today?",
    created_at: new Date(),
  },
  {
    from: "amit",
    to: "rohan",
    msg: "Let's meet tomorrow.",
    created_at: new Date(),
  },
  {
    from: "sneha",
    to: "aditya",
    msg: "Did you complete the project?",
    created_at: new Date(),
  },
  {
    from: "vikas",
    to: "neha",
    msg: "Good morning!",
    created_at: new Date(),
  },
  {
    from: "priya",
    to: "rahul",
    msg: "Can you call me later?",
    created_at: new Date(),
  },
  {
    from: "rohan",
    to: "amit",
    msg: "I will send it soon.",
    created_at: new Date(),
  },
  {
    from: "aditya",
    to: "sneha",
    msg: "Thank you so much!",
    created_at: new Date(),
  },
];

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connection successful");

    await Chat.insertMany(allchats);
    console.log("Chats inserted successfully");

    await mongoose.connection.close();
  } catch (err) {
    console.log("MongoDB error:", err);
  }
}

main();
