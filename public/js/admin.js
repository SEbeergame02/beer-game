var socket = io();
$("#start").click(function() {
    socket.emit("start");
    $("#start").prop("disabled", true);
});
