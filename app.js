const http = require("http");
const { Teams } = require("./utils/teams");
const { Team } = require("./utils/team");
const socketIO = require("socket.io");
const app = require("./server");

var server = http.createServer(app);
var io = socketIO(server);
var allTeams = new Teams();
var orderArr;
var turn = 0;
allTeams.addTeam(new Team({ userName: "java", position: "Retailer", teamName: "javaTeam" }));
allTeams.addTeam(new Team({ userName: "python", position: "Factory", teamName: "pythonTeam" }));

io.on("connection", socket => {
    console.log("new user connect", socket.id);

    socket.emit("getImg", allTeams);

    socket.emit("updateTeams", allTeams);

    socket.on("createTeam", (obj, callback) => {
        allTeams.addTeam(new Team(obj));
        io.emit("updateTeams", allTeams);
        console.log(JSON.stringify(allTeams, undefined, 2));
        callback();
    });

    socket.on("joinTeam", (obj, callback) => {
        var resTeam = allTeams.findTeam(obj.teamName);
        resTeam.addUser(obj);
        io.emit("updateTeams", allTeams);
        console.log(JSON.stringify(allTeams, undefined, 2));
        callback();
    });

    socket.on("sendOrder", obj => {
        var resTeam = allTeams.findTeam(obj.teamName);
        var resUser = resTeam.findUser(obj.userName);
        resUser.order = parseInt(obj.order);
        // console.log(JSON.stringify(allTeams, 2, undefined));
        if (allTeams.status()) {
            // console.log(parseInt(orderArr[turn - 1]));
            allTeams.reset(turn, parseInt(orderArr[turn - 1]));
            turn = turn + 1;
            if (turn == 11) {
                io.emit("end", { allTeams, turn });
            } else {
                io.emit("continue", { allTeams, turn });
            }
        }
    });

    socket.on("start", obj => {
        orderArr = obj.order;
        console.log(orderArr);
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
