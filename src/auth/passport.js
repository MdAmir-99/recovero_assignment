const JwtStrategy = require( "passport-jwt" ).Strategy;
const ExtractJwt = require( "passport-jwt" ).ExtractJwt;
const userModel = require( '../models/userModel' )
const dotenv = require( 'dotenv' );
dotenv.config( {
    path: './config.env'
} )
module.exports = function ( passport )
{

    passport.use(
        new JwtStrategy(
            {
                secretOrKey: process.env.JWT_SEC_KEY,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

            },
            function ( jwt_payload, done )
            {
                console.log( jwt_payload )
                userModel.findOne( { _id: jwt_payload.userId }, function ( err, user )
                {
                    if ( err )
                    {
                        return done( null, false )
                    }
                    if ( user )
                    {
                        return done( null, user )
                    }
                    else
                    {
                        return done( null, false )
                    }
                } )
            }
        )
    )
}