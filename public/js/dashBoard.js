var socket = io({ transports: ["websocket"], upgrade: false });
var curUser = $("#userName").html().replace(/^\s+|\s+$/g, '');
var curTeam;

socket.on("findRole", obj => {
    for (var i in obj.allTeams.allTeams) {
        for (var j in obj.allTeams.allTeams[i].users) {
            if (obj.allTeams.allTeams[i].users[j].userName === curUser) {
                var user = obj.allTeams.allTeams[i].users[j];
                drawChart(user.costArr, user.orderArr);
                curTeam = obj.allTeams.allTeams[i].teamName;
            }
        }
    }
});

socket.on("putRank", obj => {
    var str = `
            <thead class="thead-dark">
              <tr>
                <th>Ranking</th>
                <th>Team Name</th>
                <th>Integral</th>
              </tr>
            </thead>
            <tbody>
    `
    for (let i = 0; i < obj.rankArr.length; i++) {
        if (obj.rankArr[i].teamName === curTeam) {
            $("#personRank").html('#' + (i + 1));
            $("#personScore").html(obj.rankArr.length - (i + 1) + 1);
        }
        str += "<tr><td>" + (i + 1) + "</td>";
        str += `<td>${obj.rankArr[i].teamName}</td>`;
        str += `<td> ${obj.rankArr.length - (i + 1) + 1}</td></tr>`;
    }
    str += "</tbody>"
    $("#rankTbl").html(str);
});

function drawChart(costArr, orderArr) {
    var ctx = document.getElementById("myChart0");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [{
                label: "cost",
                data: costArr,
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff',
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            legend: {
                display: false,
            }
        }
    });
    var ctx = document.getElementById("myChart1");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [{
                label: "cost",
                data: orderArr,
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            legend: {
                display: false,
            }
        }
    });
}