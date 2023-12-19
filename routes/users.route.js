const express = require('express')
require('dotenv').config()
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const { UserModel } = require('../models/user.model')


// Controlers for making a signup request of user
userRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body
  try {
    let userAlreadyThere = await UserModel.findOne({ username: username })
    if (userAlreadyThere) {
      return res.status(201).send("User already exist, please choose a unique username")
    } else {
      // using bcrypt for hashing password before saving in database
      bcrypt.hash(password, 4, async (err, hash) => {  
        if (err) {
          req.send(err.message)
        } else {
          const user = new UserModel({ username, password: hash })
          await user.save()
          res.status(200).send({ "msg": "New user has been regitered Successfully" })
        }
      })
    }
  } catch (error) {
    res.status(400).send({ "error": error.message })
  }
})

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username })
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          // Using jwt for authentication token
          let accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" })
          res.status(200).send({
            "msg": "Login Succesfull", "AccessToken": accessToken, "username": user.username
          })
        } else {
          res.status(400).send({ "msg": err })
        }
      })
    } else {
      res.status(404).send({ "msg": "User does not exist" })
    }
  } catch (error) {
    res.status(500).send({
      "error": error.message
    })
  }
})

module.exports = {
  userRouter
}