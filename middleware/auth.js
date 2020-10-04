const jwt = require('jsonwebtoken');
const config = require('config');

//the way middlewares work is that they have access to requests and responses
//and the also have the ability to have a next (call back) parameter which points to
//the next middleware function that needs to be called
module.exports = function (req, res, next) {
    //get token from the header
    //whenever we send a user to a protected route
    //we pass along the JWT in the header
    //x-auth-token => the key that holds the token
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: "No token found, unauthorized access" })
    }

    //Verify token
    try {
        //takes the token and the key and decodes the token
        //checks whether it is a valid token
        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode.user;
        //we've just decoded the encrypyed user id stored in the jwt token
        //we can now use it to route to a specific user's profile or other routes
        //we've just stored the user id in the request
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token not valid" });
    }
}