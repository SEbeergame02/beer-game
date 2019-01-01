$(document).ready(function () {
    var socket = io({ transports: ["websocket"], upgrade: false });

    function setContent() {
        $(".contents").height(14 * $("table tr").height());
    }
    setContent()

    // $("#sendOrder").click(function () {
    //     var o = $("#order").val();
    //     if (o === "" || o < 0) {
    //         o = 0;
    //     }
    //     var obj = {
    //         userName: $("#userName").html(),
    //         teamName: $("#resTeam").text(),
    //         position: $("#resPos").text(),
    //         order: o
    //     };
    //     socket.emit("sendOrder", obj);
    //     $("#order").val("");
    //     $("#order").prop("disabled", true);
    //     $("#sendOrder").prop("disabled", true);
    // });


    $(document).on("click", ".join", function () {
        var posArr = [undefined, "Factory", "Distribution", "Wholesaler", "Retailer"];
        var tname = $(this).parent().parent().find("td:first").text();
        var pname = posArr[$(this).parent().index()];
        var un = $("#userName").html().replace(/\\/g, '').trim();
        socket.emit("joinTeam", {
            userName: un,
            teamName: tname,
            position: pname
        }, function () {
            window.location.replace("/playRoom");
        })
    });

    socket.on("updateTeams", allTeams => {
        var tbl = `<tr>
                <th>Teams</th>
                <th>Factory</th>
                <th>Distribution</th>
                <th>Wholesaler</th>
                <th>Retailer</th>
                </tr>`;
        var str = ''
        if (allTeams.allTeams.length > 0) {
            for (var i in allTeams.allTeams) {
                var Factory = `<button class="join" type="button">Join</button>`;
                var Distribution = `<button class="join" type="button">Join</button>`;
                var Wholesaler = `<button class="join" type="button">Join</button>`;
                var Retailer = `<button class="join" type="button">Join</button>`;
                for (var j in allTeams.allTeams[i].users) {
                    if (allTeams.allTeams[i].users[j].position === "Factory") {
                        Factory = allTeams.allTeams[i].users[j].userName;
                    }
                    else if (allTeams.allTeams[i].users[j].position === "Distribution") {
                        Distribution = allTeams.allTeams[i].users[j].userName;
                    }
                    else if (allTeams.allTeams[i].users[j].position === "Wholesaler") {
                        Wholesaler = allTeams.allTeams[i].users[j].userName;
                    }
                    else if (allTeams.allTeams[i].users[j].position === "Retailer") {
                        Retailer = allTeams.allTeams[i].users[j].userName;
                    }
                }
                str += `<tr>
                <td>${allTeams.allTeams[i].teamName}</td>
                <td>${Factory}</td>
                <td>${Distribution}</td>
                <td>${Wholesaler}</td>
                <td>${Retailer}</td>
                </tr>`;
            }
        }
        $("#teamList").html(tbl + str);
    });

    // socket.on("continue", function (obj) {
    //     console.log(obj);
    //     obj.allTeams.allTeams.forEach(team => {
    //         if (team.teamName === $("#resTeam").text()) {
    //             team.users.forEach(user => {
    //                 if (user.userName === $("#userName").html()) {
    //                     $("#store").text(user.store);
    //                 }
    //             });
    //         }
    //     });
    //     $("#turn").text(obj.turn);
    //     $("#order").prop("disabled", false);
    //     $("#sendOrder").prop("disabled", false);
    // });

    // socket.on("end", () => {
    //     alert("end");
    // });

    // socket.on("start_game", () => {
    //     $("#order").prop("disabled", false);
    //     $("#sendOrder").prop("disabled", false);
    // });

});
