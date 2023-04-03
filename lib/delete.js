const fs=require('fs');
const url=require('url');
const timestamp = require('../utility/timestamp');

function DELETE(req, res){
	//Obtain request method
	console.log(req.method);

	console.log("request:" + req.url)

	let url_components=url.parse(req.url,true);
	url_path_array = url_components.pathname.split("/")
	id = url_path_array[2]
	let filename = `./data/${id}.json`

	if (url_components.pathname.startsWith('/api/')) {
		if (fs.existsSync(filename)) {
			fs.unlink(filename, (err) => {
				if (err) throw err;
				console.log(`File ${filename} deleted`);
				res.writeHead(200, {
					"Content-Type": "text/plain",
					"Current-timestamp": timestamp()
					});
				res.end(`File '${filename}' deleted`);
			});
		} else {
			res.writeHead(404, {
				"Content-Type": "text/plain",
				"Current-timestamp": timestamp()
				});
			res.end(`File '${filename}' not found`);
		}
	}else {
	res.writeHead(404, {
	"Content-Type": "text/html",
	"Current-timestamp": timestamp()
	});
	res.end('Endpoint not found');
	}
	
	
	
}
module.exports=DELETE