const router = require("express").Router();
const viewroutes = require("./view_routes.js");
const { User, Deposits, Target, deposittarget } = require('../Models/');
const { findAll } = require("../Models/user.js");
// const User = require('../Models/user.js')
// const Target = require('../Models/target.js')
// const Deposits = require('../Models/deposits.js')


router.post('/signup',(req,res)=>{
    User.create(req.body)
    // console.log(req.body)
    res.redirect('/')

})
router.post('/deposit', async (req,res)=>{

   const dposits =  await Deposits.create(req.body)

    if (req.body.username){
        const userarr = req.body.username
        const user = await User.findAll({
            where:{
                username:userarr
            }
        })
        await user.addUser(dposits)
        // return deposittarget.bulkCreate(userarr)
    }
})
router.post('/signup',async (req,res)=>{
    try{
        const user = User.create(req.body)
        req.session.user_id =user.id
        res.redirect('/dashboard')
    }catch(error){
        req.session.errors = error.errors.map(errobj => errobj.message)
        res.redirect('/signup')

    }
})

module.exports = router;
