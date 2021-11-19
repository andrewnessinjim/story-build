const roomService = require("../business/roomService");

function health() {
    return "OK";
}

async function joinRoom(_, args) {
    return await roomService.findRoom(args.roomId);
}

module.exports = {
    health,
    joinRoom
}