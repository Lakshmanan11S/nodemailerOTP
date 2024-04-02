const express = require ('express');
const router = express.Router();
const usercontroler = require ("../controler/control.js")


router.post('/post',usercontroler.create);
router.post('/mail',usercontroler.verify)



module.exports = router;