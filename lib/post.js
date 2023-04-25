const url=require('url');
const client = require('./setupDB').client


function POST(req, res) {
	//Obtain request method
	console.log(req.method);

    let url_components=url.parse(req.url,true);

    if (url_components.pathname.startsWith('/api')) {

        var body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            try {
                console.log(body);
                json_body = JSON.parse(body);
                client.connect();
                client.db("blobreplica").collection("data").insertOne({body},function(err,result){
                    if (err) throw err
                    console.log(result)
            
                    database.collection('data').find({}).toArray(function(err, result){
                        if (err) throw err
                        console.log(result)
                        db.close()
                    })
                })     
            } catch (e) {
                console.log('Invalid JSON format' + e);
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
            finally {
                // Ensures that the client will close when you finish/error
                client.close();
              }
        });
    }else{
        res.writeHead(404, {
            "Content-Type": "text/html",
            "Current-timestamp": timestamp()
            });
            res.end('Endpoint not found');
        }
}
module.exports=POST
