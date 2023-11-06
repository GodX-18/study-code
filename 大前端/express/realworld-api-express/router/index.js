const express = require("express");
const router = express.Router();

//* 用户相关
router.use(require("./user.js"));

router.use("/articles", require("./article.js"));

module.exports = router;
