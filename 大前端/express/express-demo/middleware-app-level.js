//? 应用级别中间件
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//todo 不做任何限定的中间件
app.use((req, res, next) => {
  console.log("GodX------>log不做任何限定的中间件");
  next();
});

//todo 限定请求路径
app.use("/condition", (req, res, next) => {
  console.log("GodX------>log限定请求路径");
  next();
});

//todo 限定请求路径和请求方法
app.get("/", async (req, res, next) => {
  console.log("GodX------>log限定请求路径和请求方法");
  res.send("ok");
});

//todo 配置多个处理函数
//* 当有多个处理函数时，可以使用 next('route') 跳出当前中间件
//!  next('route') 将仅在使用 app.METHOD() 或 router.METHOD() 函数加载的中间件函数中工作
app.get(
  "/user",
  (req, res, next) => {
    console.log("GodX------>log配置多个处理函数1");
    // 执行下一个处理函数
    // next();
    // 不执行下面的处理函数，直接跳出当前处理栈
    next("route");
  },
  (req, res, next) => {
    console.log("GodX------>log配置多个处理函数2");
    // 最后一个 next 会脱离当前处理栈
    next();
  }
);
//* 可以将多个中间件写出数组形式
const a = (req, res, next) => {
  console.log("GodX------>loga");
  next();
};
const b = (req, res, next) => {
  console.log("GodX------>logb");
  next();
};
const arr = [a, b];
app.get("/arr", arr, (req, res, next) => {
  res.send("arr ok");
});

//todo 为同一个路径定义多个处理中间件
app.get("/user", (req, res, next) => {
  console.log("GodX------>log配置多个处理函数3");
  res.send("ok");
});

app.listen(3000, () => {
  console.log("服务已启动！");
});
