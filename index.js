const express = require("express");
const app = express();
const mongoose = require("mongoose");
const SignUp = require("./modals/app");
const path = require("path");
const cors = require("cors");

const url =
  "mongodb+srv://ankushrana98145:BZHCI6NkxABCMQ7s@node-api.b3a6gik.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Node-API";

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", async (req, res) => {
  console.log(req.body)
          const { name, password } = req.body;
  try {
    const user = await SignUp.findOne({name});
    console.log(user);
    console.log(password);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.status(200).json({ message: "Login succesfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/signup", async (req, res) => {
          console.log(path,"path")
  console.log(req.body);
  const { name, email, password, confirmPassword, phone } = req.body;
  //          res.send("Signup successfully")
  try {
    const newUserCreate = await SignUp.create(req.body);
    res.status(200).json(newUserCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(5000, () => {
      console.log("server is  listening to port 5000");
    });
  })
  .catch((error) => {
    console.log(error,"Connectin Failed");
  });
