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
    reset(turn) {
        this.allTeams.forEach(team => {
            team.reset(turn);
        });
    }
}

module.exports = { Teams };
