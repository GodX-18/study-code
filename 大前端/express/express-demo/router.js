const express = require("express");

//* 1. 创建路由实例
const router = express.Router();

//* 2. 配置路由
router.get("/test", (req, res) => {
  res.send("ok");
});

//* 3. 导出路由实例
module.exports = router;

//* 4. 将路由挂载
