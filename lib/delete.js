const fs=require('fs');
const url=require('url');

function DELETE(req, res){

	console.log("request:" + req.url)

	let url_string=url.parse(req.url,true);

	let filename = `./data/${url_string.path}.json`

	if (fs.existsSync(filename)) {
		fs.unlink(filename, (err) => {
			if (err) throw err;
			console.log(`File ${filename} deleted`);
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(`File '${filename}' deleted`);
		});
	} else {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end(`File '${filename}' not found`);
	}
}
module.exports=DELETE