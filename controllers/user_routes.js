const router = require("express").Router();
// const session = require("express-session");
const viewroutes = require("./view_routes.js");
const { User, Deposits, Target, depositstarget } = require('../models/Index.js');
// const { findAll } = require("../models/User.js");
// const User = require('../Models/user.js')
// const Target = require('../Models/target.js')
// const Deposits = require('../Models/deposits.js')

router.post('/deposit', async (req,res)=>{

   const dposits =  await Deposits.create(req.body)

    // if (req.body.username){
    //     const userarr = req.body.username
    //     const user = await User.findAll({
    //         where:{
    //             username:userarr
    //         }
    //     })
    //     await user.setUser(dposits)
        // return deposittarget.bulkCreate(userarr)
    // }
});
router.post('/target', async (req,res)=>{

    const target =  await Target.create(req.body)
 
     
 });
router.post('/signup',async (req,res)=>{
    try{
        const user = await User.create(req.body);
        console.log("USER:",user);
        req.session.user_id = user.id;
        const examp = req.session.user;
        // req.session.user = user;
        console.log("SESSION ID:", examp);
        req.session.save(() => {
            console.log("AFTER:", req.session.user_id);
            res.redirect('/dashboard');
        });
 
    }catch(error){
        req.session.errors = error.errors.map(errobj => errobj.message);
        res.redirect('/signup');

    }
});
router.post('/login', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if(!user) {
        req.session.errors = ['No user with that username was found.']
        console.log('not user')
        return res.redirect('/login')
    }
    const valid_pass = await user.validatePass(req.body.password)
    
    if(!valid_pass) {
        req.session.errors = ['Password is incorrect.']
        return res.redirect('/login')
    }
    console.log('hi')
    req.session.user_id = user.id
    if(user){

        console.log(req.session.user_id)
    }
    res.redirect('/dashboard')
});


router.post('/addnew', async (cro,sro)=>{
    // console.log(cro.session)
    const user = await User.findOne({
        where: {
            id: cro.session.user_id
        }
    })
    console.log(user)
    console.log(cro.body)
    let started =1
    let saved = 0
    let completion = 0
    const targets = await Target.create({
        target_amount: cro.body.target_amount,
        name: cro.body.name,
        started: started,
        saved:saved,
        completion: completion,
        user_id: cro.session.user_id


    })
    console.log(targets)
    sro.redirect('/dashboard')

    
});
router.get('/testing',async (cro,sro)=>{
    const hi = 'hithere'
    console.log('cro',cro.session.user_id)
    const user = await User.findByPk(cro.session.user_id,{

        include: {
            model:Target,
            include: Deposits
        
        }
        // where:{username:hi}
        
    })
    console.log("string", user)
    sro.send(user)
});

router.get("/logout", (req,res) => {
    req.session.destroy;
    res.redirect("/");
});

module.exports = router;
