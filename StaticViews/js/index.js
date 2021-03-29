"use strict";

onIndexInit();

const starting_phrase = "";
const words = ["Hi, I'm William Le.", "test.", "piece of garbage."];
let status = 0;
let static_box = undefined
let changing_box = undefined;
let cursor_box = undefined;

let word_counter = 0;
let char_counter = 0;
let delay_counter = 0;

function onIndexInit() {
    status = 1;
    static_box = document.createElement("span")
    changing_box = document.createElement("span")
    cursor_box = document.createElement("span")
    document.getElementsByClassName("mukyu")[0].appendChild(static_box);
    document.getElementsByClassName("mukyu")[0].appendChild(changing_box);
    document.getElementsByClassName("mukyu")[0].appendChild(cursor_box);

    setInterval(changeText, 100)
    setInterval(blinkCursor, 500)
}