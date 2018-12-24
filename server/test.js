bcrypt.hash(password, Number(process.env.SALT), function(error, hash) {
    if(error){
        defaultResponse().error({message: error.message}, res, 400);
        return;
    }
    else{
        User.findOneAndUpdate({email:requestBody.email},{password:hash}).exec();
    }
});
