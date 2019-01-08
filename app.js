const http = require("http");
const { Teams } = require("./utils/teams");
const { Team } = require("./utils/team");
const socketIO = require("socket.io");
const app = require("./server");
const { setScore, getScore } = require("./utils/middleWare");

var server = http.createServer(app);
var io = socketIO(server);
var allTeams = new Teams();
var orderArr; //customer order array define by admin
var turn = 0;

io.on("connection", socket => {
    console.log("new user connect", socket.id);

    socket.emit("findRole", { allTeams, turn });

    socket.emit("updateTeams", allTeams);

    socket.on("createTeam", (obj, callback) => {
        allTeams.addTeam(new Team(obj));
        io.emit("updateTeams", allTeams);
        callback();
    });

    socket.on("joinTeam", (obj, callback) => {
        var resTeam = allTeams.findTeam(obj.teamName);
        resTeam.addUser(obj);
        io.emit("updateTeams", allTeams);
        callback();
    });

    socket.on("sendOrder", obj => {
        var resTeam = allTeams.findTeam(obj.teamName);
        var resUser = resTeam.findUser(obj.userName);
        resUser.order = parseInt(obj.order);
        // console.log(JSON.stringify(allTeams, undefined, 2));
        if (allTeams.status()) {
            allTeams.reset(turn, parseInt(orderArr[turn - 1]));
            turn = turn + 1;
            if (turn == 6) {
                var rankArr = allTeams.getRank();
                var score = rankArr.length - rankArr.findIndex(e => e.teamName == resTeam) + 1;
                setScore(resUser, getScore(resUser) + score);
                io.emit("end");
            } else {
                io.emit("continue", { allTeams, turn });
            }
        }
    });

    socket.emit("putRank", { rankArr: allTeams.getRank() });

    socket.on("start", obj => {
        orderArr = obj.order;
        turn = turn + 1;
        io.emit("continue", { allTeams, turn });
    });

    socket.on("disconnect", () => {
        console.log("user disconnect", socket.id);
    });
});

server.listen(3000, () => {
    console.log("listen 3000 port");
});
