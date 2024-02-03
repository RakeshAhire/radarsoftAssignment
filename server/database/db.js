const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://RakeshAhire:Rakesh@cluster0.0agwmvo.mongodb.net/radarsoft?retryWrites=true&w=majority"
);

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

module.exports = { connection };
