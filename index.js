const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes")
const { noteRouter } = require("./routes/Note.routes");
const { authenticate } = require("./middlewares/authenticate.middleware");
const cors = require("cors")
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("HOME PAGE")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connection established to DB");
  } catch (err) {
    console.log(err);
  }
  console.log("Server is running at port 8080");
});
