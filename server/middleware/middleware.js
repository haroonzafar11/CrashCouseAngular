const jwt = require('jsonwebtoken');
require('dotenv').config();
const constants = require('../util/constants');
const defaultResponse = require('../util/defaultResponse');
module.exports = (req, res, next) => {
    const token = req.headers['access-token'];
     if (token) {
        jwt.verify(token, process.env.SECERT, function(err, data) {
            if (err) {
                defaultResponse().error({message: constants.TOKEN_ERROR}, res, 400);
                return;
            }else{
                console.log(data);
                Object.assign(req, {userId: data.user,
                })
                next();
            }
        });

    } else {
        defaultResponse().error({message: constants.NO_TOKEN}, res, 400);
        return;

    }
}