<<<<<<< HEAD
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://odyssey:WNAKUDGUnsISyog9@odysseycluster.inmpysx.mongodb.net/?retryWrites=true&w=majority";
=======
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const uri = "Connection String";
>>>>>>> main
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
module.exports = { MongoClient, ObjectId,ServerApiVersion, uri, client };
