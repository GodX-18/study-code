const Redis = require("ioredis");
const redis = new Redis();

async function main() {
  try {
    // 批量操作数据库，提升效率
    const pipeline = redis.pipeline();
    for (let i = 0; i < 100; i++) {
      pipeline.set(`${i}-foo`, i);
    }
    console.log("GodX------>log", pipeline.length); // 获取任务数
    const res = await pipeline.exec();
    console.log("GodX------>log", res);
  } catch (error) {
    console.log("GodX------>log操作失败", err);
  }
}

main();
