const message = document.querySelector("#message");
const cheerButton = document.querySelector("#cheer-button");

let buttonnum = 0;

cheerButton.addEventListener("click", function () {
  if (buttonnum === 0) {
    message.textContent = "좋아요! 작은 코드부터 직접 바꾸어 봅시다. 🚀";
    buttonnum = 1;
  } else if (buttonnum === 1) {
    message.textContent = "한 번 더 도전해 봅시다! 💪";
    buttonnum = 0;
  }
});