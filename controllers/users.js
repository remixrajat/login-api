const md5 = require("md5");
const User = require("../models/user");

module.exports = {
  createUser: function (req, res) {
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
  },

  getUsers: function (req, res) {
    User.find(function (err, foundUsers) {
      if (!err) {
        res.send(foundUsers);
      } else {
        res.send(err);
      }
    });
  },

  userLogin: function (req, res) {
    User.findOne(
      { username: req.body.username } && { password: md5(req.body.password) },
      function (err, foundUser) {
        if (!err) {
          if (foundUser) {
            res.send(foundUser._id);
          } else {
            res.send(err);
          }
        } else {
          res.status(500).send("error occured");
        }
      }
    );
  },

  getId: function (req, res) {
    User.findOne({ _id: req.headers.accesstoken }, function (err, foundUser) {
      if (!err) {
        res.send(foundUser);
      } else {
        res.send("Not Found any user with this access token");
      }
    });
  },

  deleteUser: function (req, res) {
    User.deleteOne({ _id: req.headers.accesstoken }, function (err) {
      if (!err) {
        res.send("sucessfully deleted user");
      } else {
        res.status(400).send("error occured");
      }
    });
  },

  getPages: function (req, res) {
    User.find(function (err, foundUsers) {
      if (!err) {
        res.send(foundUsers);
      } else {
        res.send(err);
      }
    })
      .skip(req.params.page * 10)
      .limit(10);
  },
};
