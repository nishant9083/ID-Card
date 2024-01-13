// const mongoose = require('../index');
const { galavMenu, kumarMenu, saiMenu } = require('../models/Menu');
const Userinfo = require('../models/Userinfo');
const User = require('../models/User');
const Vendor = require('../models/vendors');
// const menuData = new Menu({

//   name: 'Monday',
//   meals: [
//     {
//       type: 'Breakfast',
//       items: [
//         { name: 'Scrambled Eggs', price: 5.99 },
//         { name: 'Toast', price: 2.99 },
//       ],
//     },
//     {
//       type: 'Lunch',
//       itmes: [
//         {name: 'Rice', price: 20},
//         {name: 'Dal', price: 15},
//       ]
//     },
//     {
//       type: 'Snacks',
//       items: [
//         {name: 'Tea', price: 7},
//         {name: 'Maggie', price: 15}
//       ]
//     },
//     {
//       type: 'Dinner',
//       items: [
//         {name: 'Roti', price: 15},
//         {name: 'Matar Paneer', price}
//       ]
//     }
//   ],
// });

// Save the data to the database
// menuData.save()
//   .then(() => {
//     console.log('Menu data saved successfully.');
//   })
//   .catch((err) => {
//     console.error('Error saving menu data:', err);
//   })
// .finally(() => {
//   mongoose.disconnect(); // Close the database connection
// });

const menuList = async (req, res) => {
  const user = await User.findOne({ userId: req.session.userId });
  let mess = null;
  if (user.person === 'Vendor') {
    const userData = await Vendor.findOne({ id: req.session.userId });
    mess = userData.name;
  }
  else if (user.person === 'Student') {
    userData = await Userinfo.findOne({ id: req.session.userId });
    mess = userData.mess;
  }
  try {
    let menuData = null;
    if (mess === 'Galav Mess')
      menuData = await galavMenu.find({}).exec();
    else if (mess === 'Kumar Mess')
      menuData = await kumarMenu.find({}).exec();
    else
      menuData = await saiMenu.find({}).exec();

    return res.json(menuData);

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'menu error' });
  }
}



module.exports = menuList;