'use strict';

function* generateIterator(arr) {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i];
    }
}

var arr = ["orange", "red", "blue"];
var iterator = generateIterator(arr);
let currentItem = iterator.next();
while (!currentItem.done) {
    console.log(currentItem.value);
    currentItem = iterator.next();
}