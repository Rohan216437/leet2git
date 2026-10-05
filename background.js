const GITHUB_TOKEN = "";
const USERNAME = "Rohan216437";
const REPO = "leetcode-solutions";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SEND_TO_GITHUB") {
        pushToGitHub(message.payload);
    }
});

async function getFileSHA(fileName) {
    const url = `https://api.github.com/repos/${USERNAME}/${REPO}/contents/${fileName}`;

    try {
        const res = await fetch(url, {
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`
            }
        });

        if (res.status === 200) {
            const data = await res.json();
            return data.sha;
        }
    } catch (e) {
        console.log("SHA fetch error:", e);
    }

    return null;
}

async function pushToGitHub(data) {
    const { title, description, code } = data;

    const fileName = title
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase() + ".js";

    const content = `
/*
${title}
/*
${description}
*/

${code}
`;

    const encodedContent = btoa(unescape(encodeURIComponent(content)));

    const url = `https://api.github.com/repos/${USERNAME}/${REPO}/contents/${fileName}`;

    try {
        const sha = await getFileSHA(fileName);

        const bodyData = {
            message: `Add solution for ${title}`,
            content: encodedContent
        };

        if (sha) {
            bodyData.sha = sha;
        }

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        });

        const result = await response.json();
        console.log("Uploaded:", result);

    } catch (err) {
        console.error("Error:", err);
    }
}