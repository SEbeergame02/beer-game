class Player {
    constructor(name, position) {
        this.store = 15;
        this.order = -1;
        this.userName = name;
        this.position = position;
        this.debt = 0;
        this.storeArr = [];
        this.orderArr = [];
        this.debtArr = [];
        this.costArr = [];
    }
}

module.exports = { Player };
