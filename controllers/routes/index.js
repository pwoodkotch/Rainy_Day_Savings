const router = require("express").Router();
const viewroutes = require("../view_routes.js");

router.use("/", viewroutes);

router.use((req, res) => {
    res.send("landing page");
});

module.exports = router;
