chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "lockTabs") {
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["content.js"]
                });
            });
        });
    } else if (message.action === "unlockTabs") {
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => {
                        document.body.style.pointerEvents = "auto";
                        document.body.style.userSelect = "auto";
                        const overlay = document.querySelector("div[style*='9999']");
                        if (overlay) overlay.remove();
                    }
                });
            });
        });
    }
});
