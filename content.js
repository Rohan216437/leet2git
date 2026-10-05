function getProblemData() {
    // const titleElement = document.querySelector('div[data-cy="question-title"]');
    // const title = titleElement ? titleElement.innerText : "unknown_title";
    const title = getTitleFromURL();

    const descElement = document.querySelector('[data-track-load="description_content"]');
    const description = descElement ? descElement.innerText : "No Description";

    const codeElement = document.querySelector('.monaco-editor');
    let code = "";

    if (codeElement) {
        code = codeElement.innerText;
    }

    return { title, description, code };
}

function sendToBackground() {
    const data = getProblemData();

    chrome.runtime.sendMessage({
        type: "SEND_TO_GITHUB",
        payload: data
    });
}

window.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        sendToBackground();
        alert("Sending to GitHub 🚀");
    }
});

function getTitleFromURL() {
    const url = window.location.pathname;

    const parts = url.split('/').filter(Boolean);

    let slug = parts[1] || "unknown_title";

    const title = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

    return title;
}