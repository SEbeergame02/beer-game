const User = require("./user");

var auth = (req, res, next) => {
    if (req.session.userId) {
        User.findById(req.session.userId).exec((error, user) => {
            if (error) {
                return res.send(error);
            } else {
                if (user === null) {
                    var err = new Error("Not authorized! Go back!");
                    err.status = 400;
                    return res.send(err.message);
                } else {
                    console.log(req.session);
                    req.user = user;
                    next();
                }
            }
        });
    } else {
        return res.redirect("/login");
    }
};

module.exports = { auth };
