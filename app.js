const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/passwordapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
const users = require("./routes/users");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use("/", users);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message,
    },
  });
});
const port = app.get("port") || 3000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
