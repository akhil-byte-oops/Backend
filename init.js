const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
const Chat = require("./models/chat.js");
main()
.then(() => {
    console.log("connection successful");
})
.catch((err) => {
    console.log("error");
});
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allchats = [
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
Chat.insertMany(allchats);