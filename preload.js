addEventListener("DOMContentLoaded", () => {
})
window.onload = function() {
    setTimeout(() => {
        let loader = document.getElementById("loader");
        let page = document.getElementById("page");
        loader.style.display = 'none';
        page.style.opacity = 1;
    }, 1000);  
}   
