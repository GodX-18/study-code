const connectMongo = require("./tools/connect-mongo.js");
const StudentModel = require("./models/students.js");
async function main() {
  await connectMongo("mongodb://127.0.0.1:27017/test");
  //todo 创建一个 Document
  let stu = new StudentModel({
    name: "小王",
    age: 18,
    gender: "male"
  });

  StudentModel.find().then((res) => {
    console.log(res);
  });
  //todo 保存
  //   stu.save().catch((err) => {
  //     console.log(err);
  //   });

  //todo JSON转换
  //   console.log(stu.toJSON());
  //todo Object 转换
  //   stu = stu.toObject();
  //   delete stu.age;
  //   console.log(stu);

  //todo 修改
  StudentModel.findOne({
    name: "小明"
  }).then(async (doc) => {
    //* 第一种
    // doc.age = 29;
    // doc.save();
    //* 第二种
    // doc
    //   .updateOne({
    //     $set: {
    //       age: 24
    //     }
    //   })
    //   //! 必须得有回调，否者修改无效！
    //   .then((res) => {
    //     console.log("修改成功！", res);
    //   })
    //   .catch((err) => {
    //     console.log("修改失败！", err);
    //   });
    //* 第三种
    // doc.set("name", "小明2");
    // doc.save();
    //todo 删除
    // Mongoose 4.x 版本后，只能通过模型上的方法进行删除 remove/deleteOne/deleteMany
    //todo 获取文档的属性值
    //* 第一种
    // const age = await doc.get("age");
    // console.log(age);
    //* 第二种
    // console.log(doc.age);
  });
}

main().catch((err) => console.log(err));
//* 一般情况下，只需要连接一次，除非项目停止服务器，否则连接一般不会断开
// mongoose.disconnect();
