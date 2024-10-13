class SuperArray extends Array {
    forEach1(funcToApplyToEachItem) {
        // forEach callback function always accepts three arguments (no return value):
        // 1. The current item (required)
        // 2. The index of the current item in the array (optional)
        // 3. The array to which the item belongs (optional)
    }

    map1(funcToApplyToEachItem) {
        // map callback function always accepts three arguments:
        // 1. The current item (required)
        // 2. The index of the current item in the array (optional)
        // 3. The array to which the item belongs (optional)
        return [];
    }

    filter1(funcToFilterItems) {
        // filter callback function always accepts three arguments:
        // 1. The current item (required)
        // 2. The index of the current item in the array (optional)
        // 3. The array to which the item belongs (optional)
        return [];
    }

    reduce1(callback, initialValue) {
        // the reducer callback function always accepts four arguments:
        // 1. accumulator – The value resulting from the previous call to callbackFn. On the first call, its value is initialValue if the latter is specified; otherwise its value is array[0].
        // 2. currentValue – The value of the current element.
        // 3. currentIndex – The index position of currentValue in the array.
        // 4. array – The array reduce() was called upon.

        return -1;
    }
}

const myArray = new SuperArray(1, 2, 3, 4, 5);
console.log("forEach doesn't return anything:");
myArray.forEach1((item, i) => console.log(`The item at index ${i} is ${item}`));

console.log(
    "\n\nmap (returns an array):",
    myArray.map1((item, i) => `The item at index ${i} is ${item}`)
);

console.log(
    "\n\nfilter (returns an array with only the items that meet the condition):",
    myArray.filter1((item) => item > 2)
);

const reducer = (a, b, idx, arr) => a + b / arr.length;
console.log(
    "\n\nreduce (returns an array with only the items that meet the condition):",
    myArray.reduce1(reducer, 0)
);
