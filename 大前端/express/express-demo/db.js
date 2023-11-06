const { readFile, writeFile } = require("node:fs/promises");
const { resolve } = require("node:path");

const filePath = resolve("./db.json");
exports.getData = async () => {
  const data = await readFile(filePath, { encoding: "utf8" });
  return JSON.parse(data);
};

exports.saveData = async (item) => {
  await writeFile(filePath, JSON.stringify(item, null, "  "));
};
