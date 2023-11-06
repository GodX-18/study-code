const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//todo 初体验
const myLogger = (req, res, next) => {
  req.foo = "bar";
  res.abc = () => {
    console.log("GodX------>logabc");
  };
  console.log("GodX------>log", req.url, Date.now());
  // 交出执行权，往后继续匹配执行
  next();
};

//todo 定义可配置参数的中间件
const test = (options) => {
  return (req, res, next) => {
    console.log("GodX------>logconfig", req.body, options);
    next();
  };
};

// 中间件的顺序很重要
app.use(myLogger);
app.use(
  test({
    msg: "lcr is sb"
  })
);

app.get("/", async (req, res, next) => {
  console.log("GodX------>log请求成功", req.body);
  res.abc();
  res.send("ok");
});

app.listen(3000, () => {
  console.log("服务已启动！");
});
