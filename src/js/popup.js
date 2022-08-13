// to get tags object synced in all files
import tags from "./tags.js"
import {script} from "./script.js"
function setupUI(tags){
    let list=document.getElementById("tags");
    if(!list)console.log(list)
    for(let key in tags){
        let tag=document.createElement("option")
        tag.value=key;
        list.appendChild(tag)
    }
}

async function store_tag(tags){
    chrome.storage.sync.set({RMtags:tags}, function() {
        // console.log('Value is set to ' + value);
    });
}

async function main(){
    try{//handle any uncaught errors
        //get buttons for events
        const addBtn= document.getElementById("addBtn")
        // console.log(addBtn)
        if(!addBtn) throw new Error("no add Button")
        // const removeBtn=document.getElementById("removeBtn");
        // if(!removeBtn) throw new Error("no remove Button")
        //laod the tags first
        // let tags=await get_tags();
        //set the ui for the extension
        setupUI(tags);
        //listen to all the posible events
        // addBtn.onclick=()=>console.log("dgfh")
    }catch(err){
    console.log(err.message)
    }
}
async function scriptInject (){
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if(tab.url==="https://www.facebook.com/"){
    //   console.log("im here")
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            // files: ["src/js/script.js"],//file path must be relative to manifest
            func:script,
            args:[tags]
        });
    }
}


main()
console.log(tags)
script()