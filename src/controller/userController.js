const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")
const dotenv = require('dotenv'); // Import dotenv
dotenv.config(); 

const register = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      let data = req.body;
    
    //   moment.tz.setDefault('Asia/Kolkata');
    
    //   // Get the current date and time
    //   let date = moment().format('DD/MM/YYYY');
    //   let time = moment().format('HH:mm:ss');
    //   data.date = date;
    //   data.time = time;
      let saveData = await userModel.create(data);
      res.status(201).send({ status: true, data: saveData });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
}
//========================================================================================

const login = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      Data = req.body
      const { email, password } = Data;
      
      const isEmailExists = await userModel.findOne({ email: email });
      if (!isEmailExists)
        return res.status(401).send({ 
          status: false,
           message: 'User not found.' 
          });
    if(isEmailExists.password !==password){
        return res.status(401).send({ 
            status: false,
             message: "incorrect password" 
            });
    }
      // > Create Jwt Token
      const token = jwt.sign(
        { userID: isEmailExists._id?.toString() },
        process.env.Secret,
        { expiresIn: '1m' }
      );
  
      //  Make Respoense
      let result = {
        userID: isEmailExists._id?.toString(),
        token: token,
      };
     // console.log('Login done');
      res.status(200).send({ status: true,
         message: 'Login Successful', 
         data: result 
        });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };

module.exports = {register , login}