// src/person_test.js
const Person = require('./person');
const f = require('./func');


const p = new Person('winnie',20);
console.log(p.toJSON());
console.log(f(10));