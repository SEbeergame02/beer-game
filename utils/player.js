class Player {
    constructor(name, position) {
        this.store = 15;
        this.order = -1;
        this.userName = name;
        this.position = position;
        this.debt = 0;
        this.storeArr = [15];
        this.orderArr = [0];
        this.debtArr = [0];
        this.costArr = [15];
    }
}

module.exports = { Player };
