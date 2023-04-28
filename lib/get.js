const url = require("url");
const client = require('./setupDB').client
const timestamp = require('../utility/timestamp');

function GET(req, res) {
	//Obtain request method
	console.log(req.method);

	//Parse the components of the URL
	let url_components = url.parse(req.url, true);
	// console.log(url_components);
	// console.log(url_components.pathname.split("/"));

	if (url_components.pathname.startsWith('/api')) {
		//Process the body of the request
		var body=[];
		req.on('data',(chunk)=>{
			body.push(chunk);
		}).on('end',async ()=>{
			body=Buffer.concat(body).toString();
			// ∆
			try {
				// console.log(body);	
				await client.connect();

				console.log("TTETEs");

				const database = client.db('blobreplica');
				const collection = database.collection('data');
				result = await collection.find({}).toArray(function(err, result){
					if (err) throw err
					console.log(result);
				})
				console.log(result);

				// const formattedContents = JSON.stringify(result, null, 2);
      	// 	res.writeHead(200, {
				// 		"Content-Type": "application/json",
				// 		"Current-timestamp": timestamp()
				// 	});
				// 	res.end(formattedContents);
				console.log("Pinged your deployment. You successfully connected to MongoDB!");
				
			} catch(err) {
				console.log('Error: ' + err);
				res.writeHead(404, {
					"Content-Type": "application/json",
					"Current-timestamp": timestamp()
				});
				res.end(JSON.stringify({
					error: 'Endpoint not found'
				}));

			} finally {
				await client.close();
			}
		});
	}
}

module.exports = GET;

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("odyssey").command({ ping: 1 });

//     // const collection = client.db("odyssey").collection("users");
//     // console.log(collection);

// 		const database=db.db('odyssey')
	
		

// 		database.collection('users').find({}).toArray(function(err, result){
// 			if (err) throw err
// 			console.log(result)
// 			db.close()
// 		})

//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);