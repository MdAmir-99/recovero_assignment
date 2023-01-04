const adminModel = require( '../models/adminModel' );
const { isValidName, isValidEmail, isValidNumber, isValidPassword } = require( '../validation/adminValidate' )
const CryptoJS = require( "crypto-js" );
const jwt = require( 'jsonwebtoken' );
const dotenv = require( 'dotenv' );

dotenv.config( { path: './config.env' } );


const createAdmin = async ( req, res ) =>
{
    try
    {
        const data = req.body;

        let { fullName, email, mobile, password, confirmPassword } = data;
        let passData = {};

        if ( !fullName && !email && !password && !confirmPassword && !mobile )
            return res.status( 400 ).send( { status: false, message: 'Please fill mandetory fields !' } )
        // FirstName

        if ( !isValidName( fullName ) )
            return res.status( 400 ).send( { status: false, message: 'please enter a valid name !' } )


        // email validation

        if ( !isValidEmail( email ) )
            return res.status( 400 ).send( { status: false, message: 'please enter a valid email !' } )
        // check Email exist or not
        const isEmailExist = await adminModel.findOne( { email } )

        if ( isEmailExist )
            return res.status( 409 ).send( { status: false, message: `${ email } is already registered please use different email` } )


        if ( !isValidPassword( password ) )
            return res.status( 400 ).send( { status: false, message: 'min length is 8 and max length 15 required !' } )

        if ( !isValidPassword( confirmPassword ) )
            return res.status( 400 ).send( { status: false, message: 'min length is 8 and max length 15 required !' } )

        if ( password !== confirmPassword )
            return res.status( 400 ).send( { status: false, message: 'please enter the same password !' } )

        // mobile validation

        if ( !isValidNumber( mobile ) )
            return res.status( 400 ).send( { status: false, message: 'please enter a valid indian Mobile number !' } )



        // password encryption
        let encPassword = CryptoJS.AES.encrypt( password, 'secret key 123' ).toString();

        password = encPassword;

        passData = {
            fullName,
            email,
            password,
            mobile,
        }

        const adminCreate = await adminModel.create( passData );

        return res.status( 201 ).send( { status: true, message: 'you signup successfully !', data: adminCreate } )

    }
    catch ( err )
    {
        return res.status( 500 ).send( { status: false, data: "dsajdhjsadh", message: err.message } )
    }

}


const loginAdmin = async ( req, res ) =>
{
    try
    {

        const data = req.body;
        let { email, password } = data;

        // validation remaining
        // email validation

        if ( !isValidEmail( email ) )
            return res.status( 400 ).send( { status: false, message: 'please enter a valid email !' } )

        // password Validation

        if ( !isValidPassword( password ) )
            return res.status( 400 ).send( { status: false, message: 'min length is 8 and max length 15 required !' } )

        const adminData = await adminModel.findOne( { email } ).lean();
        // console.log(adminData)

        if ( !adminData )
            return res.status( 400 ).send( { status: false, message: 'email or password is incorrect' } )

        // password Decrypt
        const decryptPassword = CryptoJS.AES.decrypt( adminData.password, 'secret key 123' );
        const confirmPass = decryptPassword.toString( CryptoJS.enc.Utf8 )

        if ( password !== confirmPass )
            return res.status( 400 ).send( { status: false, message: 'email or password is incorrect' } )

        const payload = {
            adminId: adminData._id.toString(),
            exp: Math.floor( Date.now() / 1000 ) + 24 * 60 * 60,
            iat: Math.floor( Date.now() / 1000 )
        }

        const token = jwt.sign( payload, process.env.JWT_SEC_KEY )

        adminData[ 'token' ] = token;

        return res.status( 200 ).send( { status: true, message: 'Login successful !', data: adminData } )

    }
    catch ( err )
    {
        return res.status( 500 ).send( { message: err.message } )
    }
}

const getAdmins = async ( req, res ) =>
{
    try
    {
        const adminDoc = await adminModel.find().count();

        if ( adminDoc == 0 )
            return res.status( 400 ).send( { status: false, message: 'No Product Found !' } );


        return res.status( 200 ).send( { status: true, message: "Admin find Successfully !", data: adminDoc } );

    }
    catch ( err )
    {
        return res.status( 500 ).send( { status: false, message: err.message } );
    }
}


module.exports = { createAdmin, loginAdmin, getAdmins };