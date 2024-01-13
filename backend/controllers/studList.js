const userInfo = require('../models/Userinfo');
const vendor = require('../models/vendors');

const list = async (req, res) => {
    try {        
        const  messName = await vendor.findOne({id:req.session.userId});           
        const projection = { _id: 0, email: 0, mess: 0, remaining_amount: 0, total_amount: 0, __v: 0 }
        const result = await userInfo.find({ mess: messName.name }, projection);
        return res.json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
}

const listAll = async (req, res) => {    
    const messName = req.params.mess;
    let mess='';
    if(messName==='Kumar')
    {
        mess='Kumar Mess'
    }
    else if(messName==='Galav')
    {
        mess='Galav Mess'
    }
    else
    {
        mess='Shree Sai'
    }
    try {
        const projection = { _id: 0, email: 0, mess: 0, remaining_amount: 0, total_amount: 0, __v: 0 }
        const result = await userInfo.find({ mess: mess }, projection);
        return res.json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
}


module.exports ={ list, listAll};