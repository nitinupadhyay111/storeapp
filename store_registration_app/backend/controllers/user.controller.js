const router = require('express').Router();
const User = require('../models/user.model');
const bodyparser = require('body-parser');
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));


// show all user
router.route('/').get((req, res) => {

    User.find((err, result) => {

        if (err) {
            res.status(400).end(JSON.stringify(err, null, 3))
        }

        else (res.end(JSON.stringify(result, null, 3)));

    });
});

// Get one user
router.route('/findone').post((req, res) => {
    console.log(req.body);
    User.findOne({
        email: req.body.email,
        password: req.body.password

    }, (err, result) => {
        if (err) {
            res.status(400).end(JSON.stringify(err, null, 3))
        }

        else {
            console.log(JSON.stringify({body:result}, null, 3));
            res.send(JSON.stringify({body:result}, null, 3));
            
        };
    })
});


router.route('/add').post((req, res) => {
    console.log(JSON.stringify({ status: req.body }))
    User.create(

        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            receivePromotion: req.body.receivePromotion,
            acceptTerms: req.body.acceptTerms,
        },
        (err, result) => {

            if (err) { res.status(400).end(JSON.stringify(err, null, 3)) }
            else (res.end(JSON.stringify(result, null, 3)))

        }


    );

});

router.route('/delete').delete((req, res) => {

    if (req.query.firstName) {
        User.remove(
            { firstName: req.body.firstName },
            (err, result) => {
                if (err) { res.status(400).end(JSON.stringify(err, null, 3)) }
                else (res.end(JSON.stringify(result, null, 3)))
            })
    }

});





router.route('/update').put((req, res) => {

    if (req.query.firstName) {
        User.updateOne(
            { firstName: req.body.firstName },

            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                receivePromotion: req.body.receivePromotion,
                acceptTerms: req.body.acceptTerms,
            },


            (err, result) => {
                if (err) { res.status(400).end(JSON.stringify(err, null, 3)) }
                else (res.end(JSON.stringify(result, null, 3)))
            })
    }

});

module.exports = router;