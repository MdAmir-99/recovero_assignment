const adminModel = require('../models/adminModel');
const { isValidField, isValidObjectId, isValidLength } = require('../validation/validate');
const { isValidName, isValidEmail, isValidNumber, isValidPassword } = require('../validation/adminValidate')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../aws/awsFileUpload')
const dotenv = require('dotenv');

dotenv.config({path : './config.env'});


const createAdmin = async (req, res) => {
    try {
        const data = req.body;
        // console.log(req.body, "****************")
        // console.log(req.files);
        let profileImage = req.files;

        let { firstName, lastName, email, mobile, password, confirmPassword } = data;
        let passData = {};

        if (!firstName && !lastName && !email && !password && !confirmPassword && !mobile)
            return res.status(400).send({ status: false, message: 'Please fill mandetory fields !' })
        // FirstName
        if (!firstName)
            return res.status(400).send({ status: false, message: 'FirstName is Required !' })

        if (!isValidName(firstName))
            return res.status(400).send({ status: false, message: 'please enter a valid name !' })

        // lastName
        if (!lastName)
            return res.status(400).send({ status: false, message: 'LastName is Required !' })

        if (!isValidName(lastName))
            return res.status(400).send({ status: false, message: 'please enter a valid name !' })

        // email validation

        if (!email)
            return res.status(400).send({ status: false, message: 'Email is Required !' })

        if (!isValidEmail(email))
            return res.status(400).send({ status: false, message: 'please enter a valid email !' })
        // check Email exist or not
        const isEmailExist = await adminModel.findOne({ email })

        if (isEmailExist)
            return res.status(409).send({ status: false, message: `${email} is already registered please use different email` })


        if (!password)
            return res.status(400).send({ status: false, message: 'Please enter password !' })

        if (!isValidPassword(password))
            return res.status(400).send({ status: false, message: 'min length is 8 and max length 15 required !' })

        if (!confirmPassword)
            return res.status(400).send({ status: false, message: 'Please Confirm  your password !' })

        if (!isValidPassword(confirmPassword))
            return res.status(400).send({ status: false, message: 'min length is 8 and max length 15 required !' })

        if (password !== confirmPassword)
            return res.status(400).send({ status: false, message: 'please enter the same password !' })

        // mobile validation
        if (!mobile)
            return res.status(400).send({ status: false, message: 'Mobile Number is Required !' })

        if (!isValidNumber(mobile))
            return res.status(400).send({ status: false, message: 'please enter a valid indian Mobile number !' })

        if (profileImage && profileImage.length > 0) {
            if (profileImage[0].mimetype == "image/jpeg" || profileImage[0].mimetype == "image/jpg"
                || profileImage[0].mimetype == "image/png") {
                const uploaded = await uploadFile(profileImage[0]);
                profileImage = uploaded;
            }
            else {
                return res.status(400).send({ status: false, message: "Profile image should be in jpg, jpeg or png format !!" });
            }
        }
        else {
            profileImage = 'https://admin-dashboard123.s3.ap-south-1.amazonaws.com/profileImage.png'
        }



        // password encryption
        let encPassword = CryptoJS.AES.encrypt(password, 'secret key 123').toString();

        password = encPassword;

        delete data[confirmPassword];

        passData = {
            firstName,
            lastName,
            email,
            password,
            mobile,
            profileImage
        }

        const adminCreate = await adminModel.create(passData);

        return res.status(201).send({ status: true, message: 'you signup successfully !', data: adminCreate })

    }
    catch (err) {
        return res.status(500).send({ status: false, data: "dsajdhjsadh", message: err.message })
    }

}


const loginAdmin = async (req, res) => {
    try {

        const data = req.body;
        let { email, password } = data;

        // validation remaining
        // email validation

        if (!email)
            return res.status(400).send({ status: false, message: 'Email is Required !' })

        if (!isValidEmail(email))
            return res.status(400).send({ status: false, message: 'please enter a valid email !' })

        // password Validation
        if (!password)
            return res.status(400).send({ status: false, message: 'Please enter password !' })

        if (!isValidPassword(password))
            return res.status(400).send({ status: false, message: 'min length is 8 and max length 15 required !' })

        const adminData = await adminModel.findOne({ email }).lean();
        // console.log(adminData)

        if (!adminData)
            return res.status(400).send({ status: false, message: 'email or password is incorrect' })

        // password Decrypt
        const decryptPassword = CryptoJS.AES.decrypt(adminData.password, 'secret key 123');
        const confirmPass = decryptPassword.toString(CryptoJS.enc.Utf8)

        if (password !== confirmPass)
            return res.status(400).send({ status: false, message: 'email or password is incorrect' })

        const payload = {
            adminId: adminData._id.toString(),
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            iat: Math.floor(Date.now() / 1000)
        }

        const token = jwt.sign(payload, process.env.JWT_SEC_KEY)

        adminData['token'] = token;

        return res.status(200).send({ status: true, message: 'Login successful !', data: adminData })

    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const getAdmins = async (req, res) => {
    try {
        const adminDoc = await adminModel.find().count();

        if (adminDoc == 0)
            return res.status(400).send({ status: false, message: 'No Product Found !' });

        
        return res.status(200).send({ status: true, message: "Admin find Successfully !", data: adminDoc });

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

// Image Upload
// default Image kaise enable kre




module.exports = { createAdmin, loginAdmin, getAdmins };