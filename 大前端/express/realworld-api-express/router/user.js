const express = require("express");
const router = express.Router();
const { register, login, getCurrentUser } = require("../controller/user");
const userValidator = require("../validator/user");
const auth = require("../middleware/auth");

//* 用户注册
router.post("/users", userValidator.register, register);

//* 用户登录
router.post("/users/login", userValidator.login, login);

//* 获取当前登录的用户信息
router.get("/user", auth, getCurrentUser);

module.exports = router;
