const loader = document.querySelector("#loading");
// showing loading
export function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 10000);
}

// hiding loading 
export function hideLoading() {
    loader.classList.remove("display");
}