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
    const isPhrasePlayed = await roomDao.isPhrasePlayed(roomId, playedPhrase);
    if(isPhrasePlayed) {
        throw new Error(`Phrase ${playedPhrase} is already played. Cannot play again`)
    }
    return await roomDao.playSentence(roomId, playedPhrase, playedSentence);
};

module.exports.findRoom = async (roomId) => {
    return await roomDao.findRoom(roomId);
}