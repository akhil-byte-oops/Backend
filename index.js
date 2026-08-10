require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const Chat = require("./models/chat.js");

mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
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
//index 
app.get("/chats",async (req,res) => {
   let chats = await Chat.find(); 
//    console.log(chats);
   res.render("index.ejs",{chats});
});
app.get("/", (req,res) => {
    res.send("server success");
});
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/chats", async (req, res) => { 
    const { from, to, msg } = req.body; 
    const newChat = new Chat({ from: from, to: to, msg: msg }); 
    await newChat.save(); 
    res.redirect("/chats");
 });
 //edit route
 app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
 });
app.put("/chats/:id", async (req, res) => {
    const { id } = req.params;
    const { newmsgg } = req.body;

    await Chat.findByIdAndUpdate(id, {
        msg: newmsgg
    });
    res.redirect("/chats"); 
});
app.delete("/chats/:id", async (req, res) => {
    const { id } = req.params;

    await Chat.findByIdAndDelete(id);

    res.redirect("/chats");
});
app.listen(PORT, () => {
  console.log(`server is alive on port ${PORT}`);
});