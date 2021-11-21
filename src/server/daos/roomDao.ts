import * as db from "./db";
import { ObjectId } from "mongodb";

async function createRoom(room) {
    await db.get().collection("rooms").insertOne(room);
};

async function isPhrasePlayed(roomId, phrase) {
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

async function playSentence(roomId, playedPhrase:string, playedSentence:string) {
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

async function findRoom(roomId)  {
    return await db.get().collection("rooms").findOne({_id: new ObjectId(roomId)});
}

async function completeStory(roomId)  {
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

async function isStoryComplete(roomId)  {
    const roomDoc = await db.get().collection("rooms").findOne({
        _id: new ObjectId(roomId)
    }, {
        projection: {
            isStoryComplete: 1
    }});
    return roomDoc.isStoryComplete;
}

export default {
    createRoom,
    isPhrasePlayed,
    playSentence,
    findRoom,
    completeStory,
    isStoryComplete
}