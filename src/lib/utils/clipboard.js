// This function must be called in a visible page, such as a action popup
// or a content script. Calling it in a background page has no effect!
let copyToClipboard = (text, html) => {
  let oncopy = (event) => {
    document.removeEventListener("copy", oncopy, true);
    // Hide the event from the page to prevent tampering.
    event.stopImmediatePropagation();

    // Overwrite the clipboard content.
    event.preventDefault();
    event.clipboardData.setData("text/plain", text);
    event.clipboardData.setData("text/html", html);
  };
  document.addEventListener("copy", oncopy, true);

  // Requires the clipboardWrite permission, or a user gesture:
  document.execCommand("copy");
};

export { copyToClipboard };
