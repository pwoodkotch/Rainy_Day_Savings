const router = require("express").Router();
const viewroutes = require("./view_routes.js");
const userroutes = require("./user_routes.js");
// const {User,Deposits,Target} = require('../Models/index.js')
// const User = require('../models/User.js');
router.use("/", userroutes);
router.use("/", viewroutes);

router.use((req, res) => {
    res.send("landing page");
});
module.exports = router;