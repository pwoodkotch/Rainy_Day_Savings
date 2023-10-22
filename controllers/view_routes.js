const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "../views/index.hbs"));
    res.render("../views/landing.hbs");
});
router.get("/signup", (req, res) => {
    res.render("../views/loginSignUP.hbs");
});
router.get("/dashboard", (req, res) => {
    res.render("../views/dashboard.hbs");
})
router.get("/calc", (req, res) => {
    res.render("../views/savings-calc.hbs")
})


module.exports = router;
