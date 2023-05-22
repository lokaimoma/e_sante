"use strict";

// applicable in mobile version
const mobNav = document.getElementById("mob-nav");
const menuShell = document.getElementById("menushell")
const navChlds = Array.from(mobNav.children)
const closeBtn = navChlds[1];
let navOpen = false;

function toggleMobNav() {
  if (!navOpen) {
    if (mobNav) {
      mobNav.style.width = '100%';
      menuShell.style.width = '100%';
      // navChlds.forEach(chld => chld.classList.remove("hidden"));
      closeBtn.classList.remove("hidden");
      navOpen = true;
      document.body.style.overflow = "hidden";
    }
  } else {
    if (mobNav) {
      mobNav.style.width = '0%';
      menuShell.style.width = '0%';
      navOpen = false;
      // navChlds.forEach(chld => chld.classList.add("hidden"));
      closeBtn.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }
}

