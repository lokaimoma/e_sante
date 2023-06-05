"use strict";

// applicable in mobile version
const mobNav = document.getElementById("mob-nav");
const navChlds = Array.from(mobNav.children)
const menuShell = navChlds[0];
const closeBtn = navChlds[1];
const menuContent = Array.from(menuShell.children[0].children);
let navOpen = false;
let timeout = undefined;


// close nav bar if menu item is clicked
Array.from(menuShell.children[0].children[1].children).forEach(link => {
  link.addEventListener('click', _ => {
    toggleMobNav();
  }, {passive: true})
})

function toggleMobNav() {
  if (timeout) {
    clearTimeout(timeout);
  }
  if (!navOpen) {
    if (mobNav) {
      mobNav.style.width = '100%';
      menuShell.style.width = '100%';
      // navChlds.forEach(chld => chld.classList.remove("hidden"));
      closeBtn.classList.remove("hidden");
      navOpen = true;
      document.body.style.overflow = "hidden";
      menuContent.forEach(el => el.classList.remove("hidden"))
      timeout = setTimeout(() => {
        menuContent.forEach(el => el.style.opacity = "1")
      }, 50);
    }
  } else {
    if (mobNav) {
      mobNav.style.width = '0%';
      menuShell.style.width = '0%';
      navOpen = false;
      // navChlds.forEach(chld => chld.classList.add("hidden"));
      closeBtn.classList.add("hidden");
      document.body.style.overflow = "";
      menuContent.forEach(el => el.style.opacity = "0")
      timeout = setTimeout(() => menuContent.forEach(el => el.classList.add("hidden")), 50)
    }
  }
}

