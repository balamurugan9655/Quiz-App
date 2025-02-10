const APIrequest = async (url='' , optionObj=null,errMsg=null) => {
    try{
        const response = await fetch(url)
        if(!response.ok) throw Error("please reload the app")
    } catch (err) {
        errMsg = err.message
    } finally {
        return errMsg
    }
}
export default APIrequest;