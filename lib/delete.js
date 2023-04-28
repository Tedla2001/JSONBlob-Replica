const url = require("url");
const timestamp = require("../utility/timestamp");
const validateObjectId = require("../utility/ObjectIDValidator");
const client = require("./setupDB").client;

async function DELETE(req, res) {
	//Obtain request method
	console.log(req.method);

	console.log("request:" + req.url);

	let url_components = url.parse(req.url, true);
	url_path_array = url_components.pathname.split("/");
	let object_id = url_path_array[2];
	console.log("id:" + object_id);

	if (url_components.pathname.startsWith("/api/")) {
		try {
			await client.connect();
			const database = client.db("blobreplica");
			const collection = database.collection("data");
			// Query for a movie that has title "Annie Hall"
			const query = validateObjectId(object_id);
			const result = await collection.deleteOne(query);
			if (result.deletedCount === 1) {
				console.log("Successfully deleted one document.");
				res.writeHead(200, {
					"Content-Type": "text/plain",
					"Current-timestamp": timestamp(),
				});
				res.end("Successfully deleted one document.");
			} else {
				console.log("No documents matched the query. Deleted 0 documents.");
				res.writeHead(404, {
					"Content-Type": "text/plain",
					"Current-timestamp": timestamp(),
				});
				res.end("No documents matched the query. Deleted 0 documents.");
			}
		} catch (err) {
			res.writeHead(404, {
				"Content-Type": "application/json",
				"Current-timestamp": timestamp(),
			});
			res.end(
				JSON.stringify({
					error: `${err}`,
				})
			);
		} finally {
			await client.close();
		}
	} else {
		res.writeHead(404, {
			"Content-Type": "text/html",
			"Current-timestamp": timestamp(),
		});
		res.end("Endpoint not found");
	}
}
module.exports = DELETE;
