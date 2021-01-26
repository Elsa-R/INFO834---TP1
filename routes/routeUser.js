//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/controllerUser');
const modelUser = require('../models/modelUser');

//CREATE
router.post("/user", (req, res) => {
    controller.create(req, res);
});

//CONNECTION
router.post('/login',(req,res) => {
    User.findOne({ mail: req.body.mail }, function (err,user) {
        if (err) throw err;
        // test a matching password
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) throw err;
            if(req.bodypassword, isMatch){
                const token = Jwt.sign({id: user._ird, password: user.password, mail: user.mail},
                    JWT_SECRET,
                    {expiresIn: '1 week'})

                    res.send(token)
            } else {
                res.send("mot de passe ou email incorrect")
            }
        });
    });
});

//READ
router.get("/users", (req, res) => {
    controller.reads(req, res);
});

router.get("/user/:id", (req, res) => {
    controller.read(req, res);
});

//UPDATE
router.put("/user/:id", (req, res) => {
    controller.update(req, res);
});

//DELETE
router.delete("/user/:id", (req, res) => {
    controller.delete(req, res);
});

module.exports = router;