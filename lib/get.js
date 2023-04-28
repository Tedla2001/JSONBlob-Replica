const url = require("url");
const client = require("./setupDB").client;
const timestamp = require("../utility/timestamp");
const validateObjectId = require("../utility/ObjectIDValidator");

async function GET(req, res) {
	//Obtain request method
	console.log(req.method);

	//Parse the components of the URL
	const url_components = url.parse(req.url, true);
	const url_path_array = url_components.pathname.split("/");
	const url_id = url_path_array[2];

	console.log(url_path_array);
	console.log("id:" + url_id);

	if (url_components.pathname.startsWith("/api/")) {
		// ∆
		try {
			// console.log(body);
			await client.connect();

			const database = client.db("blobreplica");
			const collection = database.collection("data");

			const query = validateObjectId(url_id);
			const result = await collection.find(query).toArray();
			console.log(`Result: ${result}`);

			if (result.length === 0) {
				// Object ID not found
				res.writeHead(404, {
					"Content-Type": "application/json",
					"Current-timestamp": timestamp(),
				});
				res.end(
					JSON.stringify({
						error: "Object ID not found",
					})
				);
			} else {
				// Object ID found, format response and send
				const formattedContents = JSON.stringify(
					result.map((item) => {
						item.body = JSON.parse(item.body);
						return item;
					}),
					null,
					2
				);
				res.writeHead(200, {
					"Content-Type": "application/json",
					"Current-timestamp": timestamp(),
				});
				res.end(formattedContents);
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
	}
}

module.exports = GET;
