const Redis = require("ioredis");
const redis = new Redis();

async function main() {
  try {
    const res = await redis.multi().set("Jack", 100).set("Rose", 120).exec();
    console.log("GodX------>log", res);
  } catch (error) {
    console.log("GodX------>log操作失败", error);
  }
}

main();
