var socket = io({ transports: ["websocket"], upgrade: false });
socket.on("putImg", allTeams => {
    for (var i in allTeams.allTeams) {
        for (var j in allTeams.allTeams[i].users) {
            curUser = $("#userName").html().replace(/^\s+|\s+$/g, '');
            if (allTeams.allTeams[i].users[j].userName === curUser) {
                getImg = '../img/' + allTeams.allTeams[i].users[j].position + '2.jpg';
                $("#F").attr("src", getImg);
            }
        }
    }

});