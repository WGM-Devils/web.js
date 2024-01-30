function openCredentials() {
  if (localStorage.getItem("klingtGut")) {
    window.location.href = "/account";
  } else {
    window.location.href = "/login";
  }
}
function openHome() {
  window.location.href = "https://klingt-gut.onrender.com/";
}
function openDiscover() {
  window.location.href = "https://klingt-gut.onrender.com/discover";
}
function openSearch() {
  window.location.href = "https://klingt-gut.onrender.com/search";
}
function openChats() {
  window.location.href = "https://klingt-gut.onrender.com/chats";
}
function openSettings() {
  window.location.href = "https://klingt-gut.onrender.com/settings";
}
