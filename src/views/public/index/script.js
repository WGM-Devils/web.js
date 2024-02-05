window.onload = () => {
  let accountIconDefault = document.getElementById("account-icon-default");
  let accountIconCustom = document.getElementById("account-icon-custom");
  let accountName = document.getElementById("account-name");
  let accountSubtitle = document.getElementById("account-subtitle");

  if (!localStorage.getItem("KlingtGut")) return;

  const user = JSON.parse(localStorage.getItem("KlingtGut"));
  user.username &&
    (accountName.innerHTML = user.username) &&
    (accountSubtitle.innerHTML = "Profil bearbeiten");
};
