function createPost(title, user, date, content) {
  let post = document.createElement("div");
  post.classList.add("post");
  post.innerHTML = `
    <div class="post-header">
      <div class="post-title">${title}</div>
      <div class="post-user">${user}</div>
      <div class="post-date">${date}</div>
    </div>
    <div class="post-content">${content}</div>
  `;
  return post;
}
