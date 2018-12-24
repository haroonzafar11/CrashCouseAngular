module.exports = () => {

    let resultErrorObject = {
        error: false,
        message: ""
    };

    let resultSuccessObject = {

    };

    return ({
        error: (error, res, status = 500) => {
            resultErrorObject.error = true;
            resultErrorObject.message = error.message;
            resultErrorObject.data = null;

            res.status(status).json(resultErrorObject);
        },

        success: (message, response, res, status) => {
            resultSuccessObject.error = false;
            resultSuccessObject.message = message;
            if(response == null){
                status = 201;
            }
            resultSuccessObject.data = response;
            res.status(status).json(resultSuccessObject);
        }
    })
}