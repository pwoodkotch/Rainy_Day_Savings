// Toggle Hidden Menu & Profile Menu
const mobileButton = document.querySelector("#mobile-button");
const mobileNavBar = document.querySelector("#mobile-menu");
const profileButton = document.querySelector("#user-menu-button");
const profileTabs = document.querySelector("#user-menu-tabs");


function setUpToggle(buttonEl, navEl, targetClass) {
    buttonEl.addEventListener("click", function (event) {
        event.preventDefault();
         const isHidden = navEl.classList.contains(targetClass);
         if (isHidden) {
             navEl.classList.remove(targetClass);
         } else { 
             navEl.classList.add(targetClass);
         }
    })
}


setUpToggle(profileButton, profileTabs, "md:hidden");
setUpToggle(mobileButton, mobileNavBar, "hidden");