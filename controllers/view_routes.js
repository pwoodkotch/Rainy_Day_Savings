const router = require("express").Router();
const path = require("path");
const { User, Deposits, Target } = require('../models/Index')
// const hbs = require("../views/hbs/helpers")
// auth page if user is logged in
function loggedIn(req, res, next) {
    if(req.session.user_id) {
        return res.redirect('/dashboard')
    }
    next()
}
// block a route if a user is not logged in
function isAuthenticated(req, res, next) {
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
            attributes: ['id', 'username']
        })
        req.user = user.get({ plain: true })
    }

    next()
}

router.get('/addnew', isAuthenticated, authenticate, (req,res) => {
        res.render('addNew')
})

router.get('/update', isAuthenticated, authenticate, (req,res)=>{      
        res.render('updateTarget')
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
    const user = await Target.findAll({
        include: [Deposits, Target],
        raw:true
    });
    // console.log(user)
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
        // goal: Target,
        user: req.user
    });
})

router.post("/update/:id",isAuthenticated,authenticate,async (req, res) => {
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
}
);

router.get("/update/:id", isAuthenticated, authenticate, async (req, res) => {
    try{
        const targetId = req.params.id
        const target = await Target.findByPk(targetId);
    
        res.render("update", { target });
    }catch(error){
        req.session.errors = error.errors.map((errObj) => errObj.message);
        res.render("updatePost", { errors: req.session.errors });
    }
});

router.delete("/delete/:id", isAuthenticated, authenticate, async (req, res) => {
        try {
            const targetId = req.params.id;
            const target = await Post.findByPk(targetId);
            await target.destroy();
            res.render("dashboard");
        } catch (error) {
            const validationErrors = error.errors.map(
                (errObj) => errObj.message
            );
            req.session.errors = validationErrors;
            res.render("dashboard", { errors: req.session.errors });
        }
    }
);

module.exports = router;
