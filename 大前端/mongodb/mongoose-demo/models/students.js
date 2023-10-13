const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: "male" // 默认值
  }
});

// 通过 schema 来创建 Model
// Model 代表的是数据库的集合，通过 Model 才能对数据库进行操作
// mongoose 会自动将集合名变成复数 zx ---> zxes / student -----> students
const StudentModel = mongoose.model("student", studentSchema);

module.exports = StudentModel;
