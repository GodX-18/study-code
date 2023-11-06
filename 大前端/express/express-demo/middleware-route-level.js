//? 路由器级别中间件
const express = require("express");
const app = express();
const router = require("./router");

//todo 挂载路由
// app.use(router);

//todo 给路由限定访问前缀
app.use("/abc", router);

app.listen(3000, () => {
  console.log("服务已启动！");
});
