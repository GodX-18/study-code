// 后端入口模块
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const connectUri = "mongodb://127.0.0.1:27017";
const dbClient = new MongoClient(connectUri);

const app = express();

// 配置解析请求体数据 application/json
// 它会把解析到的请求体数据放到 req.body 中
//! 注意：一定要在使用之前挂载这个中间件
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 新增文章
app.post("/articles", async (req, res, next) => {
  try {
    //* 1. 获取客户端表单数据
    const { article } = req.body;
    //* 2. 数据验证
    if (!article || !article.title || !article.description || !article.body) {
      return res.status(422).json({
        error: "请求参数格式错误！"
      });
    }
    //* 3. 把验证通过的数据插入数据库中
    //  成功 ---> 发送成功响应
    //  失败 ---> 发送失败响应
    await dbClient.connect();
    const collection = dbClient.db("test").collection("articles");
    const { acknowledged, insertedId } = await collection.insertOne(article);
    if (acknowledged) {
      res.status(200).json({
        code: 200,
        article: {
          ...article,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }
  } catch (error) {
    // 由错误路由中间件统一处理
    next(error);
  }
});

// 获取文章-分页
app.get("/articles", async (req, res, next) => {
  try {
    const { page = 1, size = 10 } = req.query;
    console.log("GodX------>log", page, size);
    await dbClient.connect();
    const collection = dbClient.db("test").collection("articles");
    const ret = await collection
      .find() // 查询数据
      .skip(size * (page - 1)) // 跳过多少条
      .limit(Number(size)); // 拿多少条
    const data = await ret.toArray();
    const total = await collection.countDocuments();
    res.status(200).json({
      code: 200,
      data: {
        list: data,
        total
      }
    });
  } catch (error) {
    // 由错误路由中间件统一处理
    next(error);
  }
});

// 根据ID获取单个文章
app.get("/articles/:id", async (req, res, next) => {
  try {
    await dbClient.connect();
    const collection = dbClient.db("test").collection("articles");
    const ret = await collection.findOne({
      _id: new ObjectId(req.params.id)
    });
    res.status(200).json({
      code: 200,
      data: ret
    });
  } catch (error) {
    next(error);
  }
});

// 更新文章
app.patch("/articles/:id", async (req, res, next) => {
  try {
    await dbClient.connect();
    const collection = dbClient.db("test").collection("articles");
    await collection.replaceOne(
      {
        _id: new ObjectId(req.params.id)
      },
      //* 替换
      req.body
      //* 融合
      // {
      //   $set: req.body,
      //   $currentDate: { lastModified: true }
      // }
    );

    res.status(200).json({
      code: 200,
      msg: "更新成功！"
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/articles/:id", (req, res) => {
  res.send("delete /articles/:id");
});

// 它之前的所有路由中调用 next(err) 就会进入这里
//! 注意: 4个参数，缺一不可，否则会当作普通的路由处理
app.use((err, req, res, next) => {
  res.status(500).json({
    code: 500,
    msg: err.message
  });
});

app.listen(3000, () => {
  console.log("GodX------>log服务启动在3000端口");
});
