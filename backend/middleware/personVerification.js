
const User = require("../models/User");

const tokenValid = async (req, res, next) => {
    try {
        const user = await User.findOne({userId: req.session.userId});
        res.json({person: user.person });
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message });
    }

}

module.exports = tokenValid;