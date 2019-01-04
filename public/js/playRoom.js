var socket = io({ transports: ["websocket"], upgrade: false });
var curUser = $("#userName").html().replace(/^\s+|\s+$/g, '');
// 對應使用者的角色顯示不同標題和圖片
socket.on("findRole", allTeams => {
    for (var i in allTeams.allTeams) {
        for (var j in allTeams.allTeams[i].users) {
            if (allTeams.allTeams[i].users[j].userName === curUser) {
                getImg = '../img/' + allTeams.allTeams[i].users[j].position + '2.jpg';
                $("#F").attr("src", getImg);
                $("#role").html(allTeams.allTeams[i].users[j].position);
                $("#teamName").html(allTeams.allTeams[i].teamName);
            }
        }
    }
});
