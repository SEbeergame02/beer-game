// this.Retailer;
// this.Wholesaler;
// this.Distributor;
// this.Factory;
// userName:"bryan", teamName: "hello", position: "Retailer"
const { Player } = require("./player");

class Team {
    constructor(obj) {
        this.users = [];
        this.users.push(new Player(obj.userName, obj.position));
        this.teamName = obj.teamName;
        this.round = [];
    }

    addUser(obj) {
        this.users.push(new Player(obj.userName, obj.position));
    }

    findUser(name) {
        var user = this.users.filter(user => {
            return user.userName === name;
        })[0];
        return user;
    }

    calCost(costArr, store) {
        if (store < 0) {
            store = Math.abs(store) * 2;
        }
        if (costArr.length === 0) {
            costArr[0] = store;
        }
        else {
            costArr[costArr.length] = costArr[costArr.length - 1] + store;
        }
        return costArr;
    }

    calArr(user) {
        user.storeArr[user.storeArr.length] = user.store;
        user.orderArr[user.orderArr.length] = user.order;
        user.debtArr[user.debtArr.length] = user.debt;
        var c = user.store;
        if (user.debt > 0) {
            c = user.debt * 2;
        }
        // console.log(user.costArr, user.costArr.length);
        if (user.costArr.length === 0) {
            user.costArr[0] = c;
        }
        else {
            user.costArr[user.costArr.length] = user.costArr[user.costArr.length - 1] + c;
        }
    }

    reset(turn, cust) {
        if (turn > 1) {
            this.arrive();
        }
        var lst = [];
        this.users.forEach(user => {
            if (user.position === "Retailer") {
                let newStore = user.store - cust - user.debt;
                if (newStore < 0) {
                    user.debt = Math.abs(newStore);
                    user.store = 0;
                }
                else {
                    user.store = newStore;
                }
                this.calArr(user);
            }

            else if (user.position === "Wholesaler") {
                let newStore = user.store - this.findPos("Retailer").order - user.debt;
                if (newStore < 0) {
                    user.debt = Math.abs(newStore);
                    lst.push({ pos: "Retailer", ord: user.store });
                    user.store = 0;
                }
                else {
                    user.store = newStore;
                    lst.push({ pos: "Retailer", ord: this.findPos("Retailer").order });
                }
                this.calArr(user);
            }

            else if (user.position === "Distributor") {
                let newStore = user.store - this.findPos("Wholesaler").order - user.debt;
                if (newStore < 0) {
                    user.debt = Math.abs(newStore);
                    lst.push({ pos: "Wholesaler", ord: user.store });
                    user.store = 0;
                }
                else {
                    user.store = newStore;
                    lst.push({ pos: "Wholesaler", ord: this.findPos("Wholesaler").order });
                }
                this.calArr(user);
            }

            else if (user.position === "Factory") {
                let newStore = user.store - this.findPos("Distributor").order - user.debt;
                if (newStore < 0) {
                    user.debt = Math.abs(newStore);
                    lst.push({ pos: "Distributor", ord: user.store });
                    user.store = 0;
                }
                else {
                    user.store = newStore;
                    lst.push({ pos: "Distributor", ord: this.findPos("Distributor").order });
                }
                lst.push({ pos: "Factory", ord: user.order });
                this.calArr(user);
            }
            user.order = -1;
        });

        this.round.push(lst);
        console.log(this.round);
    }
    arrive() {
        var items = this.round[0];
        this.round.shift();
        // console.log(items);
        items.forEach(item => {
            this.users.forEach(user => {
                if (user.position === item.pos) {
                    user.store = user.store + item.ord;
                }
            });
        });
    }
    findPos(pos) {
        var ret;
        this.users.forEach(user => {
            // console.log(user.position);
            if (user.position === pos) {
                ret = user;
            }
        });
        return ret;
    }
    getCost() {
        var sumCost;
        for (i in this.users) {
            sumCost += this.users[i].costArr[this.users.length - 1];
        }
        return sumCost;
    }
    // removeUser(id) {
    //     var user = this.getUser(id);
    //     if (user) {
    //         this.team = this.team.filter(user => {
    //             return user.id !== id;
    //         });
    //     }
    //     return user;
    // }
    // getUser(id) {
    //     return this.team.filter(user => {
    //         return user.id === id;
    //     })[0];
    // }
    // getUserList(room) {
    //     var team = this.team.filter(user => {
    //         return user.room === room;
    //     });
    //     var namesArray = team.map(user => {
    //         return user.name;
    //     });
    //     return namesArray;
    // }
}

module.exports = { Team };
