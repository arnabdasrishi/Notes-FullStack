const express = require("express");
const { UserModel } = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();

// POST REQUEST(Registration)
userRouter.post("/register", async (req, res) => {
  const { name,email,pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async(err, hash) => {
        if(err){
            res.send(err);
        } else {
            const user = new UserModel({name,email,pass:hash});
            await user.save();
            res.send({ msg: "New user registered" });
        }
    });
  } catch (err) {
    res.send(err.message);
  }
});

//POST REQUEST (login)
userRouter.post("/login", async (req, res) => {
  const { email,pass } = req.body;
  try {
    const user = await UserModel.find({email});
    if (user.length > 0) {
        bcrypt.compare(pass , user[0].pass, (err, result) => {
            if(result){
                let token = jwt.sign({userID: user[0]._id},"masai")
                res.send({"massage":"Logged In","token":token})
            } else {
                res.send("wrong credentials");
              }
        });
    } else {
        res.send({"msg":"Invalid Credentials"})
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = {
  userRouter,
};
