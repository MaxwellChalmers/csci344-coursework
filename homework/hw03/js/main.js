import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "max";
let password = "password";
let posts = "";

async function initializeScreen() {
  token = await getToken();
  showNav();
  await getAndShowData();
  posts = await getAndShowDataPosts();
  // Check if posts is an array before calling forEach
  console.log(posts);

  posts.forEach(renderPosts);
}

async function getToken() {
  return await getAccessToken(rootURL, username, password);
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

function renderPosts(post) {
  let comments = ``;

  function renderComment(comment) {
    comments += `<p class="text-sm mb-3">
       <strong>${comment.user.username}</strong> ${comment.text}
     </p>`;
  }
  if (post.comments.length > 1) {
    comments += `<button class="text-sm mb-3"> view all ${post.comments.length} comments </button>`;
    renderComment(post.comments[post.comments.length - 1]);
  } else if (post.comments.length === 1) {
    renderComment(post.comments[0]);
  }

  //post.comments.forEach(renderComment);

  document.querySelector("main").innerHTML += `
        <section class="bg-white border mb-10">
                <div class="p-4 flex justify-between">
                    <h3 class="text-lg font-Comfortaa font-bold">${
                      post.user.username
                    }</h3>
                    <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
                </div>
                <img src="${post.image_url}" alt="${
    post.alt_text
  }" width="300" height="300"
                    class="w-full bg-cover">
                <div class="p-4">
                    <div class="flex justify-between text-2xl mb-3">
                        <div>
                            ${getLikeButton(post)}
                            <button><i class="far fa-comment"></i></button>
                            <button><i class="far fa-paper-plane"></i></button>
                        </div>
                        <div>
                            ${getBookmarkButton(post)}
                        </div>
                    </div>
                    <p class="font-bold mb-3">${post.likes.length} likes</p>
                    <div class="text-sm mb-3">
                        <p>
                            <strong>${post.user.username}</strong>
                            ${post.caption}
                            <button class="button">more</button>
                        </p>
                    </div>
                    ${comments}
                    <p class="uppercase text-gray-500 text-xs">${
                      post.display_time
                    }</p>
                </div>
                <div class="flex justify-between items-center p-3">
                    <div class="flex items-center gap-3 min-w-[80%]">
                        <i class="far fa-smile text-lg"></i>
                        <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                    </div>
                    <button class="text-blue-500 py-2">Post</button>
                </div>
            </section>
            `;
}
// implement remaining functionality below:

function getLikeButton(post) {
  if (post.current_user_like_id) {
    return `<button><i class="fa-solid fa-heart text-red-700"></i></button>`;
  } else {
    return `<button><i class="far fa-heart text-red-400"></i></button>`;
  }
}

function getBookmarkButton(post) {
  if (post.current_user_bookmark_id) {
    return `<button onclick="deleteBookmark('${post.current_user_bookmark_id}')"><i class="fa-solid fa-bookmark"></i></button>`;
  } else {
    return `<button onclick="createBookmark('${post.id}')"><i class="far fa-bookmark"></i></button>`;
  }
}

window.createBookmark = async function (postID) {
  const postData = {
    post_id: postID,
  };
  //await / async syntax:
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/bookmarks/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

window.deleteBookmark = async function (bookmarkID) {
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

function renderComment(comment) {
  return;
  `<p class="text-sm mb-3">
    <strong>${comment.user.username}</strong> ${comment.text}
  </p>`;
}

async function getAndShowDataPosts() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/posts",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}

//await / async syntax:
async function getAndShowData() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/profile/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await response.json();
  console.log(data);
}

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
