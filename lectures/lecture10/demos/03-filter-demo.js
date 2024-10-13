/*************/
/* 3. Filter */
/*************/
console.log("\nfilter method of list:");

const myNums = [1, 2, 3, 4, 5];

// The filter function applies a filtering function to each element of a list (which evaluates to true or false).
// It returns a new list with only those items where filtering function returned true.
const numsGreaterThan2 = myNums.filter((item) => item > 2);
console.log(numsGreaterThan2);
