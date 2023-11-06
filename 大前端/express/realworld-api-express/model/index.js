const connectMongo = require("../util/connect-mongo");
const { dbUri } = require("../config/config.default");
connectMongo(dbUri);

module.exports = {
  User: require("./user"),
  Article: require("./article")
};
