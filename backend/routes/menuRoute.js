const router = require('express').Router();
const {menuList} = require('../controllers/MenuList');
const {list} = require('../controllers/studList');
const {listAll} = require('../controllers/studList');
const {menuListVendor} = require('../controllers/MenuList');

router.post("/list" ,menuList);
router.post("/students", list);
router.post("/:mess", menuListVendor);


module.exports = router;