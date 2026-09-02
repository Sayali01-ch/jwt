const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://JWT-auth:auth10@cluster0.tadn8ix.mongodb.net/jwt-auth-db?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect().then(() => console.log("Connected!")).catch(err => console.error(err));