const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todo = require("./routes/todo");
const cors = require("cors");
const app = express();
const path = require("path");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = require("./config/keys").mongoURI;
// const db = process.env.MONGODB_URI || require("./config/keys").mongoURI;
//passport config file : uses strategy

//connect to mongodb
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err));

app.use("/api/todo", todo);

// app.use(express.static(__dirname + "/public"));
// app.use(express.static("build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
