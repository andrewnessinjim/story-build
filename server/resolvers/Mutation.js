const Phrase = require("../dtos/Phrase");
const Room = require("../dtos/Room");
const roomDao = require("../daos/roomDao");


async function openRoom(_, args) {
    const phrases = args.phrases.map(phraseString => new Phrase(phraseString, false));
    const room = new Room(phrases);
    await roomDao.openRoom(room);
    return room;
}

async function playSentence(_, args) {
    const {sentence, roomId, phrase} = args;
    return await roomDao.playSentence(roomId, phrase, sentence);
}

module.exports = {
    openRoom,
    playSentence
}