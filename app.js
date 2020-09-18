const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/passwordapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
};

const User = mongoose.model("User", userSchema);

app.post("/createUser", function (req, res) {
  console.log(req.body);

  const newUser = new User({
    username: req.body.username,
    password: md5(req.body.password),
    confirm_password: md5(req.body.confirm_password),
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  if (newUser.password === newUser.confirm_password) {
    newUser.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("success");
      }
    });
  } else {
    res.send("confirm password do not match with password");
  }
});
app.get("/getUsers", function (req, res) {
  User.find(function (err, foundUsers) {
    if (!err) {
      res.send(foundUsers);
    } else {
      res.send(err);
    }
  });
});


app.post("/user/:uname/:pword" ,function(req,res){
    User.findOne({username: req.params.uname} && {password: md5(req.params.pword)}, function(err, foundUser){
        if(!err){
            if(foundUser){
                res.send(foundUser._id);
            }else{
                res.send("incorrect details");
            }
        }else{
            res.status(500);
        }
    });
});

app.listen(3000, function () {
  console.log("server started at host 3000");
});
