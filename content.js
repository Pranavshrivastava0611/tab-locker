chrome.storage.local.get("tabLock", (data) => {
    if (data.tabLock && data.tabLock.locked) {
        // Disable user interaction
        document.body.style.pointerEvents = "none";
        document.body.style.userSelect = "none";

        // Show overlay message
        const overlay = document.createElement("div");
        overlay.textContent = "🔒 This tab is locked!";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.background = "rgba(0, 0, 0, 0.8)";
        overlay.style.color = "white";
        overlay.style.fontSize = "24px";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "9999";

        document.body.appendChild(overlay);
    }
});
