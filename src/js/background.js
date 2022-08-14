//we got object in the storage api to store tags in
//key tag=>value array
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({'RMtags':{Welcome:true,
  "صاحبي":true,
"Harry":true,
"S06":true,
"time":true,
"pS5":true,
"bETEr":true}
});
});

