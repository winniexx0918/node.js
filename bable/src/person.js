class Person {
    constructor(firstname, lastname, age=20, gender='male') {
        this.firstname = firstname;
        this.lastname =  lastname;
        this.age =  age;
        this.gender =  "male";
    }

    toString() {
        return this.firstname + ' ' + this.lastname;
    }

    describe() {
        return `${this.firstname} ${this.lastname}
            age: ${this.age}
            gender: ${this.gender}`;
    }
}
export default Person;
//export 匯出