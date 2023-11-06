//? 第三方中间件
const express = require("express");
const app = express();

const morgan = require("morgan");

app.use(morgan("tiny"));

app.get("/thrid", (req, res) => {
  res.send("ok");
});

app.listen(3000, () => {
  console.log("GodX------>logserver is listen on 3000");
});
