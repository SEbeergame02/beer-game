var socket = io({ transports: ["websocket"], upgrade: false });

$("#submit").click(function () {
    var un = $("#userName").html().replace(/\\/g, '').trim();
    socket.emit(
        "createTeam",
        {
            userName: un,
            teamName: $("#teamName").val(),
            position: $("input[name='pos']:checked").val()
        },
        function () {
            //送出之後執行
            window.location.replace("/playRoom");
        }
    );
});