const jwt = require("jsonwebtoken")
require("dotenv").config();

async function authMiddleware(req,res,nest) {

    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message :"token is not provided , Unauthorized access"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(400).json({
            message :"User not authorized"
        })
    }
    res.user =decoded;
    nest()
}
module.exports = authMiddleware;