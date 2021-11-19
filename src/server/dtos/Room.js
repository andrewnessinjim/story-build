module.exports = class Room {
    constructor(phrases) {
        this.isStoryComplete = false;
        this.phrases = phrases;
        this.story = [];
    }
}