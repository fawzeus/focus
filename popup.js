var WebsiteUrl;
var WebsiteHostName;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    WebsiteUrl = tabs[0].url
    WebsiteHostName = new URL(tabs[0].url).hostname

    document.getElementById("url").innerText = WebsiteHostName
})

function ShowError(text) {
    var div = document.createElement('div');
    div.setAttribute('id', 'ERRORcontainer');
    div.innerHTML = `
                <div class="ERROR">
                    <p>${text}</p>     
                </div>`
    document.getElementsByClassName("bottomItem")[0].appendChild(div)

    setTimeout(() => {
        document.getElementById("ERRORcontainer").remove()
    }, 3000)
}

document.getElementById("btn").addEventListener("click", () => {

    if (WebsiteUrl.toLowerCase().includes("chrome://")) {
        ShowError("You cannot fuck a chrome URL")
    }
    else {
        chrome.storage.local.get("BlockedUrls", (data) => {
            if (data.BlockedUrls === undefined) {
                var then = new Date();
                const blockTill = then.getTime()
                chrome.storage.local.set({ BlockedUrls: [{ status: "BLOCKED", url: WebsiteHostName, BlockTill: blockTill }] })

            }
            else {
                if (data.BlockedUrls.some((e) => e.url === WebsiteHostName && e.status === "BLOCKED")) {
                    ShowError("This URL is completely fucked")
                }
                else {
                    var then = new Date();
                    const blockTill = then.getTime()
                    chrome.storage.local.set({ BlockedUrls: [...data.BlockedUrls, { status: "BLOCKED", url: WebsiteHostName, BlockTill: blockTill }] })
                    ShowError("start fucking the website")


                }
            }
        })

    }


})