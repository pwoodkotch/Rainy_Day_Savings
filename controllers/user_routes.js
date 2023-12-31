const router = require("express").Router();
const viewroutes = require("./view_routes.js");

const { User, Deposits, Target, depositstarget } = require("../models");
const { Sequelize } = require("sequelize");

router.post("/deposit", async (req, res) => {
    try {
        const dept = req.session.user_id;

        const targetname = await Target.findAll({
            where: {
                name: req.body.name,
                user_id: dept,
            },
            raw: true,
        });

        const depositAmount = Number(req.body.deposit_amount);
        const dposits = await Deposits.create({
            deposit_amount: req.body.deposit_amount,
            user_id: req.session.user_id,
            target_id: targetname[0].id,
        });

        const target = await Target.findByPk(dposits.target_id);

        const targetsaved = target.saved + depositAmount;

        await Target.update(
            {
                saved: targetsaved,
            },
            {
                where: {
                    id: dposits.target_id,
                },
            }
        );
        await Target.update(
            {
                completion: Sequelize.literal(
                    "FLOOR(100 * saved / target_amount)"
                ),
            },
            {
                where: {
                    id: dposits.target_id,
                },
            }
        );
        res.redirect("/dashboard");
    } catch (error) {
        req.session.errors = ["Invalid Goal Name."];
        res.redirect("/deposit");
    }
});
router.post("/target", async (req, res) => {
    const target = await Target.create(req.body);
    res.redirect("/dashboard");
});
router.post("/signup", async (req, res) => {
    try {
        const user = await User.create(req.body);
        req.session.user_id = user.id;
        const examp = req.session.user;

        req.session.save(() => {
            res.redirect("/dashboard");
        });
    } catch (error) {
        req.session.errors = ["Password must contain atleast 7 characters."];
        res.redirect("/signup");
    }
});
router.post("/login", async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (!user) {
        req.session.errors = ["No user with that username was found."];
        return res.redirect("/login");
    }
    const valid_pass = await user.validatePass(req.body.password);

    if (!valid_pass) {
        req.session.errors = ["Password is incorrect."];
        return res.redirect("/login");
    }

    req.session.user_id = user.id;
    if (user) {
        console.log(req.session.user_id);
    }
    res.redirect("/dashboard");
});

router.post("/calc", async (req, res) => {
    const amount = req.body.amountWeek;

    const monthAmount = amount * 4;

    res.render("landing", { monthAmount, amount });
});

router.post("/fullCalc", async (req, res) => {
    const amount = req.body.amountWeek;
    const goal = req.body.goalAmount;

    const monthAmount = amount * 4;
    const yearAmount = amount * 52;
    const timeOfGoal = goal / amount;
    const adjTimeOfGoal = Math.round(timeOfGoal);

    res.render("savings-calc", {
        monthAmount,
        amount,
        yearAmount,
        adjTimeOfGoal,
    });
});

router.post("/addnew", async (cro, sro) => {
    const user = await User.findOne({
        where: {
            id: cro.session.user_id,
        },
    });

    let started = 1;
    let saved = 1;
    let completion = 1;
    const targets = await Target.create({
        target_amount: cro.body.target_amount,
        name: cro.body.name,
        started: started,
        saved: saved,
        completion: completion,
        user_id: cro.session.user_id,
    });
    sro.redirect("/dashboard");
});

router.get("/testing", async (cro, sro) => {
    const hi = "hithere";
    console.log("cro", cro.session.user_id);
    const user = await User.findByPk(cro.session.user_id, {
        include: {
            model: Target,
            include: Deposits,
        },
    });
    console.log("string", user);
    sro.send(user);
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
