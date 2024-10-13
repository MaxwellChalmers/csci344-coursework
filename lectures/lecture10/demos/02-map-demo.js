/**********/
/* 2. Map */
/**********/

const myNums = [1, 2, 3, 4, 5];

// The map function applies a transformation function to each element of a list,
// and returns a *new* list of values.
const squareNums = myNums.map((item) => item ** 2);
console.log(squareNums);
