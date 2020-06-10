module.exports = class ApiResponse{
    constructor(status, message, result){
        this.status = status;
        this.message = message;
        this.result = result;
    }
}