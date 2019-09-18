// let f = (a) =>{
//     console.log(a)
// }

// f (23);


//使用Person 原檔案要用import 匯入

// import Person from './person';
// let p = new Person('Peter', 'Lin');
// console.log(p.toString());
// console.log(p.describe());


import Person from './person';
const app = document.querySelector('#app');
let persons = [
    new Person('Peter', 'Lin', 26, 'male'),
    new Person('Bill', 'Chen', 28, 'male'),
    new Person('Flora', 'Hsu', 25, 'female'),
];
persons = [...persons, new Person('小明', '李')];

persons.forEach(p=>{
    app.innerHTML += `<div data-age="${p.age}">${p.firstname} ${p.lastname} ${p.age}</div>`;
});