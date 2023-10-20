const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "../views/index.hbs"));
    res.render("../Views/landing.hbs");
});
router.get("/signup", (req, res) => {
    res.render("../Views/signUp.hbs");
});

module.exports = router;
