const crypto = require("crypto");

// 获取 ctypto 支持的散列算法
// console.log("GodX------>log", crypto.getHashes());

// md5 可以被暴力破解，因为 md5 加密相同的明文加密的密文是一样的
const md5 = (str) => {
  return crypto
    .createHash("md5")
    .update("zx" + str) // 提高安全性
    .digest("hex");
};

module.exports = md5;
