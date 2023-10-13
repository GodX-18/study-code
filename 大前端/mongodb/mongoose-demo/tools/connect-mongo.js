const mongoose = require("mongoose");

async function connectMongo(url) {
  // 连接 mongoDB 数据库
  // mongoose.connect("mongodb://数据库的ip地址:端口号/数据库名");
  // 如果端口号是默认端口号 27017 可以省略不写
  await mongoose.connect(url);
  return mongoose;
}
mongoose.connection.once("open", () => {
  console.log("GodX------>log数据库连接成功");
});

mongoose.connection.once("close", () => {
  console.log("GodX------>log数据库连接已断开");
});

module.exports = connectMongo;
