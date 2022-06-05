// Error definitions
class ApiError {
    constructor(code, message){
        this.code = code;
        this.message = message;
    }

    static unauthorizedError(msg){
        return new ApiError(401, msg)
    }

    static forbiddenError(msg){
        return new ApiError(403, msg)
    }

    static badClientRequest (msg){
        return new ApiError(400, msg)
    }

    static internalNotSupportedError (msg){
        return new ApiError(500, msg)
    }
}

module.exports = ApiError;