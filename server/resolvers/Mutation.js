const memory = require("./memory");
const Phrase = require("../dtos/Phrase");
const Room = require("../dtos/Room");

let roomId = 1;
let phraseId = 1;

function openRoom(_, args) {
    const phrases = args.phrases.map(phraseString => new Phrase(phraseId++, phraseString, false, null, null));
    const room = new Room(roomId, false, phrases);
    memory.rooms.set(roomId, room);

    roomId++;
    return room;
}

function playSentence(_, args) {
    console.log("Playing sentence...");
    const {sentence} = args;

    const roomId = Number(args.roomId);
    const phraseId = Number(args.phraseId);

    let playedRoom;
    for (const room of memory.rooms.values()) {
        if(roomId === room.id) {
            playedRoom =room;
            break;
        }
    }
    
    const playedPhrase = playedRoom.phrases.find(phrase => phrase.id === phraseId);
    
    const currMaxOrder = playedRoom.phrases.
                            map(phrase => phrase.playedOrder).
                            reduce((prev, curr) => Math.max(prev, curr), 0);
    

    playedPhrase.isPlayed = true;
    playedPhrase.playedOrder = currMaxOrder + 1;
    playedPhrase.playedSentence = sentence;

    return playedRoom;
}

module.exports = {
    openRoom,
    playSentence
}