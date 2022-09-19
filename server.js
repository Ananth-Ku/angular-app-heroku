//Install express server
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");

var uri =
  "mongodb+srv://Ananth:Ananth.Kumar_3@cluster0.aopakyj.mongodb.net/?retryWrites=true&w=majority";

const dotenv = require("dotenv");
dotenv.config();
console.log(dotenv);

// Declare a variable named option and assign optional settings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options).then(
  () => {
    console.log("Database connection established!");
  },
  (err) => {
    {
      console.log("Error connecting Database instance due to:", err);
    }
  }
);

var app = express();

app.use(express.static("./dist/angular-app-heroku"));
app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/angular-app-heroku/" })
);

// Serve only the static files form the dist directory
// app.use(bodyParser);
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

var schema = mongoose.Schema;
var UsersSchema = new schema({
  name: { type: String },
  dob: { type: String },
  gender: { type: String },
  qualification: { type: String },
  mobileNumber: { type: String },
  email: { type: String },
});

var model = mongoose.model("userModel", UsersSchema);

app.get("/getUser", function (req, res) {
  model.find({}, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);
