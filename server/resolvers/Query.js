const db = require("../daos/db");
const ObjectId = require("mongodb").ObjectId;

function health() {
    return "OK";
}

async function joinRoom(_, args) {
    return await db.get().collection("rooms").findOne({_id: new ObjectId(args.roomId)});
}

module.exports = {
    health,
    joinRoom
}