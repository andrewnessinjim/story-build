module.exports = class Room {
    constructor(id, isStoryComplete, phrases) {
        this.id = id;
        this.isStoryComplete = isStoryComplete;
        this.phrases = phrases;
        this.story = "";
    }
}