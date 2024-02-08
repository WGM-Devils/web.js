export default function like(postId) {
  fetch("https://klingt-gut.onrender.com/api/post/unlike", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `KlingtGut`,
    },
    body: JSON.stringify({
      postId,
      userId: JSON.parse(localStorage.getItem("KlingtGut"))._id,
    }),
  })
    .then((res) => res)
    .then((res) => {
      if (res.ok) {
        document
          .getElementById(`unliked-icon-${postId}`)
          .classList.remove("liked-icon");
        document
          .getElementById(`liked-icon-${postId}`)
          .classList.add("liked-icon");
      } else {
        console.log("Couldn't unlike post. Id: ", postId, "Response: ", res);
      }
    });
}
