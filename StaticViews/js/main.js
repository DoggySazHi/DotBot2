"use strict";

onInit();

function onInit() {
    fixNavbar();
    fixFooter();
    fixCopyright();
    console.info("Initialized main script!");
}

function fixNavbar() {
    let height = document.getElementsByTagName("nav")[0].offsetHeight;
    // Sometimes on reload, the browser reports wrong values (cached).
    document.querySelector(".nav-padding").style.height = Math.min(height, 70) + "px";
    document.querySelector(".nav-mobile-button").addEventListener("click", (e) => {
        e.preventDefault();
        toggleNav();
    })
}

function fixFooter() {
    let height = document.getElementsByTagName("footer")[0].offsetHeight;
    document.getElementsByClassName("footer-padding")[0].style.height = height + "px";
}

function fixCopyright() {
    document.getElementById("copyYear").innerHTML = "" + new Date().getUTCFullYear();
}

function toggleNav() {
    document.querySelector(".nav-container").classList.toggle("nav-mobile");
}

function getUrl(urlLink, params) {
    let url = new URL(window.location.origin + urlLink);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
}