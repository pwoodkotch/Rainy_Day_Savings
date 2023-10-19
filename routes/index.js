const router = require("express").Router();
// router.use("/");
router.use((req, res) => {
    res.send("landing page");
});

module.exports = router;
