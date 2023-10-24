const router = require("express").Router();
const path = require("path");
const { User, Deposits, Target } = require("../models/Index");
const sequelize = require("../config/connection");

// Authorize page if user is logged in
function loggedIn(req, res, next) {
    if (req.session.user_id) {
        return res.redirect("/dashboard");
    }
    next();
}
// Block a route if a user is not logged in
function isAuthenticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect("/signup");
    }
    next();
}
// Attach user data to the request if they are logged in
async function authenticate(req, res, next) {
    const user_id = req.session.user_id;

    if (user_id) {
        const user = await User.findByPk(req.session.user_id, {
            attributes: ["id", "username"],
        });
        req.user = user.get({ plain: true });
    }

    next();
}
router.get("/", async (req, res) => {
    const user = await User.findByPk(req.session.user_id);
    if (user) {
        res.render("landing", {
            user: {
                id: user.id,
                name: user.username,
            },
        });
    } else {
        res.render("landing");
    }
});
router.get("/addnew", isAuthenticated, authenticate, (req, res) => {
    res.render("addNew");
});

router.get("/savings-calc", isAuthenticated, authenticate, (req, res) => {
    res.render("savings-calc");
});

router.get("/update", isAuthenticated, authenticate, (req, res) => {
    res.render("updateTarget");
});

// Route for sign up form
router.get("/signup", loggedIn, authenticate, (req, res) => {
    res.render("signUp", {
        errors: req.session.errors,
        user: req.user,
    });
    req.session.errors = [];
});
router.get("/login", loggedIn, authenticate, (req, res) => {
    res.render("login", {
        errors: req.session.errors,
        user: req.user,
    });
    req.session.errors = [];
});

router.get("/dashboard", authenticate, async (req, res) => {
    let saveAmountA = 317;
    let targetAmountA = 500;
    let saveAmountB = 267;
    let targetAmountB = 900;
    let completionPercentA = Math.floor((100 * saveAmountA) / targetAmountA);
    let completionPercentB = Math.floor((100 * saveAmountB) / targetAmountB);
    const savingsGoal = {
        firstGoal: {
            name: "Bike Fund",
            startDate: "Today",
            timeOfUpdate: "3h ago",
            saved: saveAmountA,
            target: targetAmountA,
            completion: completionPercentA,
        },
        secondGoal: {
            name: "New Computer",
            startDate: "Today",
            timeOfUpdate: "9h ago",
            saved: saveAmountB,
            target: targetAmountB,
            completion: completionPercentB,
        },
        thirdGoal: {
            name: "New Computer",
            startDate: "Today",
            timeOfUpdate: "9h ago",
            saved: saveAmountB,
            target: targetAmountB,
            completion: completionPercentB,
        },
        backupA: {
            name: "Rent Backup",
            startDate: "Today",
            timeOfUpdate: "2h ago",
            saved: 700,
        },
        rainyDayFund: {
            name: "For a Rainy Day",
            startDate: "Today",
            timeOfUpdate: "3h ago",
            saved: 900,
            completion: 100,
        },
    };
    if (req.session.user_id) {
        const targetList = await Target.findAll({
            where: { user_id: req.session.user_id },
            raw: true,
        });

        const deposit = await Deposits.findAll({
            where: {
                target_id: 5,
            },
            raw: true,
        });
        let sum = 0;
        for (let x = 0; x < deposit.length; x++) {
            sum += deposit[x].deposit_amount;
        }

        res.render("../views/dashboard.hbs", {
            goal: targetList,
            user: req.user,
        });
    } else {
        const targets = await Target.findAll({});
        res.render("../views/dashboard.hbs", {
            goal: savingsGoal,
            user: req.user,
        });
    }
});

router.post("/update/:id", isAuthenticated, authenticate, async (req, res) => {
    try {
        const target = await Target.findByPk(req.params.id);

        target.setDataValue("title", req.body.titleUpdate);
        target.setDataValue("text", req.body.textUpdate);
        await target.save();

        res.redirect("/dashboard");
    } catch (error) {
        req.session.errors = error.errors.map((errObj) => errObj.message);
        res.render("updatePost", { errors: req.session.errors });
    }
});

router.post("/delete/", async (req, res) => {
    res.render("signup");
});

router.post("/delete/:id", isAuthenticated, authenticate, async (req, res) => {
    try {
        const targetId = req.params.id;
        const target = await Target.findByPk(targetId);
        await target.destroy();
        res.redirect("/dashboard");
    } catch (error) {
        const validationErrors = error.errors.map((errObj) => errObj.message);
        req.session.errors = validationErrors;
        res.render("dashboard", { errors: req.session.errors });
    }
});

router.get("/deposit", isAuthenticated, (req, res) => {
    res.render("deposit");
});

module.exports = router;
