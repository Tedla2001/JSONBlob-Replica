const fs = require("fs");
const url = require("url");
const timestamp = require('../utility/timestamp');

function PUT(req, res) {
	//Obtain request method
	console.log(req.method);

	//Parse the components of the URL
	let url_components = url.parse(req.url, true);
    url_path_array = url_components.pathname.split("/")
    id = url_path_array[2]
  
    let filename = `./data/${id}.json`
  
  if (url_components.pathname.startsWith('/api/')) {
    if (fs.existsSync(filename)) {
        var body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            try {
                json_body = JSON.parse(bod);
                console.log(json_body);
                fs.writeFileSync(`${filename}`, JSON.stringify(json_body));
                res.writeHead(200, 
                    {'Content-Type': 'application/json',
                     'Current-timestamp': timestamp()
                    });
                res.end(JSON.stringify({ message: `file ${filename} created`,
                body: json_body }));
                
            } catch (e) {
                console.log(e);
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html",
        "Current-timestamp": timestamp()
      });
      res.end('File Not Found: Cannot UPDATE non-exisitng file.');
      console.log('File Not Found: Cannot UPDATE non-exisitng file.');
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "Current-timestamp": timestamp()
    });
    res.end('Endpoint not found: Cannot UPDATE non-exisiting URL');
    console.log('Endpoint not found: Cannot UPDATE non-exisiting URL');
  }
}

module.exports = PUT;
