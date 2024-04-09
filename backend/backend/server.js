const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const dotenv = require("dotenv");

const app = express();

require("dotenv").config();

app.use(cors());

var bodyParser = require('body-parser')
app.use(bodyParser.json())

//database link
const URL = process.env.MONGODB_URL;

const PORT = process.env.PORT || 8080;

mongoose.connect(URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
  });

const connection = mongoose.connection;
connection.once("open", () => {
console.log("mongoDB connection successful !!!");
});

//task
let TaskRouter = require("./routes/tasks-routes");
app.use("/task", TaskRouter);

//user
let UserRouter = require("./routes/user-route");
app.use("/user", UserRouter);

//content
let ContentRouter = require("./routes/content-route");
app.use("/content", ContentRouter);
  

//run the app using port
app.listen(PORT, () =>{
  console.log(`Server is up and running on port number: ${PORT}`);

})