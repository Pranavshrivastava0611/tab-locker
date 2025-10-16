document.addEventListener("DOMContentLoaded", () => {
    const lockBtn = document.getElementById('lockBtn');
    const unlockBtn = document.getElementById('unlockBtn');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    // Check if locked
    chrome.storage.local.get("tabLock", (data) => {
        if (data.tabLock && data.tabLock.locked) {
            messageDiv.textContent = "🔒 Tab is locked. Enter password to unlock.";
        }
    });

    // Lock tabs
    lockBtn.addEventListener('click', () => {
        const password = passwordInput.value.trim();
        if (password) {
            chrome.storage.local.set({ tabLock: { locked: true, password: password } }, () => {
                chrome.runtime.sendMessage({ action: "lockTabs" });
                messageDiv.textContent = "🔒 Tabs locked!";
            });
        } else {
            messageDiv.textContent = "⚠️ Please enter a password.";
        }
    });

    // Unlock tabs
    unlockBtn.addEventListener('click', () => {
        const password = passwordInput.value.trim();
        chrome.storage.local.get("tabLock", (data) => {
            if (data.tabLock && data.tabLock.locked && data.tabLock.password === password) {
                chrome.storage.local.set({ tabLock: { locked: false } }, () => {
                    chrome.runtime.sendMessage({ action: "unlockTabs" });
                    messageDiv.textContent = "✅ Tabs unlocked!";
                });
            } else {
                messageDiv.textContent = "❌ Incorrect password.";
            }
        });
    });
});
