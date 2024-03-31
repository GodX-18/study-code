const express = require("./express");
const app = express();
const port = 3000;

//todo 不验证请求方法和请求路径
// app.use((req, res, next) => {
//   res.end("Hello");
// });

// app.use('/',(req,res) => {
//   res.end('use //')
// })

//todo 匹配 /foo 开头的
//* /foo/a 、 /foo/b 、 /foo/c 、 /foo/d
//* /fooa 、/foob 不可以

// app.use("/foo", (req, res) => {
//   res.end("use foo");
// });


//todo 多个处理函数
app.use(
  "/foo",
  (req, res, next) => {
    console.log("/ 1");
    next();
  },
  (req, res, next) => {
    console.log("/ 2");
    next();
  },
  (req, res, next) => {
    console.log("/ 3");
    res.end('use foo3')
    // next();
  }
);

// app.get("/", (req, res, next) => {
//   res.end("get /");
// });

// app.get("/foo", (req, res, next) => {
//   console.log("foo 1");
//   setTimeout(() => {
//     next();
//   }, 1000);
// });

// app.get("/foo", (req, res, next) => {
//   console.log("foo 2");
//   next();
// });

// app.get("/foo", (req, res, next) => {
//   res.end("get /foo");
// });

// app.get("/", (req, res) => {
//   res.end("Hello World!");
// });

// app.get("/zx", (req, res) => {
//   res.end("zx2!");
// });

//todo 路径匹配
// app.get("/ab?c", (req, res) => {
//   res.end("/ab?c");
// });

// app.get("/users/:userId/books/:bookId", (req, res) => {
//   console.log(req.params);
//   res.end("/users/:userId/books/:bookId");
// });

//todo 不同请求方法
// app.post("/zx", (req, res) => {
//   res.end("post zx!");
// });

// app.patch("/zx", (req, res) => {
//   res.end("patch zx!");
// });

// app.delete("/zx", (req, res) => {
//   res.end("delete zx!");
// });

app.listen(port, () => {
  console.log("GodX------>log服务端应用已经启动在 3000 端口");
});
