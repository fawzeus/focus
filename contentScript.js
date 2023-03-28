function CloseTab() {
    alert("this website is completely fucked and you can't use it today, so fuck off and do your job")
    chrome.runtime.sendMessage({ CloseMe: true })
}

//chrome.storage.local.set({ BlockedUrls: [] })

const oneday = 86400000;
//const oneday = 60000;
/*
chrome.storage.local.get("BlockedUrls", (data) => {
    data.BlockedUrls.forEach((e, index) => {
        if (e.status === 'BLOCKED' && e.BlockTill + oneday <= now_ms) {
            var arr = data.BlockedUrls.splice(index, 1);

            chrome.storage.local.set({ BlockedUrls: arr })
        }
    })
})*/

chrome.storage.local.get("BlockedUrls", (data) => {
    if (data.BlockedUrls !== undefined) {
        var now = new Date();
        var now_ms = now.getTime()
        if (data.BlockedUrls.some((e) => e.url === window.location.hostname && (e.status === "BLOCKED" && e.BlockTill + oneday >= now_ms))) {
            CloseTab();
        }
    }
})


chrome.storage.local.get("BlockedUrls", (data) => {
    if (data.BlockedUrls !== undefined) {
        var now = new Date();
        var now_ms = now.getTime()
        if (data.BlockedUrls.some((e) => e.status === "BLOCKED" && e.BlockTill + oneday < now_ms)) {
            chrome.storage.local.set({ BlockedUrls: [] })
        }
    }
})




