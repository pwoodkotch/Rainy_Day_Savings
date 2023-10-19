// Toggle Hidden Menu
const mobileButton = document.querySelector("#mobile-button");
const mobileNavBar = document.querySelector("#mobile-menu");

let clickCount = 0;
mobileButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (clickCount === 0) {
        mobileNavBar.classList = "";
        mobileNavBar.classList.toggle("md:hidden");
        clickCount++;
    } else {
        mobileNavBar.classList = "";
        mobileNavBar.classList.toggle("hidden");
        mobileNavBar.classList.toggle("sm:hidden");
        mobileNavBar.classList.toggle("md:hidden");

        clickCount = 0;
    }
});
