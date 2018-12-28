var socket = io({ transports: ["websocket"], upgrade: false });

$("#sendOrder").click(function() {
    var o = $("#order").val();
    if (o === "" || o < 0) {
        o = 0;
    }
    var obj = {
        userName: $("#userName").html(),
        teamName: $("#resTeam").text(),
        position: $("#resPos").text(),
        order: o
    };
    socket.emit("sendOrder", obj);
    $("#order").val("");
    $("#order").prop("disabled", true);
    $("#sendOrder").prop("disabled", true);
});

$("#createTeam").click(function() {
    socket.emit(
        "createTeam",
        {
            userName: $("#userName").html(),
            teamName: $("#teamName").val(),
            position: $("#position").val()
        },
        function(obj) {
            $("#resTeam").text(obj.teamName);
            $("#resPos").text(obj.position);
        }
    );
});

$("#joinTeam").click(function() {
    socket.emit(
        "joinTeam",
        {
            userName: $("#userName").html(),
            teamName: $("#allTeams2").val(),
            position: $("#position2").val()
        },
        function(obj) {
            $("#resTeam").text(obj.teamName);
            $("#resPos").text(obj.position);
        }
    );
});

socket.on("updateTeams", allTeams => {
    // var str = "";
    // var str2 = "";
    // for (var i in allTeams.allTeams) {
    //     str += "<tr>";
    //     str += "<td>" + allTeams.allTeams[i].teamName + "</td>";
    //     str2 += "<option>" + allTeams.allTeams[i].teamName + "</option>";
    //     for (var j in allTeams.allTeams[i].users) {
    //         str += "<td>" + allTeams.allTeams[i].users[j].userName + "</td>";
    //         str += "<td>" + allTeams.allTeams[i].users[j].position + "</td>";
    //     }
    //     str += "</tr>";
    // }
    // $("#allTeams").html(str);
    // $("#allTeams2").html(str2);
    var str = "";
    for(let i in allTeams.allTeams) {
        str += "<tr>"
        str += "<th>" + allTeams.allTeams[i].teamName + "</th>";
        for (var j in allTeams.allTeams[i].users) {
            str += "<th>" + allTeams.allTeams[i].users[j].userName + "</th>";
            str += "<th>" + allTeams.allTeams[i].users[j].position + "</th>";
        }
        str += "</tr>";
    }
    $("#tbl").html(str);
});

socket.on("continue", function(obj) {
    console.log(obj);
    obj.allTeams.allTeams.forEach(team => {
        if (team.teamName === $("#resTeam").text()) {
            team.users.forEach(user => {
                if (user.userName === $("#userName").html()) {
                    $("#store").text(user.store);
                }
            });
        }
    });
    $("#turn").text(obj.turn);
    $("#order").prop("disabled", false);
    $("#sendOrder").prop("disabled", false);

    // $("#store").val();
});

// socket.on("start_game", () => {
//     $("#order").prop("disabled", false);
//     $("#sendOrder").prop("disabled", false);
// });

