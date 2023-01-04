const { Schema, model } = require( 'mongoose' );
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema( {
    fullName: {
        type: String,
        required: true,
        maxLength: 20,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxLength: 10
    },
    // adminId: {
    //     type: ObjectId,
    //     ref: 'admin',
    //     required: true
    // },
    isDeleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'ADMIN',
        enum: [ 'ADMIN', "USER" ]
    }
}, { timestamps: true } )

module.exports = model( 'user', userSchema )