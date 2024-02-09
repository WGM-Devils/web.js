function create(post) {
  if (!post) return;

  const newPost = document.createElement("div");
  const postButtons = document.createElement("div");
  const title = document.createElement("div");
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
      return res;
    })
    .then((res) => {
      if (!res.ok) return;

      const response = res.json();
      if (!response.ok) return;

      const content = response.contents;
      const posts = content.posts;

      posts.forEach((p) => create(p));
    });
}
// TODO: Unfinished
