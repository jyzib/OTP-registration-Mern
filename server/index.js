const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
let otp = "";
const cors = require("cors")

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


const sendAuthmail =async (email)=>{
    otp = ''
    generateotp()
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"jazibzaidi02@gmail.com",
        pass:"tsjm fjqu ymwy fqcx"
    }

})


const moreOption = {
    from:"Amazon.com",
    to:email,
    subject:"Email varification",
    text:`Your otp is ${otp}`
}
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
  const userdata = new User({ name, email, password });
  await userdata.save();
  sendAuthmail(email)

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
