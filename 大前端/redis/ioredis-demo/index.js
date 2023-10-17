const Redis = require("ioredis");

//todo 1. 与 redis 建立链接
const redis = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  //   username: "default", // needs Redis >= 6
  //   password: "my-top-secret",
  db: 0 // Defaults to 0
});

//todo 2. 操作数据库
// redis.set("foo", "bar").then((res) => {
//   console.log("GodX------>log写入成功", res);
// });

// redis
//   .get("foo")
//   .then((res) => {
//     console.log("GodX------>log获取成功", res);
//   })
//   .catch((err) => {
//     console.log("GodX------>log获取失败", err);
//   });

async function main() {
  try {
    const res = await redis.get("foo");
    console.log("GodX------>log获取成功", res);
  } catch (error) {
    console.log("GodX------>log获取失败", err);
  }
}

main();
