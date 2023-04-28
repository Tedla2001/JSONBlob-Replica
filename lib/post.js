const url = require("url");
const mongodb = require("./setupDB");
const client = mongodb.client;

function POST(req, res) {
  //Obtain request method
  console.log(req.method);

  let url_components = url.parse(req.url, true);

  if (url_components.pathname.startsWith("/api")) {
    var body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", async () => {
        body = Buffer.concat(body).toString();
        try {
          //console.log(body);
          json_body = JSON.parse(body);
          await client.connect();
          const database = client.db("blobreplica");
          const collection = database.collection("data");
          let result = await collection.insertOne(json_body);
          console.log("Insert success: " + result.insertedId);
          // result=await collection.findOne({String:'Tedla Tafari'});
          // console.log("Find: "+result)
        } catch (e) {
          console.log("Invalid JSON format" + e);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON format" }));
        } finally {
          // Ensures that the client will close when you finish/error
          client.close();
        }
      });
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "Current-timestamp": timestamp(),
    });
    res.end("Endpoint not found");
  }
}
module.exports = POST;
