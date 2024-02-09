// Code

function createPost() {
  const title = document.getElementById("post-creation-title").value;
  const content = document.getElementById("post-creation-content").value;
  const embed = {
    type: "",
    content: "",
  };
  const embedContent = document.getElementById("upload-input").value;
  let embedType = "";

  if (
    document.getElementById("upload-icon-icon").innerHTML.includes("spotify")
  ) {
    embedType = "spotify";
  } else if (
    document.getElementById("upload-icon-icon").innerHTML.includes("image")
  ) {
    embedType = "picture";
  } else if (
    document.getElementById("upload-icon-icon").innerHTML.includes("camera")
  ) {
    embedType = "video";
  } else {
    embedType = "none";
  }
  if (embedType === "none") {
    embed.content = "";
  } else {
    if (!embedContent) {
      embedType = "none";
      embed.content = "";
    } else {
      embed.content = embedContent;
    }
  }
  embed.type = embedType;

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
      embed,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      if (data.ok) {
        document.getElementById("post-creation-title").value = "";
        document.getElementById("post-creation-content").value = "";
        closeDialog();
      }
    });
}

// Function to show the post creation dialog

function showDialog() {
  document.getElementById("post-dia").style.display = "flex";
}
function closeDialog() {
  document.getElementById("post-dia").style.display = "none";
}

function changeUploadType(type) {
  if (type === "spotify") {
    document.getElementById("upload-input").placeholder =
      "Link zum Spotify Song";
    document.getElementById("upload-icon-icon").innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1DB954" class="bi bi-spotify" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" /></svg>';
  } else if (type === "picture") {
    document.getElementById("upload-input").placeholder =
      "Link zu einer Bild Datei";
    document.getElementById("upload-icon-icon").innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16"> <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" /> <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" /></svg>';
  } else if (type === "video") {
    document.getElementById("upload-input").placeholder =
      "Link zu einer Video Datei";
    document.getElementById("upload-icon-icon").innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-reels-fill" viewBox="0 0 16 16"><path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" /><path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6" /><path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/></svg>';
  }
}
