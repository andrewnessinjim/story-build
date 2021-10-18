const Phrase = require("../dtos/Phrase");
const Room = require("../dtos/Room");
const roomService = require("../business/roomService");


async function createRoom(_, args) {
    return await roomService.createRoom(args.phrases);
}

async function playSentence(_, args) {
    const {sentence, roomId, phrase} = args;
    return await roomService.playSentence(roomId, phrase, sentence);
}

module.exports = {
    createRoom,
    playSentence
}