const express = require("express");
const {getSignup,postSignup,getLogin,postLogin} =require('../controllers/authControllers');

const router = express.Router();

router.route('/signup')
.get(getSignup)
.post(postSignup);

router.route('/login')
.get(getLogin)
.post(postLogin);




module.exports = router;
