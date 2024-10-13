/*************/
/* 4. Reduce */
/*************/

const myNums = [1, 2, 3, 4, 5, 6, 7, 8];

console.log("\nreduce method of list:");
// The reduce function applies a transformation function
// pairwise on all elements of the list in order to
// reduce it down to a single value. The function will take
// the first two elements of the list as arguments, return a value,
// and then the function will run again, using that return value
// and the third element of the list, etc.
// For example, reduce can be used to find the sum of a list like so:
const sumOfNums = myNums.reduce((a, b) => a + b);
console.log(sumOfNums);

const sumOfNumsWithInitialValue = myNums.reduce((a, b) => a + b, 200);
console.log(sumOfNumsWithInitialValue);

const averageOfNums = myNums.reduce((a, b, _, arr) => a + b / arr.length, 0);
console.log(averageOfNums);
