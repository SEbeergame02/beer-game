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
            costArr[costAr.length] = costArr[costAr.length - 1] + store;
        }
        return costArr;
    }

    reset(turn, cust) {
        var lst = [];
        this.users.forEach(user => {
            if (user.position === "Retailer") {
                user.storeArr.push(user.store);
                user.orderArr.push(cust);
                user.costArr = this.calCost(user.costArr.slice(), user.store);
                user.store = user.store - cust;

            } else if (user.position === "Wholesaler") {
                user.storeArr.push(user.store);
                user.orderArr.push(this.findPos("Retailer").order);
                user.costArr = this.calCost(user.costArr.slice(), user.store);
                user.store = user.store - this.findPos("Retailer").order;

            } else if (user.position === "Distributor") {
                user.storeArr.push(user.store);
                user.orderArr.push(this.findPos("Wholesaler").order);
                user.costArr = this.calCost(user.costArr.slice(), user.store);
                user.store = user.store - this.findPos("Wholesaler").order;

            } else if (user.position === "Factory") {
                user.storeArr.push(user.store);
                user.orderArr.push(this.findPos("Factory").order);
                user.costArr = this.calCost(user.costArr.slice(), user.store);
                user.store = user.store - this.findPos("Distributor").order;
            }
            console.log(this.round);
            lst.push({ pos: user.position, ord: user.order });
            user.order = -1;
        });
        this.round.push(lst);
        if (turn > 2) {
            this.arrive();
        }
        // console.log(this.round);
        // console.log(JSON.stringify(this.users));
    }
    arrive() {
        var items = this.round[0];
        this.round.shift();
        console.log(items);
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
