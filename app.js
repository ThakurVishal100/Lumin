// let obj={
//     name:"Rahul",
//     age:23
// }

// let newObj=({...obj,age:24})
// console.log(newObj);



// function add (a){
//     return function (b){
//         return function (c){
//             return a+b+c;
//         }
//     }
// }

// console.log(add(1)(2));


// 7:48:38

let arr=[1,2,3,4,5,6,7,8,9,10];

const ans=arr.map((_, index) => {
     return index;
})
console.log(ans);
