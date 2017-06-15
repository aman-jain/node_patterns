'use strict'

function* simpleGenerator() {
    yield 'apple';
    yield 'mango';
    return 'orange';
}

const newSimpleGenerator = new simpleGenerator();
console.log(newSimpleGenerator.next());
console.log(newSimpleGenerator.next());
console.log(newSimpleGenerator.next());