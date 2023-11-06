const express = require("express");
const router = express.Router();
const { createArticle, getArticle, getArticles, updateArticle, deleteArticle } = require("../controller/article");
const articleValidator = require("../validator/article");
const auth = require("../middleware/auth");
const { update } = require("lodash");

// 创建文章
router.post("/", auth, articleValidator.createArticle, createArticle);
// 根据 id 获取文章
router.get("/:articleId", articleValidator.getArticle, getArticle);
// 获取文章列表
router.get("/", getArticles);
// 更新文章
router.put("/:articleId", auth, articleValidator.updateArticle, updateArticle);
// 删除文章
router.delete("/:articleId", auth, articleValidator.deleteArticle, deleteArticle);

module.exports = router;
