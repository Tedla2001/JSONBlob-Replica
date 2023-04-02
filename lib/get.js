const fs = require("fs");
const url = require("url");
const timestamp = require('../utility/timestamp');

function GET(req, res) {
	//Obtain request method
	console.log(req.method);

	//Parse the components of the URL
	let url_components = url.parse(req.url, true);
	console.log(url_components);
	console.log(url_components.pathname.split("/"));

  url_path_array = url_components.pathname.split("/")
  id = url_path_array[2]
  
  let api_response_filepath = `./data/${id}.json`
  
  if (url_components.pathname.startsWith('/api/')) {
    if (fs.existsSync(api_response_filepath)) {
      //Write something in the header of the response
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Current-timestamp": timestamp()
      });
      // Read data from a file
      const response_from_data = fs.readFileSync(api_response_filepath,'utf8');
      // console.log(response_from_data);
      const parsedContents = JSON.parse(response_from_data)
      const formattedContents = JSON.stringify(parsedContents, null, 2);
      res.write(formattedContents);

      //Process the body of the request
      var body=[];
      req.on('data',(chunk)=>{
        body.push(chunk);
      }).on('end',()=>{
        body=Buffer.concat(body).toString();
        res.end(body);
      });
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html",
        "Current-timestamp": timestamp()
      });
      res.end('File Not Found');
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "Current-timestamp": timestamp()
    });
    res.end('Endpoint not found');
  }
}

module.exports = GET;
