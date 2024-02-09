// Imports

import like from "./like";

function create(post) {
  if (!post) return;

  const newPost = document.createElement("div");
  newPost.classList.add("post");
  const postContent = document.createElement("div");
  postContent.classList.add("post-content");
  const postTopbar = document.createElement("div");
  postTopbar.classList.add("post-topbar");
  const title = document.createElement("div");
  title.classList.add("post-title");
  title.innerHTML = post.title;
  postTopbar.appendChild(title);
  const postDescription = document.createElement("div");
  postDescription.classList.add("post-description");
  postDescription.innerHTML = `<p>${post.content}</p>`;
  postContent.appendChild(postDescription);
  const postEmbed = document.createElement("div");
  postEmbed.classList.add("post-embed");
  if (post.embed.type === "song") {
    postEmbed.innerHTML = post.embed.link;
  } else if (post.embed.type === "image") {
    postEmbed.innerHTML = `<img class="embed-img" src="${post.embed.link} />"`;
  }
  postContent.appendChild(postEmbed);
  const postButtons = document.createElement("div");
  postButtons.classList.add("post-buttons");
  const likeButton = document.createElement("div");
  likeButton.classList.add("post-button");
  likeButton.classList.add("post-button-clickable");
  likeButton.addEventListener("click", like(post._id));
  likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" id="unliked-icon-" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill liked-icon" id="liked-icon-" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg><div class="post-button-text">${post.likes.count}</div>`;
  postButtons.appendChild(likeButton);
  const viewsButton = document.createElement("div");
  viewsButton.classList.add("post-button");
  viewsButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16"><path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/></svg><div class="post-button-text">${post.views.count}</div>`;
  postButtons.appendChild(viewsButton);
  postContent.appendChild(postButtons);
  newPost.appendChild(postContent);
}
function loadPosts() {
  fetch("https://klingt-gut.onrender.com/api/posts/all", {
    method: "GET",
    headers: {
      Authorization: "KlingtGut",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if (!data.ok) return;

      const posts = data.response.contents.posts;
      console.log(posts);
    });
}
window.onload = () => {
  loadPosts();
};
