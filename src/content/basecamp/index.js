import browser from "webextension-polyfill";
import showdown from "showdown";

browser.runtime.onMessage.addListener((r4a_message) => {
  let iframe = document.getElementsByClassName("wysihtml5-sandbox")[0];
  let frameBody = iframe.contentDocument.getElementsByTagName("body")[0];

  document.getElementById("message_subject").value = r4a_message.title;
  frameBody.innerHTML = new showdown.Converter().makeHtml(
    r4a_message.description
  );

  frameBody.classList.remove("placeholder");
});
