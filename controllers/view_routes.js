const router = require("express").Router();
const path = require("path");
const { User, Deposits, Target } = require('../Models/')
// auth page if user is logged in
function loggedIn(req, res, next) {
    if(req.session.user_id) {
        return res.redirect('/')
    }
    next()
}
// block a route if a user is not logged in
function IsAuthenicated(req, res, next) {
    if(!req.session.user_id) {
        return res.redirect('/signup')
    }
    next()
}
// Attach user data to the request if they are logged in
async function authenticate(req, res, next) {
    const user_id = req.session.user_id

    if(user_id) {
        const user = await User.findByPk(req.session.user_id, {
            attributes: ['id', 'email']
        })
        req.user = user.get({ plain: true })
    }

    next()
}
router.get('/',(req,res)=>{
// We will make adjustment to the names but temporarily its this
    res.render('savings-calc')
})
// route for register form
router.get('/signup', loggedIn, authenticate, (req, res) => {
    res.render('signUp', {
        errors: req.session.errors,
        user: req.user
    })
    req.session.errors = []
})
router.get('/login', loggedIn, authenticate, (req, res) => {
    res.render('login', {
        errors: req.session.errors,
        user: req.user
    })
    req.session.errors = []
})

router.get("/dashboard", async (req, res) => {
    const hi = 'hellothere'
    const user = await User.findAll({
           include: [Deposits, Target],
           raw:true
    });
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
    console.log(user)
    res.render("../views/dashboard.hbs", {
        goal: savingsGoal,
        user: req.user
    });
})
router.get("/calc", (req, res) => {
    // Making adjustments since a designated Calc file is not made yet
    // res.render("../views/landing.hbs");
})


module.exports = router;
