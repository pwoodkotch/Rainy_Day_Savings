const router = require("express").Router();
const viewroutes = require("./view_routes.js");
const { User, Deposits, Target } = require('../Models/')
// const User = require('../Models/user.js')
// const Target = require('../Models/target.js')
// const Deposits = require('../Models/deposits.js')


router.post('/dashboard',(req,res)=>{
    User.create(req.body)
    console.log(req.body)
    res.send('hi')

})

router.post('/signup',async (req,res)=>{
    try{
        const user = user.create(req.body)
        req.session.user_id =user.id
        res.redirect('/')
    }catch(error){
        req.session.errors = error.errors.map(errobj => errobj.message)
        res.redirect('/signup')

    }
})

module.exports = router;
