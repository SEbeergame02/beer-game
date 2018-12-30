const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("./middleWare");
const User = require("./user");

var upload = multer({ dest: "public/uploads/" });

router.get("/", auth, (req, res) => {
    res.render("home", {
        name: req.user.username,
        img: req.user.imgPath
    });
});

router.get("/playRoom", auth, (req, res) => {
    res.render("playRoom");
});

router.get("/admin", auth, (req, res) => {
    res.render("admin");
});

router.get("/waitRoom", auth, (req, res) => {
    res.render("waitRoom", { user: req.user });
});

router.get("/logout", (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(err => {
            if (err) {
                return res.send(err);
            } else {
                return res.redirect("/login");
            }
        });
    }
});

router.post("/register", upload.any(), (req, res) => {
    if (req.body.username && req.body.password) {
        var userData = {
            username: req.body.username,
            password: req.body.password
            // imgPath: req.files[0].path,
            // imgName: req.files[0].originalname
        };
        User.create(userData, (error, user) => {
            if (error) {
                return res.send(error);
            } else {
                req.session.userId = user._id;
                return res.redirect("/profile");
            }
        });
    }
});

router.post("/login", (req, res) => {
    if (req.body.username && req.body.password) {
        User.authenticate(
            req.body.username,
            req.body.password,
            (error, user) => {
                if (error || !user) {
                    err = new Error("Wrong username or password.");
                    return res.send(err.message);
                } else {
                    req.session.userId = user._id;
                    return res.redirect("/");
                }
            }
        );
    } else {
        var err = new Error("All fields required.");
        err.status = 400;
        return res.send(err.message);
    }
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/profile", auth, (req, res) => {
    return res.render("profile", {
        name: req.user.username,
        img: req.user.imgPath
    });
});

module.exports = router;
