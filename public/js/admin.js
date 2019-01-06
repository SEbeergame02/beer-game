var socket = io({ transports: ["websocket"], upgrade: false });
$("#start").click(function () {
    var order = $("input[name='order[]']")
        .map(function () {
            return $(this).val();
        })
        .get();
    socket.emit("start", { order });
    $("#start").prop("disabled", true);
});
$(document).ready(function () {
    socket.on("updateTeams", allTeams => {
        var tbl = `<thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Factory</th>
          <th scope="col">Distribution</th>
          <th scope="col">Wholesaler</th>
          <th scope="col">Retailer</th>
        </tr>
      </thead>
      <tbody>`;

        if (allTeams.allTeams.length > 0) {
            for (var i in allTeams.allTeams) {
                var Factory = '';
                var Distributor = '';
                var Wholesaler = '';
                var Retailer = '';
                for (var j in allTeams.allTeams[i].users) {
                    if (allTeams.allTeams[i].users[j].position === "Factory") {
                        Factory = allTeams.allTeams[i].users[j].userName;
                    }
                    else if (allTeams.allTeams[i].users[j].position === "Distributor") {
                        Distributor = allTeams.allTeams[i].users[j].userName;
                    }
                    else if (allTeams.allTeams[i].users[j].position === "Wholesaler") {
                        Wholesaler = allTeams.allTeams[i].users[j].userName;
                    }
                    else if (allTeams.allTeams[i].users[j].position === "Retailer") {
                        Retailer = allTeams.allTeams[i].users[j].userName;
                    }
                }
                tbl += `<tr>
                    <td>${allTeams.allTeams[i].teamName}</td>
                    <td>${Factory}</td>
                    <td>${Distributor}</td>
                    <td>${Wholesaler}</td>
                    <td>${Retailer}</td>
                    </tr>
                    </tbody>`;
            }
        }
        $("#teamList").html(tbl);
    });
});
