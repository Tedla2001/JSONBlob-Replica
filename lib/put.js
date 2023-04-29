const { ObjectId } = require("mongodb");

const url = require("url");
const client = require("./setupDB").client;

async function PUT(req, res) {
  //Obtain request method
  console.log(`${req.method}`);

  //Parse the components of the URL
  let url_components = url.parse(req.url, true);
  let url_path_array = url_components.pathname.split("/");
  const id = url_path_array[2];

  if (url_components.pathname.startsWith("/api/")) {
    var body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", async () => {
        body = Buffer.concat(body).toString();
        try {
          json_body = JSON.parse(body);
          console.log(json_body);

          await client.connect();
          const database = client.db("blobreplica");
          const collection = database.collection("data");
          const result = await collection.replaceOne(
            { _id: new ObjectId(id) },
            { body: JSON.stringify(json_body, null, 2) }
          );
          if (result.matchedCount === 0) {
            res.writeHead(404, `No document found with ID ${id}`);
          } else {
            res.writeHead(200, `Document with ID ${id} successfully updated`);
            console.log(`${req.method}: Item has been updated successfully!`);
          }
        } catch (e) {
          console.log(e);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "DB error." }));
        } finally {
          await client.close();
        }
      });
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "Current-timestamp": timestamp(),
    });
    res.end("Endpoint not found: Cannot UPDATE non-exisiting URL");
    console.log("Endpoint not found: Cannot UPDATE non-exisiting URL");
  }
}

module.exports = PUT;
