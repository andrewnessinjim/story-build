const roomDao = require("../daos/roomDao");
const Phrase = require("../dtos/Phrase");
const Room = require("../dtos/Room");

module.exports.createRoom = async(phrasesArg) => {
    const phrases = phrasesArg.map(phraseString => new Phrase(phraseString, false));
    const room = new Room(phrases);
    await roomDao.createRoom(room);
    return room;
};

module.exports.playSentence = async (roomId, playedPhrase, playedSentence) => {
    const isStoryComplete = await roomDao.isStoryComplete(roomId);
    if(isStoryComplete) {
        throw new Error(`Story in room ${roomId} is already complete. Cannot play any phrase`);
    }
    const isPhrasePlayed = await roomDao.isPhrasePlayed(roomId, playedPhrase);
    if(isPhrasePlayed) {
        throw new Error(`Phrase ${playedPhrase} is already played. Cannot play again`)
    }
    const roomAfterPlayingSentence = await roomDao.playSentence(roomId, playedPhrase, playedSentence);

    if(roomAfterPlayingSentence.phrases.filter(phrase => !phrase.isPlayed).length === 0) {
        console.log("Story completed!")
        return await roomDao.completeStory(roomId);
    }

    return roomAfterPlayingSentence;
};

module.exports.findRoom = async (roomId) => {
    return await roomDao.findRoom(roomId);
}