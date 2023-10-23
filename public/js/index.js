// Toggle Hidden Menu
const mobileButton = document.querySelector("#mobile-button");
const mobileNavBar = document.querySelector("#mobile-menu");
const profileButton = document.querySelector("#user-menu-button");
const profileTabs = document.querySelector("#user-menu-tabs");

function setupToggle(buttonEl, navEl, toggleList) {
    let clickCount = 0;
    buttonEl.addEventListener("click", function (event) {
        event.preventDefault();
        navEl.classList = "";

        if (clickCount === 0) {
            navEl.classList.toggle("md:hidden");
            clickCount++;
        } else {
            toggleList.forEach((toggle) => {
                navEl.classList.add(toggle);
            });
            clickCount = 0;
        }
    });
}

function setUpToggle1(buttonEl, navEl) {
    buttonEl.addEventListener("click", function (event) {
        event.preventDefault();
         const isMdHidden = navEl.classList.contains("md:hidden");
         if (isMdHidden) {
             navEl.classList.remove("md:hidden");
         } else { 
             navEl.classList.add("md:hidden");
         }
    })
}



const mobileToggleClasses = ["hidden", "sm:hidden", "md:hidden"];
const profileToggleClasses = [
    "absolute",
    "right-0",
    "z-10",
    "mt-2",
    "w-48",
    "origin-top-right",
    "rounded-md",
    "bg-white",
    "py-1",
    "shadow-lg",
    "ring-1",
    "ring-black",
    "ring-opacity-5",
    "focus:outline-none",
];

setupToggle(mobileButton, mobileNavBar, mobileToggleClasses);
setupToggle(profileButton, profileTabs, profileToggleClasses);
// setUpToggle1(profileButton, profileTabs);