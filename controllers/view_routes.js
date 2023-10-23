const router = require("express").Router();
const path = require("path");
const hbs = require("handlebars");
const Deposits = require("../Models/deposits")

router.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "../views/index.hbs"));
    res.render("../views/landing.hbs");
});
router.get("/signup", (req, res) => {
    res.render("../views/loginSignUP.hbs");
});
router.get("/dashboard", (req, res) => {
    Deposits.findAll()
    hbs.registerPartial("dash-items", "../views/partials/dash-items.hbs")
    res.render("../views/dashboard.hbs");
})
router.get("/calc", (req, res) => {
    res.render("../views/savings-calc.hbs")
})


module.exports = router;
