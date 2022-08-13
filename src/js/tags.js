export async function get_tags(){
    try{
        let result=await chrome.storage.sync.get("RMtags")//return promise
        result=result.RMtags
        return result
    }catch(err) {
        console.log(err.message)
        return undefined;
    }
    // console.log(result.RMtags)
    // result=await result.RMtags
    // console.log('result',result)
    
    // console.log("after")
}
let tags =await get_tags()
export default  tags