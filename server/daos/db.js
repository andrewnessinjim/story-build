const MongoClient = require("mongodb").MongoClient;

let mongoClient = null;

module.exports.connect = async() => {
    try {
    mongoClient = await MongoClient.connect(
        process.env.DB_URI,
        { useNewUrlParser: true },
    );
    } catch(e) {
        console.error(e);
        console.error("Unable to connect to DB, exiting application!");
        process.exit(1);
    }
    console.log("Connected to MongoDB successfully");
}

module.exports.get = () => {
    if(!mongoClient) {
        throw new Error("Call connect first");
    }
    return mongoClient.db(process.env.DB_NAMESPACE);
}