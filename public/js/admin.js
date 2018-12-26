var socket = io();
$("#start").click(function() {
    var order = $("input[name='order[]']")
        .map(function() {
            return $(this).val();
        })
        .get();
    socket.emit("start", { order });
    $("#start").prop("disabled", true);
});
