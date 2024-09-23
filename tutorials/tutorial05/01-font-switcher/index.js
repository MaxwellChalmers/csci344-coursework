const makeBigger = () => {
  let t = document.querySelector("h1");
  let k = document.querySelector("div.content");
  t.style.fontSize = "80px";
  k.style.fontSize = "80px";
};

const makeSmaller = () => {
  let t = document.querySelector("h1");
  let k = document.querySelector("div.content");
  t.style.fontSize = "20px";
  k.style.fontSize = "20px";
};

/*
Tips:
1. First, in the index.html file, add an onclick attribute to each button.
   The value of the attribute should be a call to the corresponding function
   (see class demos).

2. Then modify the body of the "makeBigger" and 
   "makeSmaller" functions (in between the curly braces)
   to target the body element and set it's font size.
*/
