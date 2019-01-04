class Player {
    constructor(name, position) {
        this.store = 15;
        this.order = -1;
        this.userName = name;
        this.position = position;
        this.storeArr = [];
        this.orderArr = [];
        this.costArr = [];
    }
}

module.exports = { Player };
