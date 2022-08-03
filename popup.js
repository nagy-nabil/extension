 function changeValue(tags){
    console.log("enter")
    console.log("tags",tags)
    document.addEventListener("scroll",()=>{
        let all=document.querySelectorAll('[role="feed"]')[0]
        // console.log(all);
        for(let i=0;i<all.children.length;i++){
            let prevPost = all.children[i];
            let currentPost=prevPost;
            while(currentPost){
                currentPost = currentPost.children[0];
                // console.log(currentPost)
                if(!currentPost)break;
                if(currentPost.innerText.length>0){
                    // console.log(typeof currentPost.innerText)
                    // console.log(currentPost.innerText.includes(target))
                    let words=currentPost.innerText.split(" ");
                    for(let i=0;i<words.length;++i){
                        if(tags[words[i]]){
                            console.log(`Post ${currentPost} has been removed`)
                            prevPost.remove();
                            break;      
                        } 
                    }
                    // if(currentPost.innerText.includes(target)){
                    // console.log(`Post ${currentPost} has been removed`)
                    // prevPost.remove();
                    // break;}
                }
            }
        }
    })
    
}

async function start(){
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // console.log(tab)
    if(tab.url==="https://www.facebook.com/")
    {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: get_tags,
        })}
}




async function get_tags(){
    let result=await chrome.storage.sync.get("RMtags")//return promise
    console.log(result.RMtags)
    // result=await result.RMtags
    // console.log('result',result)
    changeValue(result.RMtags)
}
async function store_tag(name){
    chrome.storage.sync.set({RMtags:{[name]:true} }, function() {
        // console.log('Value is set to ' + value);
    });
}

start()
