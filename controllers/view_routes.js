const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "../views/index.hbs"));
    res.render("../views/landing.hbs");
});
router.get("/signup", (req, res) => {
    res.render("../views/loginSignUP.hbs");
});
router.get("/dashboard", async (req, res) => {
    //Get info from database
    //Convert information from database to comprehensible json

    const goals = {
        rainyDayFund: {
            name: "For a Rainy Day",
            startDate: "Today",
            timeOfUpdate: "3h ago",
            saved: 900,
            completion: 100
        }
    }
    
    res.render("../views/dashboard.hbs", {
        goal: goals,
        user: req.user
    });
})
router.get("/calc", (req, res) => {
    res.render("../views/savings-calc.hbs")
})


module.exports = router;
