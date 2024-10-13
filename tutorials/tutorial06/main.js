// Part 1: Set up the helper functions:
// 1. Implement two filter functions (which should return either true or false):
//      * filterClassFull: to filter out the closed courses (if applicable)
//      * filterTermMatched: to only match courses relevant to the search term
// 2. Implement the dataToHTML function, which takes a course object as an
//    argument and returns an HTML string that represents the course.

// Part 2: Within the showData function, use the array's filter, map, join
//         methods, and any relevant DOM methods, to build the interface.
// 1. Use the array's built in "filter" method, which takes a filter
//    function as an argument and returns an array of objects that
//    match the criteria.
//          * Note that you can chain filter functions together.
// 2. Use the array's built in "map" method to generate an array of
//    HTML strings.
// 3. Join the array of strings on the empty string or new line character
//    to create one large HTML string.
// 4. Clear out the existing courses in the DOM and insert
//    the HTML string into the DOM.

const search = (ev) => {
  ev.preventDefault(); // overrides default button action

  // Get user's preferences:
  const searchTerm = document.querySelector("#search_term").value;
  const openOnly = document.querySelector("#is_open").checked;

  // Pass the user's preferences into the showData function
  showData(searchTerm, openOnly);
};

// Part 1.1a
const filterClassFull = (course) => {
  if (course.EnrollmentCurrent >= course.EnrollmentMax) {
    return false;
  }
  return true;
};

// Part 1.1b
const filterTermMatched = (course) => {
  // modify this
  let matches = false;
  //const parsedCourse = JSON.parse(course);
  const searchTerm = document.querySelector("#search_term").value;
  const searchableProperties = Object.entries(course).filter(([prop]) =>
    ["CRN", "Code", "Title", "Instructors"].includes(prop)
  );

  const propertyText = searchableProperties.map(([key, value]) => value);
  const instructor = propertyText.pop();

  instructor.forEach((teacher) => {
    propertyText.push(teacher.Username);
    propertyText.push(teacher.Name);
  });

  console.log(propertyText);
  propertyText.forEach((element) => {
    if (element.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
      matches = true;
    }
  });
  return matches;
};

// Part 1.2
const dataToHTML = (course) => {
  // const parsedCourse = JSON.parse(course);
  const seats = (course.EnrollmentMax - course.EnrollmentCurrent).toString();
  const waitlistSize = (
    course.WaitlistMax - course.WaitlistAvailable
  ).toString();
  let waitlistOrSeats = "Number on Waitlist " + waitlistSize;
  let symbol = `<i class="fa-solid fa-circle-xmark"></i>`;
  let open = "Closed";
  if (course.Classification.Open) {
    symbol = `<i class="fa-solid fa-circle-check"></i>`;
    open = "Open";
    waitlistOrSeats = "Seats Available: " + seats;
  }
  let teachers = "";

  course.Instructors.forEach((teacher) => {
    teachers += teacher.Name + " ";
  });

  return `<section class="course">
            <h2>${course.Title}</h2>
            <p>
                ${symbol} 
                ${open}  &bull; ${course.CRN} &bull; ${waitlistOrSeats}
            </p>
            <p>
                ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${
    course.Hours
  } credit hour(s)
            </p>
            <p><strong>${teachers.trim()}</strong></p>
        </section>`;
};

// Part 2
const showData = (searchTerm, openOnly) => {
  console.log(searchTerm, openOnly);
  console.log(data); // imported from course-data.js
  // Your code here:
  let foundCourses = data.filter(filterTermMatched);
  if (openOnly) {
    foundCourses = foundCourses.filter(filterClassFull);
  }
  console.log(foundCourses);
  const htmlCourses = foundCourses.map(dataToHTML);

  const allCourses = htmlCourses.join(`\n`);
  let courses = document.querySelector(".courses");
  courses.innerHTML = allCourses || "<p>No courses found.</p>";
};
