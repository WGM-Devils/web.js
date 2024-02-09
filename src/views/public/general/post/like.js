export default function like(postId) {
  fetch("https://klingt-gut.onrender.com/api/post/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `KlingtGut`,
    },
    body: JSON.stringify({
      postId,
      userId: document.cookie.replace("KLINGTGUT.id", ""),
    }),
  })
    .then((res) => res)
    .then((res) => {
      if (res.ok) {
        document
          .getElementById(`unliked-icon-${postId}`)
          .classList.add("liked-icon");
        document
          .getElementById(`liked-icon-${postId}`)
          .classList.remove("liked-icon");
      } else {
        console.log("Error");
      }
    });
}
