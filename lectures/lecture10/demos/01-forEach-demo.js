/*********************/
/* 1. foreach method */
/*********************/

const myList = ["apple", "orange", "banana", "mango", "peach"];

console.log("\nforeach method of list:");
// - forEach method  applies an iteraction function to each element of a list:
myList.forEach((item) => console.log(item));

//1.b. Alternative syntax: define the function argument first:
console.log("\nforeach (alternate strategy):");
const printFunction = (item) => console.log(item);

myList.forEach(printFunction);
