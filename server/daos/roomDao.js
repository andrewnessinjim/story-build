const db = require("./db");
const ObjectId = require("mongodb").ObjectId;

module.exports.openRoom = async(room) => {
    const dbResponse = await db.get().collection("rooms").insertOne(room);
    room.id = dbResponse.insertedId.toString();
};

module.exports.playSentence = async (roomId, playedPhrase, playedSentence) => {
    const doc = await db.get().collection("rooms").findOneAndUpdate(
        {_id: new ObjectId(roomId), "phrases.value": playedPhrase},
        {   $set: 
                {"phrases.$.isPlayed": true},
            $push:
                {story: {playedPhrase, playedSentence}}
        },
        {
            returnDocument: "after"
        }
    );

    return doc.value;
};

module.exports.findRoom = async (roomId) => {
    return await db.get().collection("rooms").findOne({_id: new ObjectId(roomId)});
}