import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://nazih2001:nazih2001@cluster1.h3hvpfv.mongodb.net/memories?retryWrites=true&w=majority"
    );
    const db = client.db();

    const memoriesCollection = db.collection("memories");

    const result = await memoriesCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Memory inserted!" });
  }
}

export default handler;
