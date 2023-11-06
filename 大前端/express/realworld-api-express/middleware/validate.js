const { validationResult, buildCheckFunction } = require("express-validator");
const { isValidObjectId } = require("mongoose");

exports = module.exports = (validations) => {
  return async (req, res, next) => {
    // 顺序处理，如果前一个验证链失败，则停止运行验证链
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }
    // 统一处理，返回所有的校验结果
    // await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};

exports.isValidObjectId = (location, fields) => {
  return buildCheckFunction(location)(fields).custom(async (val) => {
    if (!isValidObjectId(val)) {
      return Promise.reject("ID 不是一个有效的 ObjectID");
    }
  });
};
