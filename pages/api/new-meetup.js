// api/new-meetup
// using this url only for POST request

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://tomass:amarbamba12@cluster0.xmfwbnk.mongodb.net/meetups?retryWrites=true&w=majority" // meetups - name of database
    );

    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Added successfully" });
  }
}

export default handler;
