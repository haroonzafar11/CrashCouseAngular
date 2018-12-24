const User = require('../models/users.model');
const constants = require('../util/constants');
const defaultResponse = require('../util/defaultResponse');
const bcrypt = require('bcryptjs');

exports.getAll = function (req, res) {
try{
    
User.find({available:true}).exec((error,users)=>{
    if(error){
        defaultResponse().error({message: error.errmsg}, res, 400);
        return;
    }
    else{
        defaultResponse().success(constants.DATA_RETRIEVED, users, res, 200);
    }
});

}
catch(exception){
    defaultResponse().error({message: exception}, res, 400);
    return;
}  
}

exports.get = function (req, res) {
    try{
    User.findById(req.params.id).exec((error,user)=>{

        if(error){
            defaultResponse().error({message: error.errmsg}, res, 400);
            return;
        }
        else{
           defaultResponse().success(constants.DATA_RETRIEVED, user, res, 200);
        }

    });
       

}
catch(exception){
    defaultResponse().error({message: exception}, res, 400);
    return;
}  
}

exports.delete = function (req, res) {
    try{
        console.log(":jisdfk");
    console.log(req.params);
     console.log(req.params.id);
    User.findByIdAndUpdate(req.params.id,{available:false},(error,user)=>{
        if(error){
            defaultResponse().error({message: error.errmsg}, res, 400);
            return;
        }
        else{
            defaultResponse().success(constants.DATA_DELETED, user, res, 200);
        }
    })
}
catch(exception){
    defaultResponse().error({message: exception}, res, 400);
    return;
}  
}

exports.update = function (req, res) {
    let requestBody = req.body != null ? req.body : defaultResponse().error({message: constants.INVALID_BODY}, res, 400);
    try{
    User.findByIdAndUpdate(req.userId,requestBody,(error,user)=>{
        if(error){
            defaultResponse().error({message: error.errmsg}, res, 400);
            return;
        }
        else{
            defaultResponse().success(constants.DATA_UPDATED, user, res, 200);
        }
    })
}
catch(exception){
    defaultResponse().error({message: exception}, res, 400);
    return;
}  
}

exports.changePasswordAdmin = function (req, res) {
    let requestBody = req.body != null ? req.body : defaultResponse().error({message: constants.INVALID_BODY}, res, 400);
    req.checkBody('password',"Please provide password.").notEmpty();
    
    let errorValidations = req.validationErrors();
    if (errorValidations) {
        defaultResponse().error({message: errorValidations[0].msg}, res, 400);
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
        password = hash;
        User.findOneAndUpdate({email:req.params.email},{password:password},(error,user)=>{
            if(error){
                defaultResponse().error({message: error.errmsg}, res, 400);
                return;
            }
            else{
                if(user){
               defaultResponse().success(constants.DATA_UPDATED, user, res, 200);
                }
                else{
                    defaultResponse().error({message: constants.USER_NOTFOUND}, res, 400);
                    return;
                }
            }
        })
        }
      });
    }
    catch(exception){
        defaultResponse().error({message: exception}, res, 400);
        return;
    }  
    
}

exports.changePassword = function (req, res) {
    let requestBody = req.body != null ? req.body : defaultResponse().error({message: constants.INVALID_BODY}, res, 400);
    req.checkBody('password',"Please provide password.").notEmpty();
    req.checkBody('oldpassword',"Please provide old password.").notEmpty();
    let errorValidations = req.validationErrors();
    if (errorValidations) {
        defaultResponse().error({message: errorValidations[0].msg}, res, 400);
        return;
    }
   try{
    User.findOne({email:req.params.email},(error,user)=>{
        if(error){
            defaultResponse().error({message: error.errmsg}, res, 400);
            return;
        }
        else{
            if(user){
            bcrypt.compare(requestBody.oldpassword, user.password, function(err, response) {
                if(response) {
                    let password = requestBody.password;
                    bcrypt.hash(password, Number(process.env.SALT), function(error, hash) {
                        if(error){
                            defaultResponse().error({message: error.message}, res, 400);
                            return;
                        }
                        else{
                        password = hash;
                        User.findOneAndUpdate({email:req.params.email},{password:password},(error,user)=>{
                         if(error){
                            defaultResponse().error({message: error.errmsg}, res, 400);
                            return;
                          }
                          else{
                         defaultResponse().success(constants.PASSWORD_UPDATED, user, res, 200);
                         }
                    })
                        }
                      });
                } else {
                    defaultResponse().error({message: constants.PASSOWRD_MISMATCH}, res, 400);
                    return;
                }
            });
            }else{
                defaultResponse().error({message: constants.USER_NOTFOUND}, res, 400);
                return;
            }
        }
    });
}
catch(exception){
    defaultResponse().error({message: exception}, res, 400);
    return;
}   
}
