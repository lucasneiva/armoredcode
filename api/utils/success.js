export const createSuccess = (statusCode, message, data)=>{
    const successObj = {
        status: statusCode,
        message: message,
        data: data
    }
    return successObj;
}