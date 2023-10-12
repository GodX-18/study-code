const mongoose = require("mongoose");

async function main() {
  // 连接 mongoDB 数据库
  // mongoose.connect("mongodb://数据库的ip地址:端口号/数据库名");
  // 如果端口号是默认端口号 27017 可以省略不写
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: {
      type: String,
      default: "male" // 默认值
    }
  });
  // 通过 schema 来创建 Model
  // Model 代表的是数据库的集合，通过 Model 才能对数据库进行操作
  // mongoose 会自动将集合名变成复数 zx ---> zxes
  const ZxModel = mongoose.model("zx", personSchema);

  //todo 新增： 向数据库中插入一个文档
  //   ZxModel.create([
  //     {
  //       name: "a",
  //       age: 18
  //     },
  //     {
  //       name: "b",
  //       age: 20
  //     }
  //   ])
  //     .then((res) => {
  //       console.log("GodX------>log插入成功！");
  //     })
  //     .catch((err) => {
  //       console.log("GodX------>log", err);
  //     });
  //todo 查询
  // 返回值为数组
  // 投影有两种传递方式
  //* {name:1,_id:0}
  //* "name -_id"
  ZxModel.find({}, "name age -_id", {
    skip: 2,
    limit: 1
  }).then((res) => {
    // console.log("GodX------>logfind", res);
  });
  ZxModel.findOne({}).then((res) => {
    // console.log("GodX------>logfindOne", res);
  });
  ZxModel.findById("652745ec7e83c5bb73097965").then((res) => {
    // 查询出来的结果 document 就是 Model 的实例
    // console.log("GodX------>log", res instanceof ZxModel); // true
    // console.log("GodX------>logfindById", res);
  });

  //* 统计文档的数量
  ZxModel.count({ name: "zx2" }).then((num) => {
    console.log("GodX------>lognum", num);
  });

  //todo 修改
  ZxModel.updateOne({ name: "a" }, { $set: { age: 28 } }).then((res) => {
    console.log("GodX------>logupdateOne", res);
  });
  ZxModel.replaceOne({ name: "a" }, { name: "ab", age: 100 }).then((res) => {
    console.log("GodX------>logupdateOne", res);
  });

  //todo 删除
  //   ZxModel.deleteOne({ name: "a" });
  //   ZxModel.deleteMany({ name: "zx" });
}

mongoose.connection.once("open", () => {
  console.log("GodX------>log数据库连接成功");
});

mongoose.connection.once("close", () => {
  console.log("GodX------>log数据库连接已断开");
});

main().catch((err) => console.log(err));
//* 一般情况下，只需要连接一次，除非项目停止服务器，否则连接一般不会断开
// mongoose.disconnect();
