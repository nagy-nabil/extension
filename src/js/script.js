"use strict";
// to get tags object synced in all files
// import tags from "./tags.js"
// console.log(tags)
async function removePost(tags){
    // console.log("enter")
    // let tags=await get_tags()
    try{
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
                // console.log(words)
                for(let i=0;i<words.length;++i){
                    if(words[i] in tags){
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
    }catch(err){
        console.log(err.message)
        return;
    }
}

export async function script(tags){
    try{//handle any uncaught errors
        // const mod= await import("./tags_mod/tags.js")
        // let tags= mod.default
        if(!tags) throw new Error("no tags")
        console.log("tags from script",tags)
        //listen to all the posible events
        document.addEventListener("scroll",()=>{
            removePost(tags)
        })
    }catch(err){
    console.log(err.message)
    }
}

// main()