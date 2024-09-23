const defaultTheme = (ev) => {
  let b = document.querySelector("body");
  b.className = "";
};
const oceanTheme = (ev) => {
  let b = document.querySelector("body");
  b.className = "ocean";
};

const desertTheme = (ev) => {
  let b = document.querySelector("body");
  b.className = "desert";
};

const highContrastTheme = (ev) => {
  let b = document.querySelector("body");
  b.className = "high-contrast";
};
const ruinTheme = (ev) => {
  let b = document.querySelector("body");
  b.className = "ruin";
};
/*
    Hints: 
    1. Attach the event handlers (functions) above to the click event
       of each of the four buttons (#default, #ocean, #desert, 
        and #high-contrast) in index.html.
    2. Then, modify the  body of each function so that it
       sets the className property of the body tag based on 
       the button that was clicked.
*/
