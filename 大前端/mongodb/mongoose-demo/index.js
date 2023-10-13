const connectMongo = require("./tools/connect-mongo.js");
const ZxModel = require("./models/students.js");

async function main() {
  await connectMongo("mongodb://127.0.0.1:27017/test");
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

main().catch((err) => console.log(err));
//* 一般情况下，只需要连接一次，除非项目停止服务器，否则连接一般不会断开
// mongoose.disconnect();
