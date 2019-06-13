window.addEventListener("message", function (event) {
  if (event.origin != "https://platform.harvestapp.com") {
    return;
  }

  if (event.data.type == "frame:resize") {
    document.querySelector("iframe").style.height = event.data.value + "px";
  }
});