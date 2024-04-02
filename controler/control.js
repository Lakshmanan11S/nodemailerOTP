const express = require ('express');
const nodemailer = require ('nodemailer');
const usermodel = require ("../model/model.js");




exports.create = async (req, res) => {

    function generateOTP(limit) {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < limit; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

  
    const OTP = generateOTP(6);
    
    const userModel = new usermodel({
        from: process.env.USER_NAME,
        to: req.body.to,
        subject: req.body.subject,
        text: OTP 
    });

  
   const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        host: process.env.HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.USERPASS
        }
    });

    try {
        
        const info = await transporter.sendMail({
            from: userModel.from,
            to: userModel.to,
            subject: userModel.subject,
            text: `Your OTP is: ${OTP}` 
        });

     
        await userModel.save();

        console.log('Email sent:', info.response);
        res.status(200).json({ message: "Mail sent successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error sending email' });
    }
};

exports.verify = async(req,res)=>{
    try{
        const username = req.body.USER_NAME
        const text= req.body.text
        const userFound = await usermodel.findOne({from:username})
        console.log("userFound:",userFound)
        if(!userFound){
            return res.status(500).send("username is not found")
        }
     
        if(text ===userFound.text){
           return res.status(200).json({message:"otp verification successfully"}) 
        }else{
            return res.status(500).json({message:"otp not verification"})
        }
    }
    catch(error){
            return res.status(500).send ("server error")
    }
    
}
