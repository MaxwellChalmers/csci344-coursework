let flash = true;

const makeRed = () => {
  // your code here...
  colorChanger("section1", "red");
};

const makeBlue = () => {
  // your code here...
  colorChanger("section2", "blue");
};

const makePink = () => {
  // your code here...
  colorChanger("section3", "pink");
};

const makeOrange = () => {
  // your code here...
  colorChanger("section4", "orange");
};

const colorChanger = (section, color) => {
  console.log("Change background to " + color);
  let doc = document.querySelector("#" + section);
  if (doc.style.backgroundColor == color) {
    doc.style.backgroundColor = "white";
  } else {
    doc.style.backgroundColor = color;
  }
};
let colors = [makeBlue, makeOrange, makePink, makeRed];

const makeStop = () => {
  flash = !flash;
  let doc = document.querySelector("#stop");
  if (flash) {
    doc.innerHTML = "make it stop pleese";
  } else {
    doc.innerHTML = "nevermind start it back up";
  }
};

async function flashy() {
  while (true) {
    if (flash) {
      colors[(colors.length * Math.random()) | 0]();
    }
    await sleep(100);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

flashy();
