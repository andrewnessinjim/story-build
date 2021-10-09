const memory = require("./memory");

function health() {
    return "OK";
}

function joinRoom(_, args) {
    return memory.rooms.get(args.roomId)
}

module.exports = {
    health,
    joinRoom
}