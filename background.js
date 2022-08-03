//we got object in the storage api to store tags in
//key tag=>value array
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({'RMtags':{S06:true}});
  console.log("default value set");
});


// //hopless try to run automatically
// chrome.runtime.addListener(() => {
//     // let x= document.getElementByClassName("gLFyf gsfi");
//     // console.log(x)
//     // x.setAttribute("text", "hi from extension")
//     console.log("listen")
//   });