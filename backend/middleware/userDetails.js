const User = require("../models/User");
const userData = require('../controllers/userData');


const auth = async (req, res, next) => {
    try {
              
        const user = await User.findOne({ userId: req.session.userId }); // Use findOne instead of find        
        if (!user) return res.status(404).json({ msg: 'User not found' });
        let userInfo = null;
        if(user.person !== 'Admin')
             userInfo = await userData(String(user.userId), user.person);
        else
            userInfo = user;
        if(user.person==='Vendor'){
            res.cookie('mess', userInfo.name, {path: '/', domain: 'localhost', httpOnly: true, maxAge: 1800000});
        }
        else if(user.person==='Student')
            res.cookie('mess', userInfo.mess, {path: '/', domain: 'localhost', httpOnly: true, maxAge: 1800000});
        res.json({ userInfo });
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }

}

module.exports = auth;