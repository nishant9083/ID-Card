const router = require("express").Router();
const auth = require("../middleware/userDetails");
const tokenValid = require("../middleware/personVerification");

router.post("/details", auth);
router.post("/person", tokenValid);

module.exports = router;