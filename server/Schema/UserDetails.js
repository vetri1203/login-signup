import mongoose from 'mongoose'

const user = mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        eMail: {
            type: String,
            require: true
        },
        phoneNumber: {
            type: Number,
            require: true
        },
        password: {
            type: String,
            require:true
        }
    },
    { timestamps: true }
);

export const UserDetails = mongoose.model('userDetails', user);