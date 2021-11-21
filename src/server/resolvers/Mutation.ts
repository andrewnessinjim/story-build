import roomService from "../business/roomService";

async function createRoom(_, args) {
    return await roomService.createRoom(args.phrases);
}

async function playSentence(_, args) {
    const {sentence, roomId, phrase} = args;
    return await roomService.playSentence(roomId, phrase, sentence);
}

export default {
    createRoom,
    playSentence
}