const express = require("./express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.end("Hello World!");
});

app.get("/zx", (req, res) => {
  res.end("zx2!");
});

app.post("/zx", (req, res) => {
  res.end("post zx!");
});

app.patch("/zx", (req, res) => {
  res.end("patch zx!");
});

app.delete("/zx", (req, res) => {
  res.end("delete zx!");
});

app.listen(port, () => {
  console.log("GodX------>log服务端应用已经启动在 3000 端口");
});
