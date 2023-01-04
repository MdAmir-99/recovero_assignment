const express = require( 'express' );
const router = express.Router();
const { createUser, loginUser, getUsers, updateUser, deleteUser, roleHandler } = require( '../controller/userController' );
var passport = require( 'passport' )
require( "../auth/passport" )( passport )

// User Api's

// router.post( '/:adminId', passport.authenticate( 'jwt', { session: false } ), createUser )
router.post( '/register', createUser )
router.post( '/login', loginUser )
router.get( '/:userId', getUsers, passport.authenticate( 'jwt', { session: false } ) )
router.put( '/:userId', passport.authenticate( 'jwt', { session: false } ), updateUser );
router.delete( '/:userId', passport.authenticate( 'jwt', { session: false } ), deleteUser );

module.exports = router;    