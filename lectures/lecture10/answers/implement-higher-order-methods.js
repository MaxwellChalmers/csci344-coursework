class SuperArray extends Array {
    forEach1(funcToApplyToEachItem) {
        for (let i = 0; i < this.length; i++) {
            // forEach callback function always passes three arguments:
            // 1. The current item (required)
            // 2. The index of the current item in the array (optional)
            // 3. The array to which the item belongs (optional)
            funcToApplyToEachItem(this[i], i, this);
        }
    }

    map1(funcToApplyToEachItem) {
        const arrNew = [];
        for (let i = 0; i < this.length; i++) {
            // map callback function always passes three arguments:
            // 1. The current item (required)
            // 2. The index of the current item in the array (optional)
            // 3. The array to which the item belongs (optional)
            arrNew.push(funcToApplyToEachItem(this[i], i, this));
        }
        return arrNew;
    }

    filter1(funcToFilterItems) {
        const arrNew = [];
        for (let i = 0; i < this.length; i++) {
            // filter callback function always passes three arguments:
            // 1. The current item (required)
            // 2. The index of the current item in the array (optional)
            // 3. The array to which the item belongs (optional)
            if (funcToFilterItems(this[i], i, this)) {
                arrNew.push(this[i]);
            }
        }
        return arrNew;
    }

    reduce1(callback, initialValue) {
        // the reducer callback funciton always passes four arguments:
        // 1. accumulator – The value resulting from the previous call to callbackFn. On the first call, its value is initialValue if the latter is specified; otherwise its value is array[0].
        // 2. currentValue – The value of the current element.
        // 3. currentIndex – The index position of currentValue in the array.
        // 4. array – The array reduce() was called upon.
        // let accumulator;

        let accumulator = initialValue != null ? initialValue : this[0];
        let startIdx = initialValue != null ? 0 : 1;

        for (let i = startIdx; i < this.length; i++) {
            let currentValue = this[i];
            accumulator = callback(accumulator, currentValue, i, this);
        }
        return accumulator;
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
