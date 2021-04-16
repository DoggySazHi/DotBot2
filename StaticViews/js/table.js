"use strict";

onInitTable();

function onInitTable() {
    [].forEach.call(document.querySelectorAll("table"), table => {
        let headElem = table.querySelectorAll("thead tr th");
        if (headElem == null)
            return;
        let head = Array.from(headElem);
        [].forEach.call(table.querySelectorAll("tr"), tr => {
            let columns = Array.from(tr.querySelectorAll("td"));
            for (let i = 0; i < Math.min(head.length, columns.length); ++i)
                columns[i].setAttribute("data-label", head[i].innerHTML);
        });
    });
    
    console.info("Added table data values!");
}