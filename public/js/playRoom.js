var socket = io({ transports: ["websocket"], upgrade: false });
socket.on("putImg", allTeams => {
    for (var i in allTeams.allTeams) {
        for (var j in allTeams.allTeams[i]) {
            if (allTeams.allTeams[i].users[j].usarName === $("#userName").html())
                getImg = '../img' + allTeams.allTeams[0].users[0].position + '2.jpg';
        }
    }
    // console.log();

    $("#F").attr("src", getImg);
});