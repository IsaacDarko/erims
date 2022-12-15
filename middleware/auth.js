const config = require('config');
const jwt = require('jsonwebtoken');



function auth(req, res, next){
   
    const token = req.header('x-auth-token');

    //Check for token
    if(!token)  res.status(200).json({
        msg: "No token: User Unauthorized",
        auth: false
    })
    //Verify token if one is found    
    try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //Add user from payload
    req.user = decoded;
    next();
    }catch(e){
        res.status(200).json({msg : "token is not valid"})
    }

}

module.exports = auth;