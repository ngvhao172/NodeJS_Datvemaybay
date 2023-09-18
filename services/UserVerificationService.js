const nodemailer = require('nodemailer');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const userVerification = require('../models/UserVerification');
const {mongooseToObject} = require('../util/mongoose')

class UserVerificationService{
    findByUserId(userID){
        userVerification.findOne({userID})
        .then((result)=>{
            return mongooseToObject(result);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    delUserVerification(userID){
        userVerification.deleteOne({userID})
        .then(()=>{
            res.json({status: 200, message: "Deleted UserVerification successful"});
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    // sending mail 
    
    sendVerificationEmail = ({_id, email}, res) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const currentUrl = `http://localhost:${process.env.PORT}`;
        const uniqueString = uuidv4() + _id;
    
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Verify your email address to complete the signup and login into your account </p>. 
            <p>Press <a href=${currentUrl + "/verify/" + _id + "/" + uniqueString}> here </a> to proceed. </p>`
        }
        // hashed uniqueString
        bcrypt
        .hash(uniqueString, 10)
        .then((hasedUniqueString) => {
            const newUserVerification = new userVerification({
                userID: _id,
                uniqueString: hasedUniqueString,
                createdAt: Date.now(),
                expiredAt: Date.now() + 21600000
            })
            newUserVerification
                .save()
                .then(()=>{
                    transporter.sendMail(mailOptions)
                    .then(()=>{
                        console.log(`Verification mail has been sent to ${mailOptions.to}`);
                        res.json({
                            status: "Pending",
                            message: "Verification mail has been sent"
                        })
                    })
                    .catch((error)=>{
                        console.log(error)
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while sending email."
                        })
                    })
                })
                .catch((error)=>{
                    console.log(error)
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while insert new verification."
                    })
                })
        })
        .catch((error)=>{
            console.log(error)
            res.json({
                status: "FAILED",
                message: "An error occurred while hasing email data."
            })
        })
    }
}


module.exports = new UserVerificationService;


