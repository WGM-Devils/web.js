// Imports

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const compression = require("compression");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");
const path = require("path");

// Project-Imports

const router = require("./router");
const pages = require("./router/pages");

// Presets

const app = express();
const server = http.createServer(app);

// Configs

env.config();

app.use(compression());
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "views/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/pages"));

mongoose.Promise = Promise;
mongoose.connect(process.env["MONGO_URL"]);
mongoose.connection.on("connected", (stream) =>
  console.log("Database working properly!")
);
mongoose.connection.on("error", (err) => console.log(err));

// Code

server.listen(10000, () => {
  console.log(
    "Server running on local port 10000 with url 'http://localhost:10000/'"
  );
});
app.use("/", router());
