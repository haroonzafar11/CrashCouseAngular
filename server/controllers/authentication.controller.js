const User = require('../models/users.model');
const constants = require('../util/constants');
const defaultResponse = require('../util/defaultResponse');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const utils = require('../util/util');




exports.signIn = function (req, res) {
    let requestBody = req.body != null ? req.body : defaultResponse().error({message: constants.INVALID_BODY}, res, 400);
    req.checkBody('password',"Please provide password.").notEmpty();
    req.checkBody('username',"Please provide username.").notEmpty();
    let errorValidations = req.validationErrors();
    if (errorValidations) {
        defaultResponse().error({message: errorValidations[0].msg}, res, 200);
        return;
    }
    try{
    User.findOne({username:requestBody.username,available:true}).exec((error,user)=>{
        if(error){
            defaultResponse().error({message: error.message}, res, 400);
            return;
        }
        else{
            if(user){
            bcrypt.compare(requestBody.password, user.password, function(error, response) {
                if(error){
                    defaultResponse().error({message: err}, res, 400);
                    return;
                }
                if(response) {
                    //JWT - Success response
                    let token = jwt.sign({user: user._id}, process.env.SECERT, {});
                    let responseBack = new Object();
                    responseBack.user = user.toObject();
                    responseBack.user.token = token;
                    defaultResponse().success(constants.USER_SIGNEDIN, responseBack, res, 200);
                } else {
                    defaultResponse().error({message: constants.PASSOWRD_ERROR}, res, 200);
                    return;
                }
            });
            }else{
                defaultResponse().error({message: constants.USER_NOTFOUND}, res, 200);
                return;
            }
       
        
        }
    })
}
catch(exception){
    defaultResponse().error({message: exception}, res, 400);
    return;
}  

}


exports.createUser = function (req, res) {
    let requestBody = req.body != null ? req.body : defaultResponse().error({message: constants.INVALID_BODY}, res, 400);
    req.checkBody('password',"Please provide password.").notEmpty();
    req.checkBody('username',"Please provide username.").notEmpty();
    
    let errorValidations = req.validationErrors();
    if (errorValidations) {
        defaultResponse().error({message: errorValidations[0].msg}, res, 200);
        return;
    }
    try{
    let password = requestBody.password;
    bcrypt.hash(password, Number(process.env.SALT), function(error, hash) {
        if(error){
            defaultResponse().error({message: error.message}, res, 400);
            return;
        }
        else{
        requestBody.password = hash;
        requestBody.dob=new Date(requestBody.dob);
        let user = new User(
            requestBody);
        user.save().then((user) =>{
            defaultResponse().success(constants.USER_CREATED, user, res, 200);
             
        }).catch((error)=>{
            defaultResponse().error({message: error.message}, res, 200);
            return;
        })
        }
      });
    }
    catch(exception){
        defaultResponse().error({message: exception}, res, 400);
        return;
    }  
  
}
