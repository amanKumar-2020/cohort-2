const jwt = require("jsonwebtoken")
require("dotenv").config();

async function authMiddleware(req,res,next) {
 console.log("Auth middleware running...");

    const token = req.cookies.token;
     console.log("Token:", token);
    if(!token){
        return res.status(401).json({
            message :"token is not provided , Unauthorized access"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);
    } catch (error) {
        return res.status(400).json({
            message :"User not authorized"
        })
    }
    req.user = decoded;
    next()
}
module.exports = authMiddleware;