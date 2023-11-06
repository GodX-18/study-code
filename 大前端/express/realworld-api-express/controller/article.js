const { Article, User } = require("../model");

//* 创建文章
exports.createArticle = async (req, res, next) => {
  try {
    const article = new Article(req.body.article);
    article.author = req.user._id;
    await article.populate("author");
    await article.save();
    res.status(200).json({
      article
    });
  } catch (error) {
    next(error);
  }
};
//* 获取文章
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId).populate("author");
    res.status(200).json({
      article
    });
  } catch (error) {
    next(error);
  }
};
//* 查询文章列表
exports.getArticles = async (req, res, next) => {
  const { limit = 20, offset = 0, tag, author } = req.query;
  const filter = {};
  if (tag) {
    filter.tagList = tag;
  }
  if (author) {
    const user = await User.findOne({ username: author });
    filter.author = user?._id ?? null;
  }
  const articles = await Article.find(filter).populate("author").skip(parseInt(offset)).limit(parseInt(limit)).sort({
    // -1 倒叙，1 升序
    createdAt: -1
  });
  const articlesCount = await Article.countDocuments();
  if (articles.length > 0) {
    res.status(200).json({
      articles,
      articlesCount
    });
  } else {
    res.status(200).json({
      msg: "No articles found"
    });
  }
};

//* 更新文章
exports.updateArticle = async (req, res, next) => {
  try {
    const article = req.article;
    const { title, description, body } = req.body;
    title && (article.title = title);
    description && (article.description = description);
    body && (article.body = body);
    await article.save();
    res.status(200).json({
      article: req.article
    });
  } catch (error) {
    next(error);
  }
};

//* 删除文章
exports.deleteArticle = async (req, res, next) => {
  try {
    await Article.deleteOne({
      _id: req.params.articleId
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
