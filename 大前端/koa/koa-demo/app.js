const Koa = require("koa");
const serve = require("koa-static");
const Router = require("@koa/router");
const path = require("path");
const mount = require("koa-mount");
const util = require("util");
const fs = require("fs");
const compose = require("koa-compose");
const { koaBody } = require("koa-body");

const app = new Koa();
const router = new Router();



//todo 中间件错误处理
//* 最外层统一处理（推荐）
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.message;
    // 手动触发应用的 error 事件
    ctx.app.emit("error", error, ctx);
  }
});

//* 监听错误事件
// app.on("error", (err, ctx) => {
//   console.log("GodX------>log", err, ctx);
// });

// app.use(async (ctx, next) => {
//   JSON.parse("{}");
//   // next(); // 无法捕获后面的异步中间件
//   // return next(); // 可以捕获
//   await next(); // 可以捕获(推荐)
// });

// 异步中间件
// app.use(async (ctx) => {
//   const data = await util.promisify(fs.readFile)("./xxx/index.html");
//   ctx.type = "html";
//   ctx.body = data;
// });

//* 单独处理(不推荐)
// app.use((ctx, next) => {
//   try {
//     JSON.parse("xxxx");
//     ctx.body = "hello koa";
//   } catch (error) {
//     // ctx.response.status = 500;
//     // ctx.response.body = "服务端内部错误";

//     // ctx.throw(500);
//     ctx.throw(404);
//   }
// });

//todo koa-body 模块体验
app.use(koaBody());
app.use((ctx) => {
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
});


//todo cookie 使用
// app.use((ctx) => {
//   const n = Number(ctx.cookies.get("view") || 0) + 1;
//   ctx.cookies.set("view", n);
//   ctx.response.body = n + " views";
// });

//todo 异步中间件
// app.use(async (ctx, next) => {
//   // 不指定编码或指定类型，浏览器默认为二进制文件会自动下载
//   const data = await util.promisify(fs.readFile)("./views/index.html");
//   ctx.type = "html";
//   ctx.body = data;
//   next();
// });

//todo 中间件合成
// const a1 = (ctx, next) => {
//   console.log("GodX------>loga1");
//   next();
// };
// const a2 = (ctx, next) => {
//   console.log("GodX------>loga2");
//   next();
// };
// const a3 = (ctx, next) => {
//   console.log("GodX------>loga3");
//   next();
// };

// app.use(compose([a1, a2, a3]));

//todo 重定向

// router.get("/test", (ctx) => {
//   ctx.body = "test";
// });

// router.get("/fool", (ctx) => {
//   // 重定向针对的同步请求
//   ctx.redirect("/test");
// });

//todo 洋葱圈
// const one = (ctx, next) => {
//   console.log('>> one');
//   next();
//   console.log('<< one');
// }

// const two = (ctx, next) => {
//   console.log('>> two');
//   next();
//   console.log('<< two');
// }

// const three = (ctx, next) => {
//   console.log('>> three');
//   next();
//   console.log('<< three');
// }

// app.use(one);
// app.use(two);
// app.use(three);
//! 洋葱圈end

// app.use((ctx) => {
//   ctx.res.end("6666");
//   ctx.body = "Hello Koa";
// });

//todo 路由
app.use(router.routes()).use(router.allowedMethods());

//todo 静态资源
//* 基本使用
// app.use(serve(path.join(__dirname, "./public")));
//* 虚拟路径
app.use(mount("/public", serve(path.join(__dirname, "./public"))));

//todo 端口监听
app.listen(3000, () => {
  console.log("GodX------>log3000端口已经启动");
});
