/***********************/
/* 5. Chaining Methods */
/***********************/

const myNums = [1, 2, 3, 4, 5];

// first square all the numbers, then add them altogether:
console.log("\nchaining list methods together:");
const sumOfSquares = myNums.map((item) => item ** 2).reduce((a, b) => a + b);
console.log(sumOfSquares);
