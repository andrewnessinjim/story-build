module.exports = class Phrase {
    constructor(id, value, isPlayed, playedSentence, playedOrder){
        this.id = id;
        this.value = value;
        this.isPlayed = isPlayed;
        this.playedSentence = playedSentence;
        this.playedOrder = playedOrder;
    }
}