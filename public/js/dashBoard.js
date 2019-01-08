var socket = io({ transports: ["websocket"], upgrade: false });
var curUser = $("#userName").html().replace(/^\s+|\s+$/g, '');

socket.on("findRole", obj => {
    console.log(obj);
    for (var i in obj.allTeams.allTeams) {
        for (var j in obj.allTeams.allTeams[i].users) {
            if (obj.allTeams.allTeams[i].users[j].userName === curUser) {
                var user = obj.allTeams.allTeams[i].users[j];
                drawChart(user.costArr, user.orderArr);
            }
        }
    }
});

socket.on("putRank", obj => {
    console.log(obj.rankArr);
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