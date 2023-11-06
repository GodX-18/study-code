const { User } = require("../model");
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");

// 用户注册
exports.register = async (req, res, next) => {
  try {
    // 处理请求
    let user = new User(req.body.user);
    await user.save();
    user = user.toJSON();
    delete user.password;
    res.status(200).json({
      user
    });
  } catch (error) {
    next(error);
  }
};

// 用户登录
exports.login = async (req, res, next) => {
  try {
    // 生成token
    const user = req.user.toJSON();
    const token = await jwt.sign(
      {
        userId: user._id
      },
      jwtSecret,
      {
        expiresIn: "2d" // token 有效时间,默认单位是秒
      }
    );
    // 发送成功响应（包含 token 的用户信息）
    delete user.password;
    res.status(200).json({
      ...user,
      token
    });
  } catch (error) {
    next(error);
  }
};

// 获取当前用户信息
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};
