const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")
const helpers = {}

helpers.generateRandomString = (length) => {
    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;
    randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters[Math.floor(Math.random() * (charactersLength - 1))];
    }
    return randomString;
}

helpers.validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

helpers.encryptPassword = async (password)=>{

    const hash = await bcrypt.hash(password, 10)
    return hash
}

helpers.matchPassword = async (password,savedPassword)=>{
    try {
        if (bcrypt.compare(password,savedPassword)) {
            return true
        } else {
            return false
        } 
    } catch (err) {
        console.log(err);
        return false;
    }
};

helpers.mailSender = async (newMail)=>{

    var transporter =  nodemailer.createTransport({
        host: 'in-v3.mailjet.com',
        port: 587,
        secure:false,
        auth: {
            user: 'f05b5479397d8df0c1e798cf3dfd45b4',
            pass: 'cae0b50be7b5fa194dfc7f79ca078e25'
        },
        tls:{
            rejectUnauthorized:false
        }

    });
    const mailOptions = {
        from: '"Name of the website" <terceroderek@gmail.com>', // sender address
        to: newMail.to, // list of receivers
        subject: newMail.subject, // Subject line
        html: newMail.body // html body
    };
    await transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.log(err)
            return false
        }
        
        console.log(info);
        return true
    });

}

module.exports = helpers;