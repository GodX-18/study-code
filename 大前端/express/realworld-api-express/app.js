const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middleware/error-handler");

// 连接数据库
require("./model");

// 注册内置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//注册第三方中间件
app.use(morgan("dev"));
app.use(cors());

// 挂载路由
app.use("/api", router);

// 挂载统一处理服务端错误中间件
app.use(errorHandler());

// linux 和 macos 环境下通过： PORT=5020 nodemon ./app.js 指定环境变量
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
