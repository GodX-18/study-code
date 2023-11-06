const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { User } = require("../model");
const md5 = require("../util/md5");

//* 注册
exports.register = validate([
  body("user.username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .bail() // 前面的验证不通过不会往下执行
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject("用户名已经存在！");
      }
    }),
  body("user.password").notEmpty().withMessage("密码不能为空"),
  body("user.email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .bail()
    .isEmail()
    .withMessage("邮箱格式不正确")
    .bail() // 前面的验证不通过不会往下执行
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("邮箱已经存在！");
      }
    })
]);

//* 登录
exports.login = [
  validate([body("user.email").notEmpty().withMessage("邮箱不能为空").bail().isEmail().withMessage("邮箱格式错误"), body("user.password").notEmpty().withMessage("密码不能为空")]),
  validate([
    body("user.email").custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select(["email", "username", "bio", "image", "password"]);
      //   const user = await User.findOne(
      //     { email },
      //     {
      //       password: 1
      //     }
      //   );

      if (!user) {
        return Promise.reject("用户不存在！");
      }
      // 将数据挂载到请求对象中，供后续的中间件使用
      req.user = user;
    })
  ]),
  validate([
    body("user.password").custom((password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject("密码错误");
      }
      return Promise.resolve();
    })
  ])
];
