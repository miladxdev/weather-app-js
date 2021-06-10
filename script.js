const loader = document.querySelector("#loading");
// showing loading
export function displayLoading() {
  loader.classList.add("display");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
  }, 15000);
}

// hiding loading
export function hideLoading() {
  loader.classList.remove("display");
}

// error message
export function errorText(message) {
  const status = document.getElementById("status");
  status.style.opacity = "1";
  status.innerHTML = message;
  setTimeout(() => (status.style.opacity = "0"), 4000);
}

// export function newDataAnimate() {
//   const details = document.querySelectorAll(".details span");
//   for (let i = 0; i < details.length; i++) {
//     details[i].style.color = "lime";
//     setTimeout(() => (details[i].style.color = "white"), 500);
//   }
// }

export function animateNewData() {
  const details = document.querySelectorAll(".details > div");
  for (let i = 0; i < details.length; i++) {
    details[i].style.opacity = "0.1";
    setTimeout(() => (details[i].style.opacity = "1"), 400);
  }
}
