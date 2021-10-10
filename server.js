const express = require("express")
const connect = require("./configs/db")
const cors = require("cors")
const passport = require("passport")
const cookieSession = require("cookie-session")
const app = express()
app.use(cors())
app.use(express.json())
// const User = require("./models/user.model")

//pusher starts
const Pusher = require("pusher")

const userController = require("./controllers/user.controller")
app.use("/users", userController)

const reviewController = require("./controllers/review.controller")
app.use("/reviews", reviewController)

const pusher = new Pusher({
  appId: "1279185",
  key: "8c79b67adca098eeafac",
  secret: "94b6dbba1d64c1e17845",
  cluster: "ap2",
  useTLS: true,
})

app.post("/message", (req, res) => {
  const payload = req.body
  pusher.trigger("chat", "message", payload)
  res.send(payload)
})

// pusher ends

const start = async () => {
  await connect()

  app.listen(1234, (err, res) => {
    console.log("listening on port 1234")
  })
}

module.exports = start
