const { verify } = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");
const { User } = require("../model");

module.exports = async (req, res, next) => {
  // 从请求头获取 token 数据
  const token = req.headers.authorization?.split("Bearer ")[1] ?? null;
  if (!token) {
    return res.status(401).end();
  }
  try {
    const { userId } = await verify(token, jwtSecret);
    if (userId) {
      req.user = await User.findById(userId);
    }
    next();
  } catch (error) {
    return res.status(401).end();
  }
};
