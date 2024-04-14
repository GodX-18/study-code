const Koa = require("./koa");
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)


app = new Koa();

//todo 中间件
// const one = (ctx, next) => {
//   console.log(">> one");
//   next();
//   console.log("<< one");
// };

// const two = (ctx, next) => {
//   console.log(">> two");
//   next();
//   console.log("<< two");
// };

// const three = (ctx, next) => {
//   console.log(">> three");
//   next();
//   console.log("<< three");
// };

// app.use(one);
// app.use(two);
// app.use(three);

app.use(async (ctx) => {
  // ctx.body = 'string'

  // ctx.body = 123

  // const data = await readFile('./package.json')
  // ctx.body = data

  // ctx.body = fs.createReadStream('./package.json')

  // ctx.body = { foo: 'bar' }
  ctx.body = [1, 2, 3]

  // ctx.body = null;
});
//todo context 上下文
app.use(async (ctx, next) => {
  // Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。
  // 每个请求都将创建一个 Context，并在中间件中作为参数引用
  console.log(ctx); // Context 对象
  // console.log(ctx.req.url)
  // console.log(ctx.req.method)
  // console.log(ctx.request.req.url)
  // console.log(ctx.request.req.method)

  // console.log(ctx.req) // Node 的 request 对象
  // console.log(ctx.res) // Node 的 response 对象
  // console.log(ctx.req.url)

  // console.log(ctx.request) // Koa 中封装的请求对象
  // console.log(ctx.request.header) // 获取请求头对象
  // console.log(ctx.request.method) // 获取请求方法
  // console.log(ctx.request.url) // 获取请求路径
  // console.log(ctx.request.path) // 获取不包含查询字符串的请求路径
  // console.log(ctx.request.query) // 获取请求路径中的查询字符串

  // Request 别名
  // 完整列表参见：https://koa.bootcss.com/#request-
  // console.log(ctx.header);
  // console.log(ctx.method);
  // console.log(ctx.url);
  // console.log(ctx.path);
  // console.log(ctx.query);

  // Koa 中封装的响应对象
  // console.log(ctx.response)
  // ctx.response.status = 200
  // ctx.response.message = 'Success'
  // ctx.response.type = 'plain'
  // ctx.response.body = 'Hello Koa'

  // Response 别名
  // ctx.status = 200
  // ctx.message = 'Success'
  // ctx.type = 'plain'

  // ctx.body = "Hello Koa";
});
app.listen(3001);
