//? 404 中间件
const express = require("express");
const app = express();

app.get("/a", (req, res, next) => {
  try {
    res.send("ok");
  } catch (error) {
    // 统一处理错误
    next(error);
  }
});

app.get("/b", (req, res, next) => {
  try {
    res.end();
  } catch (error) {
    // 统一处理错误
    next(error);
  }
});

//todo 在所有的路由之后挂载404中间件
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(3000, () => {
  console.log("服务已启动！");
});
