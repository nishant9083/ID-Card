const router = require('express').Router();
const {menuList} = require('../controllers/MenuList');
const {listAll} = require('../controllers/studList');
const {menuListVendor} = require('../controllers/MenuList');


router.post("/:mess", listAll);


module.exports = router;