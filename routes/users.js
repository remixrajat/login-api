const express = require("express");
const router = express.Router();
const Userscontroller = require("../controllers/users");

router.post("/createUser", Userscontroller.createUser);
router.get("/getUsers", Userscontroller.getUsers);
router.post("/user/login", Userscontroller.userLogin);
router.get("/user/get", Userscontroller.getId);
router.put("/user/delete", Userscontroller.deleteUser);
router.get("/users/list/:page", Userscontroller.getPages);
module.exports = router;
