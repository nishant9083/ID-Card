/* eslint-disable*/
const router = require("express").Router();
const { signUp, logIn, logOut } = require("../controllers/auth");


router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);


module.exports = router;
