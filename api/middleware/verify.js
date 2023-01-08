const jwt = require('jsonwebtoken');


async function verifyToken(req,res,next) {

    try {
        const token = await req.headers.authorization.split(" ")[1]
    
        const verify =  jwt.verify(token,process.env.JWT_SECRET_KEY);

        req.token =  verify
        next()
    } catch (error) {
        return res.status(401).json({
            message:'Authentication failed'
        })
    }
}

 
module.exports = verifyToken;