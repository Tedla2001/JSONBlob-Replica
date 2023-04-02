const fs=require('fs');
const url=require('url');
const timestamp = require('../utility/timestamp');

function POST(req, res) {

    let url_components=url.parse(req.url,true);

    if (url_components.pathname.startsWith('/api')) {
        
        const filename = `${timestamp()}.json`;

        // Process the body of the request
        var body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            try {
                json_body = JSON.parse(body);
                console.log(json_body);
                fs.writeFileSync(`./data/${filename}`, JSON.stringify(json_body));
                res.writeHead(200, {'Content-Type': 'application/json', 'Current-timestamp': timestamp()});
                res.end(JSON.stringify({ message: `file ${filename} created`,
                body: json_body }));
                
            } catch (e) {
                console.log('Invalid JSON format');
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    }else {
        res.writeHead(404, {
        "Content-Type": "text/html",
        "Current-timestamp": timestamp()
        });
        res.end('Endpoint not found');
        }
}
module.exports=POST