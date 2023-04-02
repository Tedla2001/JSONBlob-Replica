const http=require('http');
const server=http.createServer().listen(8080);
// const process=require('./lib/process.js');
const POST=require('./lib/post.js');
const DELETE=require('./lib/delete.js');
const DELETE=require('./lib/put.js');


server.on('request',async(req,res)=>{
	switch(req.method){
		case "GET":
			GET(req,res);
			break;
		case "POST":
			POST(req,res);
			break;
		case "PUT":
			PUT(req,res);
			break;
		case "DELETE":
			DELETE(req,res);
			break;
	}
});