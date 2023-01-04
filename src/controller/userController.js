const User = require( '../models/userModel' );
const { isValidObjectId } = require( '../validation/validate' )
const { isValidName, isValidEmail, isValidNumber, isValidPassword } = require( '../validation/adminValidate' )
const CryptoJS = require( "crypto-js" );
const jwt = require( 'jsonwebtoken' );
const dotenv = require( 'dotenv' );

dotenv.config( { path: './config.env' } );


const createUser = async ( req, res ) =>
{
    try
    {
        const data = req.body;


        let { fullName, email, mobile, password, confirmPassword } = data;
        console.log( data, "GHJDGJ" )
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
        const isEmailExist = await User.findOne( { email } )

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
            confirmPassword,
            mobile
        }
        const userData = await User.create( passData );

        return res.status( 201 ).send( { status: true, message: 'you signup successfully !', data: userData } )

    }
    catch ( err )
    {
        console.log( err )
        return res.status( 500 ).send( { status: false, message: err.message } )
    }

}


const loginUser = async ( req, res ) =>
{
    try
    {

        const data = req.body;
        let { email, password } = data;

        // email validation

        if ( !isValidEmail( email ) )
            return res.status( 400 ).send( { status: false, message: 'please enter a valid email !' } )

        // password Validation
        if ( !isValidPassword( password ) )
            return res.status( 400 ).send( { status: false, message: 'min length is 8 and max length 15 required !' } )

        const userData = await User.findOne( { email } ).lean();
        // console.log(adminData)

        if ( !userData )
            return res.status( 400 ).send( { status: false, message: 'email or password is incorrect' } )

        // password Decrypt
        const decryptPassword = CryptoJS.AES.decrypt( userData.password, 'secret key 123' );
        const confirmPass = decryptPassword.toString( CryptoJS.enc.Utf8 )

        if ( password !== confirmPass )
            return res.status( 400 ).send( { status: false, message: 'email or password is incorrect' } )

        const payload = {
            userId: userData._id.toString(),
            exp: Math.floor( Date.now() / 1000 ) + 24 * 60 * 60,
            iat: Math.floor( Date.now() / 1000 )
        }

        const token = jwt.sign( payload, process.env.JWT_SEC_KEY )

        userData[ 'token' ] = token;

        return res.status( 200 ).send( { status: true, message: 'Login successful !', data: userData } )

    }
    catch ( err )
    {
        return res.status( 500 ).send( { message: err.message } )
    }
}

const getUsers = async ( req, res ) =>
{
    try
    {
        const { userId } = req.params;
        if ( !isValidObjectId( userId ) )
            return res.status( 400 ).send( { status: false, message: 'Invalid AdminId !' } )

        const users = await User.find( { role: 'USER', isDeleted: false } )

        if ( users.length === 0 )
            return res.status( 400 ).send( { status: false, message: 'No User Found !' } );


        return res.status( 200 ).send( { status: true, message: "Admin find Successfully !", data: users, } );

    }
    catch ( err )
    {
        console.log( err )
        return res.status( 500 ).send( { status: false, message: err.message } );
    }
}

const updateUser = async ( req, res ) =>
{

    try
    {
        let { adminId, userId } = req.params;
        let { fullName, email, mobile, password } = req.body;
        let data = {};

        if ( !isValidObjectId( adminId ) && !isValidObjectId( userId ) )
            return res.status( 400 ).send( { status: false, message: 'Invalid Id !' } )

        if ( fullName )
        {
            if ( !isValidName( fullName ) )
                return res.status( 400 ).send( { status: false, message: 'please enter a valid name !' } )
            data[ 'fullName' ] = fullName;
        }

        if ( email )
        {
            if ( !isValidEmail( email ) )
                return res.status( 400 ).send( { status: false, message: 'please enter a valid email !' } )

            const isEmailExist = await User.findOne( { email } )
            if ( isEmailExist )
                return res.status( 409 ).send( { status: false, message: `${ email } is already registered please use different email` } )
            data[ 'email' ] = email;
        }

        if ( mobile )
        {
            if ( !isValidNumber( mobile ) )
                return res.status( 400 ).send( { status: false, message: 'please enter a valid indian Mobile number !' } )
            data[ 'mobile' ] = mobile;
        }

        if ( password )
        {
            if ( !isValidPassword( password ) )
                return res.status( 400 ).send( { status: false, message: 'min length is 8 and max length 15 required !' } )

            let encPassword = CryptoJS.AES.encrypt( password, 'secret key 123' ).toString();
            data[ 'password' ] = encPassword;
        }

        await User.findOneAndUpdate( { $and: [ { adminId }, { _id: userId } ] }, data, { new: true } );
        return res.status( 200 ).send( { status: true, message: "Member Updated Successfully !" } )

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, mesage: error.message } )
    }
}

const deleteUser = async ( req, res ) =>
{
    try
    {
        const { adminId, userId } = req.params;

        if ( !isValidObjectId( adminId ) || !isValidObjectId( userId ) )
            return res.status( 400 ).send( { status: false, message: 'Invalid Id !' } )

        const isUserExist = await User.findOne( { $and: [ { adminId }, { _id: userId }, { isDeleted: false } ] } );

        if ( !isUserExist )
            return res.status( 400 ).send( { status: false, mesage: "Sorry No Data Found !" } )

        await User.findByIdAndUpdate( userId, { isDeleted: true }, { new: true } );
        return res.status( 200 ).send( { status: true, message: "Member Deleted Successfully !" } )

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, mesage: error.message } )
    }
}




module.exports = { createUser, loginUser, getUsers, updateUser, deleteUser };