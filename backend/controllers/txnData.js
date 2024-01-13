const userTxn = require('../models/CardTransection');


const txn = async (req, res) => {
    const id= req.session.userId;
    try {
        const his = await userTxn.find({account_from: id});         
        return res.json(his);
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
}



module.exports = txn;