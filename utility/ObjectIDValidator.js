const mongodb = require("../lib/setupDB");

function validateObjectId(objectId) {
  try {
    const query = { _id: new mongodb.ObjectId(objectId) };
    return query;
  } catch (err) {
    throw new Error(`Invalid object ID: ${objectId}`);
  }
}

module.exports = validateObjectId;