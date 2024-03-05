export const CreateSuccess = (statusCode, message, data)=>{
    const sucessObj = {
        status: statusCode,
        message: message,
        data: data
    }
    return sucessObj;
}