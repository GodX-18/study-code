const express = require("express");
const app = express();

// 配置解析表单请求体: application/json
app.use(express.json());
// 配置解析表单请求体: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const { getData, saveData } = require("./db");

//todo 查询
app.get("/todos", async (req, res) => {
  try {
    const data = await getData();
    res.status(200).json({
      code: 200,
      list: data.todos
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//todo 根据 ID 查询单个任务
app.get("/todos/:id", async (req, res) => {
  try {
    const data = await getData();
    const result = data.todos.find((item) => item.id === Number.parseInt(req.params.id)) || [];
    res.status(200).json({
      code: 200,
      data: result
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//todo 添加任务
app.post("/todos", async (req, res) => {
  try {
    // 1. 获取客户端请求体参数
    const todo = req.body;
    // 2. 数据验证
    if (!todo.title) {
      return res.status(422).json({
        error: "The field title is required."
      });
    }
    // 3. 数据验证通过，把数据存储到 db 中
    const data = await getData();
    const lastTodo = data.todos[data.todos.length - 1];
    todo.id = lastTodo ? lastTodo.id + 1 : 1;
    data.todos.push(todo);
    await saveData(data);
    res.status(200).json({
      code: 200,
      data: todo,
      message: "保存成功！"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//todo 修改任务
app.patch("/todos/:id", (req, res) => {
  res.send("修改任务");
});

//todo 删除任务
app.delete("/todos/:id", (req, res) => {
  res.send("删除任务");
});

app.listen(port, () => {
  console.log("GodX------>log服务已经启动。。。");
});
