# 利用 express 框架开发接口服务示例项目

## 主要功能
* 注册、登录、获取用户信息接口案例（md5加密、jwt鉴权）
* 文章的增删改查实例

## 目录结构

- config # 配置文件
- controller # 用于解析用户的输入，处理后返回相应的结果
- model # 数据持久层
- middleware # 用于编写中间件
- router # 用于配置 URL 路由
- util ＃ 工具模块
- app.js # 用于自定义启动时的

## 配置常用的中间件

* 解析请求体
  * express.json
  * express.urlencoded
* 日志输出
  * morgan
* 为客户端提供跨域资源请求
  * cors

