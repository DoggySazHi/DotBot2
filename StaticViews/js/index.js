"use strict";

let status = 0;
let textTimer = null;
let cursorTimer = null;

onIndexInit();

function onIndexInit() {
    textTimer = setInterval(changeText, 60)
    cursorTimer = setInterval(blinkCursor, 500)
    addEventListener("resize", computeHeight);
    setTimeout(computeHeight, 0);

    console.info("Initialized index script!");
}

let blink = false;

const words = ["Hi.", " I'm William Le."]
let charIndex = 0;
let wordIndex = 0;
let delay = 10;

function changeText() {
    let header = document.getElementsByTagName("header")[0];
    let text = header.getElementsByTagName("span")[1];
    
    if (wordIndex >= words.length) {
        reveal();
        return;
    }
    
    if (delay !== 0) {
        --delay;
        return;
    }
    
    status = 1;
    text.innerHTML += words[wordIndex][charIndex++];
    if (charIndex === words[wordIndex].length) {
        charIndex = 0;
        ++wordIndex;
        if (wordIndex === words.length)
            delay = 6;
        else
            delay = 15;
        status = 0;
        blinkCursor();
    }
}

function blinkCursor() {
    let header = document.getElementsByTagName("header")[0];
    let cursor = header.getElementsByTagName("span")[2];
    
    if (wordIndex >= words.length) {
        if (delay !== 0)
            --delay;
        else {
            header.getElementsByTagName("span")[0].remove();
            cursor.remove();
            clearInterval(textTimer);
            clearInterval(cursorTimer);
        }
    }

    if (status === 1)
        blink = true;
    
    if (blink)
        cursor.innerHTML = "|";
    else
        cursor.innerHTML = "&nbsp;";
    blink = !blink;
}

function reveal() {
    let classes = document.getElementById("content").classList;
    classes.remove("covered");
    classes.add("reveal");
}

function computeHeight() {
    let header = document.getElementsByTagName("header")[0];
    
    header.classList.add("hidden");
    let temp = header.innerHTML;
    header.innerHTML = "";
    for (let i of words)
        header.innerHTML += i;
    let out = header.offsetHeight;
    header.innerHTML = temp;
    header.style.height = out;
    header.classList.remove("hidden");
}