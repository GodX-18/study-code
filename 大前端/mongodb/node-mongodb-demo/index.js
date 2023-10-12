const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("zx");
    const testDb = database.collection("test");
    //todo 插入文档
    // const addData = {
    //   age: 18,
    //   name: "zx"
    // };
    // const ret = await testDb.insertOne(addData);
    // console.log("GodX------>log", ret);

    //todo 查询文档
    const query = { name: "zx" };
     //* 查询所有，返回值为 promise 对象
    const data = await testDb.find(query);
    console.log(await data.toArray());
    //* 查询单个（只返回查到的第一个值）
    const data2 = await testDb.findOne(query);
    console.log(data2);

    //todo 删除
    // await testDb.deleteOne({
    //   _id: new ObjectId("65250a8601d6abec3f5b1b85")
    // });

    //todo 更新文档
    const ret = await testDb.updateOne(
      {
        _id: new ObjectId("65250a7d683bd2dcad1e92fa")
      },
      {
        $set: {
          age: 20
        }
      }
    );
    console.log("GodX------>log", ret);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
