const url = require("url");
const methods = require("methods");
const Layer = require("./layer");
const Route = require("./route");
function Router() {
  this.stack = [];
}

methods.forEach((method) => {
  Router.prototype[method] = function (path, handlers) {
    const route = new Route();
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    route[method](path, handlers);
    // const layer = new Layer(path, handler);
    // layer.method = method;
    // this.stack.push(layer);
  };
});

Router.prototype.use = function (path, handlers) {
  if (typeof path === 'function') {
    handlers.unshift(path) // 处理函数
    path = '/' // 任何路径都以它开头的
  }
  handlers.forEach(handler => {
    const layer = new Layer(path, handler)
    layer.isUseMiddleware = true
    this.stack.push(layer)
  })
}


Router.prototype.handler = function (req, res) {
  const { pathname } = url.parse(req.url);
  const method = req.method.toLowerCase();

  let index = 0;
  const next = () => {
    if (index >= this.stack.length) {
      return res.end(`Can not get ${pathname}`);
    }
    const layer = this.stack[index++];
    const match = layer.match(pathname);
    if (match) {
      req.params = req.params || {};
      Object.assign(req.params, layer.params);
    }
    // 顶层只判定请求路径，内层判定请求方法.目的是为了支持以下写法：
    // app.route('/foo)
    //   .get((req,res) => {})
    //   .post((req.res) => {})
    //   .delete((req.res) => {})
    if (match) {
      // 顶层这里调用的 handler 其实就是 dispatch 函数
      return layer.handler(req, res, next);
    }
    next();
  };

  next();
};

module.exports = Router;
