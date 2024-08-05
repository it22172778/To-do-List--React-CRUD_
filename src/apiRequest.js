const apiRequest = async (url='' , optionnsObject = null, errMsg = null) => {
    try {
        const response = await fetch(url , optionnsObject)
        if(!response.ok){
            throw Error("Please Reload the app")
        }
        
    } catch (err) {
        errMsg = err.message
        
    } finally{
        return errMsg

    }
    
}
export default apiRequest