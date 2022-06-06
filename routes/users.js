var express = require('express');
var router = express.Router();
let userSchema = require('../Schema/schema')
let {encryptPwd, dencryptPwd} = require('../Schema/crypt')

/* GET users listing. */
router.get('/display', async function(req, res) {
  try {
    const result = await userSchema.find()
    res.json({
      message:'Displaying all records',
      result
    })
    
  } 
  catch (error) {
    console.log(error);
  } 
});

router.post('/register', async function(req, res) {
  try {
    const user = await userSchema.findOne({email:req.body.email})
    if(user)
    {
      res.send('User already exists')
    }
    else{
      const encodePwd = await encryptPwd(req.body.password)
      req.body.password = encodePwd
      await userSchema.create(req.body)
      res.send('Account  created')
    }
    
  } 
  catch (error) {
    console.log(error);
  } 
});

router.post('/login', async function(req, res) {
  try {
    const user = await userSchema.findOne({email:req.body.email})
    if(user)
    {
      let result = dencryptPwd(req.body.password, user.password )
      if(result)
      {
        res.send('Login success')
      }
      else{
        res.send('Wrong Password')
      }
    }
    else{
      res.send('Kindly create an account to login')
    }
    
  } 
  catch (error) {
    console.log(error);
  } 
});



module.exports = router;
