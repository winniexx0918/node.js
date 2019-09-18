class Person {
    constructor(name='noname'
    , age=20) {
    this.name = name;
    this.age = age;
    }
    toJSON() {
    const obj = {
    name: this.name,
    age: this.age
    };
    return JSON.stringify(obj);
    }
    }
    module.exports = Person; // node 匯出類別