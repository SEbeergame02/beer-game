var socket = io({ transports: ["websocket"], upgrade: false });
var curUser = $("#userName").html().replace(/^\s+|\s+$/g, '');

// 對應使用者的角色顯示不同標題和圖片

socket.on("findRole", obj => {
    for (var i in obj.allTeams.allTeams) {
        for (var j in obj.allTeams.allTeams[i].users) {
            if (obj.allTeams.allTeams[i].users[j].userName === curUser) {
                getImg = '../img/' + obj.allTeams.allTeams[i].users[j].position + '2.jpg';
                // console.log(getImg);
                $("#F").attr("src", getImg);
                $("#role").html(obj.allTeams.allTeams[i].users[j].position);
                $("#teamName").html(obj.allTeams.allTeams[i].teamName);
                $("#store").text(obj.allTeams.allTeams[i].users[j].store);
                $("#liab").text(obj.allTeams.allTeams[i].users[j].debt);
                var tbl = $(".inner").html();
                var user = obj.allTeams.allTeams[i].users[j];
                console.log(user);
                for (var k = 0; k < obj.turn; k++) {
                    tbl += `<tr class='te'>`;
                    tbl += `<td class='te'>${k}</td>`;
                    tbl += `<td class='te'>${user.storeArr[k]}</td>`;
                    tbl += `<td class='te'>${user.orderArr[k]}</td>`;
                    tbl += `<td class='te'>${user.debtArr[k]}</td>`;
                    // 當期成本

                    if (user.debt > 0) {
                        tbl += `<td class='te'>${user.debt * 2}</td>`;
                    } else {
                        tbl += `<td class='te'>${user.store}</td>`;
                    }
                    // 累積成本
                    tbl += `<td class='te'>${user.costArr[obj.turn - 1]}</td>`;
                    tbl += `</tr>`;
                }
                $(".inner").html(tbl);
                $("#turn").text(obj.turn);
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
        teamName: $("#teamName").text(),
        position: $("#role").text(),
        order: o
    };

    socket.emit("sendOrder", obj);
    $("#order").val("");
    $("#order").prop("disabled", true);
    $("#sendOrder").prop("disabled", true);

});

socket.on("continue", function (obj) {
    // console.log(obj);
    console.log(obj.turn + 1);
    var un = $("#userName").html().replace(/\\/g, '').trim();
    // 從前端得到當前使用者的 teamName
    // 依照得到的 teamName 再去找 user
    // 再把 user 的 store 抓出來
    // var thisTurn = $("#turn").html().replace(/^\s+|\s+$/g, '');
    var tbl = $(".inner").html();
    // console.log(thisTurn);
    obj.allTeams.allTeams.forEach(team => {
        if (team.teamName === $("#teamName").text()) {
            team.users.forEach(user => {
                console.log(obj.turn - 2);
                if (user.userName === un) {
                    $("#store").text(user.store);
                    $("#liab").text(user.debt);
                    tbl += `<tr class='te'>`;
                    tbl += `<td class='te'>${obj.turn}</td>`;
                    tbl += `<td class='te'>${user.storeArr[obj.turn - 1]}</td>`;
                    tbl += `<td class='te'>${user.orderArr[obj.turn - 1]}</td>`;
                    tbl += `<td class='te'>${user.debtArr[obj.turn - 1]}</td>`;
                    // 當期成本
                    if (user.debt > 0) {
                        tbl += `<td class='te'>${user.debt * 2}</td>`;
                    } else {
                        tbl += `<td class='te'>${user.store}</td>`;
                    }
                    // 累積成本
                    tbl += `<td class='te'>${user.costArr[obj.turn - 1]}</td>`;
                    tbl += `</tr>`;
                }
            });
        }
    });

    $(".inner").html(tbl);
    $("#turn").text(obj.turn);
    $("#order").prop("disabled", false);
    $("#sendOrder").prop("disabled", false);
});

socket.on("start", () => {
    $("#order").prop("disabled", false);
    $("#sendOrder").prop("disabled", false);
});

socket.on("end", () => {
    window.location.replace("/dashBoard");
});
