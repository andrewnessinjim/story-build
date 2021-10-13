const Phrase = require("../dtos/Phrase");
const Room = require("../dtos/Room");
const roomService = require("../business/roomService");


async function openRoom(_, args) {
    return await roomService.openRoom(args.phrases);
}

async function playSentence(_, args) {
    const {sentence, roomId, phrase} = args;
    return await roomService.playSentence(roomId, phrase, sentence);
}

module.exports = {
    openRoom,
    playSentence
}