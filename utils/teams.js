// const { Team } = require("./team");

class Teams {
    constructor() {
        this.allTeams = [];
    }
    addTeam(team) {
        this.allTeams.push(team);
    }
    findTeam(name) {
        var team = this.allTeams.filter(team => {
            // console.log(team.teamName);
            return team.teamName === name;
        })[0];
        return team;
    }
    status() {
        var ret = true;
        this.allTeams.forEach(team => {
            team.users.forEach(user => {
                if (user.order === -1) {
                    ret = false;
                }
            });
        });
        return ret;
    }
    reset(turn, cust) {
        this.allTeams.forEach(team => {
            team.reset(turn, cust);
        });
    }
    getRank() {
        var lst = [{ "teamName": "java", "sumCost": 100 }, { "teamName": "python", "sumCost": 300 }, { "teamName": "nodejs", "sumCost": 200 }];
        for (var i in this.allTeams) {
            lst.push({ "teamName": this.allTeams[i].teamName, "sumCost": this.allTeams[i].getCost() });
        }
        return lst.sort(this.compare);
    }

    compare(a, b) {
        if (a.sumCost < b.sumCost)
            return -1;
        if (a.sumCost > b.sumCost)
            return 1;
        return 0;
    }
}

module.exports = { Teams };
