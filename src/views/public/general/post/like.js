export function like(postId) {
  fetch("https://klingt-gut.onrender.com/api/post/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `KlingtGut`,
    },
    body: JSON.stringify({ postId }),
  })
    .then((res) => res)
    .then((res) => {
      if (res.ok) {
        document.getElementById("");
      } else {
        console.log("Error");
      }
    });
}
