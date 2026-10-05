# Leet2Git

A Chrome extension that saves LeetCode problems and solutions directly to GitHub.

## How it works

Open a LeetCode problem, write your solution, and press `Ctrl + S`.

The extension extracts:

- Problem title
- Problem description
- Solution code

and uploads it to the configured GitHub repository.

```text
LeetCode → Ctrl + S → Leet2Git → GitHub
```

## Setup

Clone the repository:

```bash
git clone https://github.com/Rohan216437/leet2git.git
cd leet2git
```

Open Chrome and go to:

```text
chrome://extensions
```

Enable **Developer mode**, select **Load unpacked**, and choose the project directory.

Configure your GitHub username and repository in `background.js`.

## Tech

- JavaScript
- Chrome Extension Manifest V3
- GitHub REST API

## Note

GitHub credentials should not be hard-coded or committed to the repository.

## Status

Early version. More features and language support will be added later.
