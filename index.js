const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ROUTERINDEX = require("./routes/index.routes");
const session = require("express-session");
const path = require("path");
const cors = require("cors");


app.use(session({
  secret: '12346654345456443545', 
  resave: false,
  saveUninitialized: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join(__dirname + "/controllers")));

app.use(cors());


app.set("view engine", "ejs");

app.use("/", ROUTERINDEX);

mongoose
  .connect(
    "mongodb+srv://Dishantmarquee:Dishant007admin@cluster0.rhtmwv6.mongodb.net/Dishant--api?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected  to MongoDB!");
    app.listen(4000, () => {
      console.log("Listening Port is 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });


