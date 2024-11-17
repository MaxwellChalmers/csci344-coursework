import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "max";
let password = "password";
let posts = "";
let postsHTML = ``;
let user = "";
let recomentdations = "";
let stories = "";
let storiesHTML = ``;
let postnumber = 0;

async function initializeScreen() {
  token = await getToken();
  showNav();
  user = await getAndShowDataUser();
  recomentdations = await getAndShowDataFollowRecs();
  showSidebar();
  posts = await getAndShowDataPosts();
  stories = await getAndShowStories();
  renderStories();
  // Check if posts is an array before calling forEach
  console.log(posts);
  renderPosts();
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
                <li><button class="text-blue-700 py-2" aria-label="sign out button">Sign out</button></li>
            </ul>
        </nav>
    `;
}

function showSidebar() {
  document.querySelector("#sidebar").innerHTML = `
  <aside class="fixed top-[100px] left-[63vw] w-70 hidden md:block">
        
        <header class="flex gap-4 items-center">
            <img src="${user.thumb_url}" class="rounded-full w-16" alt="${
    user.username
  }'s profile picture "/>
            <h2 class="font-Comfortaa font-bold text-2xl">${user.username}</h2>
        </header>

        <div class="mt-4">
            <p class="text-base text-purple-900 font-bold mb-4">Suggestions for you</p>

            ${renderFollowRecomendations()}

        </div>
    </aside>`;
}

window.redrawButton = async function (button, id) {
  if (button.textContent === "follow") {
    button.follow_id = await followUser(id);
    button.textContent = "unfollow";
  } else {
    button.textContent = "follow";
    unfollowUser(button.follow_id);
  }
};

function renderFollowRecomendations() {
  let recomentdationsHTML = ``;
  function renderRec(account) {
    recomentdationsHTML += `<section class="flex justify-around items-center mb-4 gap-4">
                <img src="${account.thumb_url}" class="rounded-full" alt="${account.username}'s profile picture"/>
                <div class="w-[180px]">
                    <p class="font-bold text-sm">${account.username}</p>
                    <p class="text-red-900 text-xs">suggested for you</p>
                </div>
                <button class="text-yellow-900 text-sm py-2" aria-label="follow button" onclick="redrawButton(this, ${account.id})" follow_id="0">follow</button>
            </section>
      `;
  }
  recomentdations.forEach(renderRec);
  return recomentdationsHTML;
}

function renderStories() {
  storiesHTML = `<header class="flex gap-6 bg-white border p-2 overflow-hidden mb-6" id="stories">
`;
  function renderStory(story) {
    storiesHTML += `<div class="flex flex-col justify-center items-center">
                <img src="${story.user.thumb_url}" class="min-w-[50px] min-h-[50px] rounded-full border-4 border-gray-300 object-cover" alt="${story.user.username}'s story picture"/>
                <p class="text-xs text-purple-900">${story.user.username}</p>
            </div>`;
  }
  stories.forEach(renderStory);
  storiesHTML += `</header>`;
}

function renderPosts() {
  postsHTML = storiesHTML;
  postnumber = 0;
  posts.forEach(renderPost);
  document.querySelector("main").innerHTML = postsHTML;
}

function renderPost(post) {
  let comments = ``;

  function renderComment(comment) {
    comments += `<p class="text-sm mb-3">
       <strong>${comment.user.username}</strong> ${comment.text}
     </p>`;
  }
  if (post.comments.length > 1) {
    comments += `<button aria-label="view all comments button" class="text-sm mb-3"> view all ${post.comments.length} comments </button>`;
    renderComment(post.comments[post.comments.length - 1]);
  } else if (post.comments.length === 1) {
    renderComment(post.comments[0]);
  }

  // not very functional programming of me to use this aproach but seems simplest way to avoid blank screen durring reloads
  postsHTML += `
        <section class="bg-white border mb-10">
                <div class="p-4 flex justify-between">
                    <h3 class="text-lg font-Comfortaa font-bold">${
                      post.user.username
                    }</h3>
                    <button aria-label="options button" class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
                </div>
                <img src="${post.image_url}" alt="${
    post.alt_text || "This posts image has not been given alt text."
  }" width="300" height="300"
                    class="w-full bg-cover">
                <div class="p-4">
                    <div class="flex justify-between text-2xl mb-3">
                        <div>
                            ${getLikeButton(post)}
                            <button aria-label="comment button" ><i class="far fa-comment"></i></button>
                            <button aria-label="share button"><i class="far fa-paper-plane"></i></button>
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
                            <button aria-label="expand caption button" class="button">more</button>
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
                        <input title="text input for comment" id="comment${postnumber}" type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                    </div>
                    <button aria-label="post comment button" class="text-green-900 py-2" onclick="postComment(${
                      post.id
                    }, 'comment${postnumber++}')">Post</button>
                </div>
            </section>
            `;
}

window.postComment = async function (postID, inputID) {
  const input = await document.getElementById(inputID);
  postCommentAPIcall(input.value, postID);
  reloadPosts();
};

function getLikeButton(post) {
  if (post.current_user_like_id) {
    return `<button aria-label="unlike button" onclick="deleteLike('${post.current_user_like_id}')"><i class="fa-solid fa-heart text-red-700"></i></button>`;
  } else {
    return `<button aria-label="like button" onclick="createLike('${post.id}')"><i class="far fa-heart text-red-400"></i></button>`;
  }
}

function getBookmarkButton(post) {
  if (post.current_user_bookmark_id) {
    return `<button aria-label="unbookmark button" onclick="deleteBookmark('${post.current_user_bookmark_id}')"><i class="fa-solid fa-bookmark"></i></button>`;
  } else {
    return `<button aria-label="bookmark button" onclick="createBookmark('${post.id}')"><i class="far fa-bookmark"></i></button>`;
  }
}

window.createBookmark = async function (postID) {
  const postData = {
    post_id: postID,
  };
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
  reloadPosts();
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
  reloadPosts();
};
window.createLike = async function (postID) {
  const postData = {
    post_id: postID,
  };

  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/likes/",
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

  reloadPosts();
};

window.deleteLike = async function (likeID) {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/likes/" + likeID,
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
  reloadPosts();
};

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
async function getAndShowDataUser() {
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
  return data;
}

//await / async syntax:
async function getAndShowDataFollowRecs() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/suggestions/",
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

async function getAndShowStories() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/stories/",
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

async function reloadPosts() {
  initializeScreen();
}

async function followUser(id) {
  const postData = {
    user_id: id,
  };
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/following/",
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
  return data.id;
}
async function unfollowUser(id) {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/following/" + id,
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
}

//await / async syntax:
async function postCommentAPIcall(text, postID) {
  const postData = {
    post_id: postID,
    text: text,
  };
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/comments",
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
}

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
