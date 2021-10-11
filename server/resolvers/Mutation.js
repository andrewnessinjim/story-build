const memory = require("./memory");
const Phrase = require("../dtos/Phrase");
const Room = require("../dtos/Room");

let roomId = 1;

function openRoom(_, args) {
    const phrases = args.phrases.map(phraseString => new Phrase(phraseString, false));
    const room = new Room(roomId, false, phrases);
    memory.rooms.set(roomId, room);

    roomId++;
    return room;
}

function playSentence(_, args) {
    const {sentence} = args;

    const roomId = Number(args.roomId);
    const phraseArg = args.phrase;

    let playedRoom;
    for (const room of memory.rooms.values()) {
        if(roomId === room.id) {
            playedRoom =room;
            break;
        }
    }
    
    const playedPhrase = playedRoom.phrases.find(phrase => phrase.value === phraseArg);
    
    playedRoom.story.push({
        playedPhrase: phraseArg,
        playedSentence: sentence
    });

    playedPhrase.isPlayed = true;
    
    return playedRoom;
}

module.exports = {
    openRoom,
    playSentence
}