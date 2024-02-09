window.onload = () => {
  document.getElementById("post-dia").style.display = "none";
};
function createPost() {
  const title = document.getElementById("post-creation-title").value;
  const content = document.getElementById("post-creation-content").value;

  if (!title || !content) {
    return alert("Bitte geben Sie einen Titel und Inhalt an.");
  }

  fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "KlingtGut",
    },
    body: JSON.stringify({
      title,
      content,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
    })
    .then((data) => {
      if (data.json().ok) {
      }
    });
}

// Function to show the post creation dialog

function showDialog() {
  document.getElementById("post-dia").style.display = "flex";
}
function closeModal() {
  document.getElementById("post-dia").style.display = "none";
}
