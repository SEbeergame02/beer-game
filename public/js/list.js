$(document).ready(function () {
    var socket = io({ transports: ["websocket"], upgrade: false });

    function setContent() {
        $(".contents").height(14 * $("table tr").height());
    }
    setContent()

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
});
