import roomService from "../business/roomService";

function health() {
    return "OK";
}

async function joinRoom(_, args) {
    return await roomService.findRoom(args.roomId);
}

export default {
    health,
    joinRoom
}