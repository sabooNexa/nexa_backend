const jwt = require("jsonwebtoken")
const dotenv = require('dotenv'); // Import dotenv
dotenv.config(); 

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["authorization"]
        if (!token) { return res.status(401).send({ message: "required token" }) }
        let splittoken = token.split(' ') //converting into array
        // decoding token  
        jwt.verify(splittoken[1], process.env.Secret
            , (err, decoded) => {
                if (err) {
                    return res
                        .status(401)
                        .send({ status: false, message: err.message });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
    } catch (error) {
        res.status(500).send({ status: false, message: err.message })
    }
}
module.exports ={authentication}