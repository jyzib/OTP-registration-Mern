const express = require("express");
require('dotenv').config()
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
let otp = "";
const cors = require("cors")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const port = 8000;
const app = express();
app.use(cors())
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ msg: "ok" });
});


const connectData = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/registeration");
    console.log("Db connected");
  } catch (error) {
    console.log("Faild to connect ", error);
  }
};
connectData();

const User = require("./Models/user");
const generateotp = () => {
    const userOtp = () => {
      otp += Math.floor(Math.random() * 10);
    };
    for (let i = 0; i < 4; i++) {
      userOtp();
    }
  };


const sendAuthmail =async (email,name)=>{
    otp = ''
    generateotp()
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"jazibzaidi02@gmail.com",
        pass:process.env.EMAILPASSWORD
    }

})
const moreOption = {
  from: "Amazon.com",
  to: email,
  subject: "Email Verification",
  html: `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
            }
            .header {
              background-color: #007bff;
              color: #fff;
              padding: 20px;
              text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .otp {
              font-size: 24px;
                font-weight: bold;
                color: #007bff;
            }
            .footer {
              text-align: center;
              padding-top: 20px;
                color: #666666;
            }
            .footer-content {
                background-color: #f7f7f7;
                padding: 10px;
                border-radius: 0 0 8px 8px;
            }
            .footer-content p {
                margin: 5px 0;
            }
            .bold{
                  font-size: 19px;
    font-weight: bolder;
    color: #25013c;
            }
            </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
            <h2>Email Verification</h2>
            </div>
            <div class="content">
            <p class="bold">Hello,${name}</p>
                <p>Your OTP for email verification is: <span class="otp">${otp}</span></p>
                <p>Please use this OTP to verify your email address.</p>
                <img src="https://supertokens.com/covers/email_verification_blog_banner.png" alt="Verification Image" style="max-width: 100%; height: auto;">
            </div>
            <div class="footer">
                <div class="footer-content">
                    <p>Thank you for using our service,</p>
                    <p>Jyzib zaidi</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
};

// view engine: ejs


try {
    await transporter.sendMail(moreOption)
} catch (error) {
    console.log(error)
}
console.log(otp)
}

app.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const isExsit = await User.findOne({ email });
  console.log(name);
  if (isExsit) {
    return res.status(300).json({ msg: "email already exsist",responce: false , });
  }

const userdata = new User({ name, email, password :bcrypt.hashSync(password, saltRounds)});


  await userdata.save();  
  sendAuthmail(email,name)

  res.json({ responce: true ,id :userdata._id });
});

app.post('/otp',async(req,res)=>{
    const {_id,userotp} = req.body
    const datauser = await User.findOne({_id})
  if(otp == userotp && datauser  ){

      datauser.validated = true
      await datauser.save()
      otp = ''
      return res.json({msg:"otp succesfull",responce:true})
  }

res.json({msg:"Faild",responce:false})
})

app.listen(port, () => {
  console.log(`Server is running on port no ${port}`);
});

// to send the data t;o the client we have to send reqest to the client asap to send the data to the client then we might 