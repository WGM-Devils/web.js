window.onload = () => {
  let accountIconDefault = document.getElementById("account-icon-default");
  let accountIconCustom = document.getElementById("account-icon-custom");
  let accountName = document.getElementById("account-name");
  let accountSubtitle = document.getElementById("account-subtitle");

  const cookies = document.cookie;
  if (!cookies.includes("KLINGTGUT.id")) return;

  fetch(
    `https://klingt-gut.onrender.com/api/user/get/id=${cookies.replace(
      "KLINGTGUT.id="
    )}/type=json`,
    {
      method: "GET",
      headers: {
        Authorization: "KlingtGut",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if (!data.ok) return;

      const user = data.response.contents;
      user.username &&
        (accountName.innerHTML = user.username) &&
        (accountSubtitle.innerHTML = "Profil bearbeiten");
    });
};
