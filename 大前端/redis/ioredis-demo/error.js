const Redis = require("ioredis");
const redis = new Redis({ showFriendlyErrorStack: true });

async function main() {
  try {
    await redis.set("abc");
    console.log("GodX------>logOK");
  } catch (error) {
    console.log("GodX------>log操作失败", error);
  }
}
main();
