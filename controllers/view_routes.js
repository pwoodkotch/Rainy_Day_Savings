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
    //Get info from database
    //Convert information from database to comprehensible json
    let saveAmountA = 317;
    let targetAmountA = 500;
    let saveAmountB = 267;
    let targetAmountB = 900;
    let completionPercentA = Math.floor(100 * saveAmountA/targetAmountA)
    let completionPercentB = Math.floor(100 * saveAmountB/targetAmountB)
    const savingsGoal = {
        firstGoal: {
            name: "Bike Fund",
            startDate: "Today",
            timeOfUpdate: "3h ago",
            saved: saveAmountA,
            target: targetAmountA,
            completion: completionPercentA
        },
        secondGoal: {
            name: "New Computer",
            startDate: "Today",
            timeOfUpdate: "9h ago",
            saved: saveAmountB,
            target: targetAmountB,
            completion: completionPercentB
        },
        thirdGoal: {
            name: "New Computer",
            startDate: "Today",
            timeOfUpdate: "9h ago",
            saved: saveAmountB,
            target: targetAmountB,
            completion: completionPercentB
        },
        backupA: {
            name: "Rent Backup",
            startDate: "Today",
            timeOfUpdate: "2h ago",
            saved: 700
        },
        rainyDayFund: {
            name: "For a Rainy Day",
            startDate: "Today",
            timeOfUpdate: "3h ago",
            saved: 900,
            completion: 100
        }
    }
    res.render("../views/dashboard.hbs", {
        goal: savingsGoal,
        user: req.user
    });
})
router.get("/calc", (req, res) => {
    res.render("../views/savings-calc.hbs")
})


module.exports = router;
