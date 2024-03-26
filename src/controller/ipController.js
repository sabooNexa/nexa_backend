const ipModel = require("../model/ipModel")


const moment = require("moment");
require("moment-timezone");
const saveIp = async (req,res)=>{
    try {
        
        let data = req.body;

        moment.tz.setDefault("Asia/Kolkata");
        let dates = moment().format("YYYY-MM-DD");
        let times = moment().format("HH:mm:ss");
        data.date = dates;
        data.time = times;
        let savedata = await ipModel.create(data);
       return res.status(201).send({ status: true, data: savedata });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


const getip = async (req,res)=>{
    try {
        let data = await ipModel.find()
        res.status(200).send({status:true,data:data})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {saveIp, getip}