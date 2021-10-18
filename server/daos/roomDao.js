const db = require("./db");
const ObjectId = require("mongodb").ObjectId;

module.exports.createRoom = async(room) => {
    await db.get().collection("rooms").insertOne(room);
};

module.exports.isPhrasePlayed = async (roomId, phrase) => {
    const doc = await db.get().collection("rooms").findOne({
        _id: new ObjectId(roomId)
    }, {
        projection: {
            phrases: {
                $elemMatch: {
                    value: phrase
                }
            }
    }});

    return doc.phrases[0].isPlayed;
}

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

module.exports.completeStory = async (roomId) => {
    const updatedRoom = await db.get().collection("rooms").findOneAndUpdate(
        {_id: new ObjectId(roomId)},
        {
            $set: {
                isStoryComplete: true,
                phrases: []
            }
        },
        {
            returnDocument: "after"
        }
    );
    return updatedRoom.value;
}