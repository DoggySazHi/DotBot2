"use strict";

onIndexInit();

let header = document.getElementsByTagName("header")[0];
let text = header.getElementsByTagName("span")[0];
let cursor = header.getElementsByTagName("span")[1];

let status = 0;

function onIndexInit() {
    setInterval(changeText, 100)
    setInterval(blinkCursor, 500)
}

let blink = false;

let words = ["Hi.", " I'm William Le."]
let charIndex = 0;
let wordIndex = 0;
let delay = 0;

function changeText() {
    if (wordIndex === words.length)
        return;
    
    if (delay !== 0) {
        --delay;
        return;
    }
    
    status = 1;
    text.innerHTML += words[wordIndex][charIndex++];
    if (charIndex === words[wordIndex].length) {
        charIndex = 0;
        ++wordIndex;
        delay = 20;
        status = 0;
        blinkCursor();
    }
}

function blinkCursor() {
    if (status === 1)
        blink = true;
    
    if (blink)
        cursor.innerHTML = "|";
    else
        cursor.innerHTML = "";
    blink = !blink;
}