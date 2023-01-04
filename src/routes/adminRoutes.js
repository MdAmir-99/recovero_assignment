const express = require( 'express' );
const router = express.Router();
const { createAdmin, loginAdmin, getAdmins } = require( '../controller/adminController' );


// Admin Api's

router.post( '/register', createAdmin )
router.post( '/Login', loginAdmin )
router.get( '/', getAdmins )


module.exports = router;