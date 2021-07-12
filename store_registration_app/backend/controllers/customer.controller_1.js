const router = require('express').Router();
const Customer = require('../models/customer.model');



// show all customers
router.route('/').get((req, res)=>{

    Customer.find((err, result)=>{

        if (err) {
            res.status(400).end(JSON.stringify(err, null, 3))
        }

        else (res.end(JSON.stringify(result, null, 3)));

    });
});


router.route('/add').post((req, res)=>
{

        Customer.create(
            
        {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            phoneNumber : req.body.phoneNumber,
            mobileNumber : req.body.mobileNumber,
            emailAddress : req.body.emailAddress,
        },
        (err, result) => 
        {

            if (err) {res.status(400).end(JSON.stringify(err, null, 3))}
            else (res.end(JSON.stringify(result, null, 3)))

        }

       
        );
    
});

router.route('/delete').delete((req, res)=>
{

   if (req.query.firstName) {
       Customer.remove(
           {firstName:req.body.firstName},
           (err, result) =>
           {
            if (err) {res.status(400).end(JSON.stringify(err, null, 3))}
            else (res.end(JSON.stringify(result, null, 3)))
           })
   }
    
});


router.route('/update').put((req, res)=>
{

   if (req.query.firstName) {
       Customer.updateOne(
           {firstName:req.body.firstName},
           
           {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            phoneNumber : req.body.phoneNumber,
            mobileNumber : req.body.mobileNumber,
            emailAddress : req.body.emailAddress,
        },
           
           
           (err, result) =>
           {
            if (err) {res.status(400).end(JSON.stringify(err, null, 3))}
            else (res.end(JSON.stringify(result, null, 3)))
           })
   }
    
});

module.exports = router;