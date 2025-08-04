document.addEventListener("DOMContentLoaded", () => {
  console.log("Sharmen JS starter loaded!");

  // Example: Load video on click
  const vid = document.querySelector("#promoVideo");
  document.querySelector("#playBtn").addEventListener("click", () => {
    vid.play();
  });
});
