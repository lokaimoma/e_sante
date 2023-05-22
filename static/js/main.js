"use strict";

const mobNav = document.getElementById("mob-nav");
const navChlds = Array.from(mobNav.children)
let navOpen = false;

function toggleMobNav() {
  if (!navOpen) {
    if (mobNav) {
      mobNav.style.width = '100%';
      navChlds.forEach(chld => chld.classList.remove("hidden"));
      navOpen = true;
      document.body.style.overflow = "hidden";
    }
  } else {
    if (mobNav) {
      mobNav.style.width = '0%';
      navOpen = false;
      navChlds.forEach(chld => chld.classList.add("hidden"));
      document.body.style.overflow = "";
    }
  }
}

