const router = require("express").Router();
const path = require("path");
const { User, Deposits, Target } = require('../Models/')
router.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "../views/index.hbs"));
    res.render("../views/landing.hbs");
});
router.get("/signup", (req, res) => {
    res.render("../views/loginSignUP.hbs");
});
router.get("/dashboard", async (req, res) => {
    const hi = 'hellothere'
    const user = await User.findAll({
           include: [Deposits, Target],
           raw:true
    })
    console.log(user)
    res.render("../views/dashboard.hbs");
})
router.get("/calc", (req, res) => {
    res.render("../views/savings-calc.hbs")
})


module.exports = router;
