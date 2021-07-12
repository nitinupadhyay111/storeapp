const router = require('express').Router();

let Customer = require('../models/customer.model');



// start declaring routes
// show customers or any other data object for that matter

router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json("error" + err));
});



router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const mobileNumber = req.body.mobileNumber;
    const emailAddress = req.body.emailAddress;

    // const newCustomer = new Customer({}); // standard syntax for creating an entry in the db
    console.log(firstName);
    const newCustomer = new Customer({

        firstName,
        lastName, 
        phoneNumber, 
        mobileNumber,
        emailAddress,
    });
    newCustomer.save() // at this point data will get saved in the db    
    .then(()=>{res.json('customer added!')}) // at this point you need to know what has happened so just console log the response    
    .catch( err => res.status(400).json('Error' + err));
});


// router.route('/').get(()=>{}); // standard syntax
// retrieve customer by ID

router.route('/:id').get((req, res) => {
    Customer.findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json("error:" + err));
});

// delete customers
router.route('/:id').delete((req, res) => { Excercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Customer Deleted"))
    .catch(err => res.status(400).json("Error:" + err)); });

// update customers
router.route('/update/:id').post((req, res) => {
    Customer.findByIdAndUpdate(req.params.id)
    .then((customer) => {
        customer.username = req.body.username; 
        customer.description = req.body.description; 
        customer.duration = Number(req.body.duration); 
        customer.date = Date.parse(req.body.date);
       
        customer.save() // at this very point, customer has become an array and you are now saving it in the db, also it is a promise        
        .then(()=> res.json("customer Updated!"))        
        .catch(err => res.status(400).json("Error: " + err));    
    })    
        .catch(err=>res.status(400).json("Error:" + err));
    });
module.exports = router;