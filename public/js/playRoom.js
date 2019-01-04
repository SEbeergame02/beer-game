var socket = io({ transports: ["websocket"], upgrade: false });
// 對應使用者的角色顯示不同標題和圖片

socket.on("findRole", allTeams => {
    for (var i in allTeams.allTeams) {
        for (var j in allTeams.allTeams[i].users) {
            curUser = $("#userName").html().replace(/^\s+|\s+$/g, '');
            if (allTeams.allTeams[i].users[j].userName === curUser) {
                getImg = '../img/' + allTeams.allTeams[i].users[j].position + '2.jpg';
                $("#F").attr("src", getImg);
                $("#role").html(allTeams.allTeams[i].users[j].position);
            }
        }
    }
});

$("#sendOrder").click(function () {
    var un = $("#userName").html().replace(/\\/g, '').trim();
    var o = $("#order").val();
    if (o === "" || o < 0) {
        o = 0;
    }
    var obj = {
        userName: un,
        teamName: "test",
        // teamName: $("#resTeam").text(),
        position: $("#role").text(),
        order: o
    };
    socket.emit("sendOrder", obj);
    $("#order").val("");
    $("#order").prop("disabled", true);
    $("#sendOrder").prop("disabled", true);
});

socket.on("continue", function (obj) {
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
});

socket.on("start", () => {
    $("#order").prop("disabled", false);
    $("#sendOrder").prop("disabled", false);
});