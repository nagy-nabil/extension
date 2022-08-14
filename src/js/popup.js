// to get tags object synced in all files
import tags,{set_tags} from "./tags.js"
import {script} from "./script.js"

//function to set datalist values when start the extension
function setupUI(tags){
    try{
        let list=document.getElementById("tags");
        if(!list) throw new Error("no list to append in")
        for(let key in tags){
            let tag=document.createElement("option")
            tag.value=key;
            list.appendChild(tag)
        }
    }catch(err){
        console.error(err.message)
    }
    
}
//function to add one elemnt to the datalist
function addElement(val){
    try{
        if(tags[val]) throw new Error("tag already exist")
        let list=document.getElementById("tags");
        if(!list) throw new Error("no list to append in")
        let tag=document.createElement("option")
        if(!tag) throw new Error("no option")
        tag.value=val;
        list.appendChild(tag)
        tags[val]=true
        set_tags(tags)
    }catch(err){
        console.error(err.message)
    }
}
//function to remove one element from datalist
function removeElement(val){
    try{
        if(!tags[val]) throw new Error("no such option to delete")
        let opt=document.querySelector(`[value=${val}]`)
        if(!opt) throw new Error("wrong option!")
        opt.remove()
        delete tags[val]
        set_tags(tags)
    }catch(err){
        console.error(err.message)
    }
}

async function main(){
    try{//handle any uncaught errors
        //get html for events
        const addBtn= document.getElementById("addBtn")
        if(!addBtn) throw new Error("no add Button")
        const removeBtn=document.getElementById("removeBtn");
        if(!removeBtn) throw new Error("no remove Button")
        const entry=document.getElementById("entry")
        if(!entry) throw new Error("no input")
        //set the ui for the extension
        setupUI(tags);
        //listen to all the posible events
        addBtn.addEventListener("click",()=>{
            addElement(entry.value)
        })
        removeBtn.addEventListener("click",()=>{
            removeElement(entry.value)
        })
    }catch(err){
    console.log(err.message)
    }
}
function test(){
    console.log("hjk")
}
async function scriptInject (){
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if(tab.url==="https://www.facebook.com/"){
    //   console.log("im here")
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            // files: ["src/js/script.js"],//file path must be relative to manifest
            function:script,
            args:[tags]
        });
    }
}


main()
console.log(tags)
scriptInject()