const message = document.querySelector("#message");
const cheerButton = document.querySelector("#cheer-button");

cheerButton.addEventListener("click", () => {
  message.textContent = "좋아요! 이번 주 웹 공부도 힘내봐요!";
});
