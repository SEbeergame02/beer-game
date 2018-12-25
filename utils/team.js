// this.retailer;
// this.wholesaler;
// this.largeMarket;
// this.factory;
// userName:"bryan", teamName: "hello", position: "retailer"
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
    reset(turn) {
        var lst = [];
        this.users.forEach(user => {
            if (user.position === "retailer") {
                user.store = user.store - 10;
            } else if (user.position === "wholesaler") {
                user.store = user.store - this.findPos("retailer").order;
            } else if (user.position === "largeMarket") {
                user.store = user.store - this.findPos("wholesaler").order;
            } else if (user.position === "factory") {
                user.store = user.store - this.findPos("largeMarket").order;
            }
            lst.push({ pos: user.position, ord: user.order });
            user.order = -1;
            if (turn > 1) {
                this.arrive(turn);
            }
        });
        this.round.push(lst);
        // console.log(this.round);
        // console.log(JSON.stringify(this.users));
    }
    findPos(pos) {
        var ret;
        this.users.forEach(user => {
            console.log(user.position);
            if (user.position === pos) {
                ret = user;
            }
        });
        return ret;
    }
    arrive(turn) {
        if (turn > 2) {
            var items = this.round.shift();
            items.forEach(item => {
                this.users.forEach(user => {
                    if (user.position === item.pos) {
                        user.store = user.store + item.ord;
                    }
                });
            });
        }
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
