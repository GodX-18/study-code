//? 错误处理中间件
//* next() 传入任何数据，除了（route）都会被视为错误，并且跳过所有剩余的无错误处理路由和中间件函数
const express = require("express");
const app = express();

app.get("/err", (req, res, next) => {
  try {
    res.send("ok");
  } catch (error) {
    // 统一处理错误
    next(error);
  }
});

app.get("/err2", (req, res, next) => {
  try {
    cons.lof(111);
    res.send();
  } catch (error) {
    // 统一处理错误
    next(error);
  }
});

//todo 在所有的中间件之后挂载错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).json({
    code: 500,
    message: err.message
  });
});

app.listen(3000, () => {
  console.log("服务已启动！");
});
