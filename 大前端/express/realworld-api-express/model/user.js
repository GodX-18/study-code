const mongoose = require("mongoose");
const baseModel = require("./base-model");
const md5 = require("../util/md5");

const userSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: (value) => md5(value),
    select: false // 查询的时候默认隐藏
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  }
});

// 通过 schema 来创建 Model
// Model 代表的是数据库的集合，通过 Model 才能对数据库进行操作
// mongoose 会自动将集合名变成复数 zx ---> zxes / student -----> students
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
