const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ROUTERINDEX = require("./routes/index");
const path = require("path");
const cors = require("cors");
app.use(express.json());

// app.set("view", path.join(__dirname,"view"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "/public"))); // koi pan directry ma path join karva mate thai che
app.use(express.static(path.join(__dirname + "/controllers")));
app.use(express.static(path.join(__dirname + "/plugins")));
app.use(cors());


// app.get('/', function (req, res) {
//      res.render('login')
// });
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


