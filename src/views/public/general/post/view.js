export default function view(postId) {
  fetch("https://klingt-gut.onrender.com/api/post/viewed", {
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
        console.log("Viewed");
      } else {
        console.log("Error");
      }
    });
}
