let element;
document.addEventListener("load", () => {
  element = document.getElementById("elemId");
});
const autoClicker = setInterval(() => {
  try {
    element.click();
  } catch (err) {
    console.error("Autoclicker not working, canceling now...");
    clearInterval(autoClicker);
    console.info("Autoclicker canceled.");
  }
}, 1);