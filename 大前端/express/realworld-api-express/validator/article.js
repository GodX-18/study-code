const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const { Article } = require("../model");
const mongoose = require("mongoose");
const { values } = require("lodash");

// 创建文章
exports.createArticle = validate([
  body("article.title").notEmpty().withMessage("文章标题不能为空"),
  body("article.description").notEmpty().withMessage("文章摘要不能为空"),
  body("article.body").notEmpty().withMessage("文章内容不能为空")
]);

// 获取文章
// exports.getArticle = validate([
//   param("articleId").custom(async (value) => {
//     if (!mongoose.isValidObjectId(value)) {
//       return Promise.reject("文章 ID 类型错误！");
//       // 同步
//       // throw new Error("文章 ID 类型错误！");
//     }
//     // 同步
//     // return true;
//   })
// ]);
exports.getArticle = validate([validate.isValidObjectId(["params"], "articleId")]);

// 更新文章
exports.updateArticle = [
  validate.isValidObjectId(["params"], "articleId"),
  // 校验文章是否存在
  async (req, res, next) => {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId);
    req.article = article;
    if (!article) {
      res.status(200).json({
        code: 200,
        message: "Article not found"
      });
    }
    next();
  },
  // 修改的文章作者是否是当前登录用户
  async (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      res.status(200).json({
        code: 200,
        message: "您不是文章的作者，无权操作！"
      });
    }
    next();
  }
];

exports.deleteArticle = exports.updateArticle;
