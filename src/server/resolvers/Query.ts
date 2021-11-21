import roomService from "../business/roomService";

function health() {
    return "OK";
}

async function joinRoom(_, args) {
    return await roomService.findRoom(args.roomId);
}

async function allRooms() {
    return await roomService.findAllRooms();
}

export default {
    health,
    joinRoom,
    allRooms
}