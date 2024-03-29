window.onload = () => {
  let accountIconDefault = document.getElementById("account-icon-default");
  let accountIconCustom = document.getElementById("account-icon-custom");
  let accountName = document.getElementById("account-name");
  let accountSubtitle = document.getElementById("account-subtitle");

  const cookies = document.cookie;
  if (!cookies.includes("KLINGTGUT.id")) return;
  console.log(cookies);

  fetch(
    `https://klingt-gut.onrender.com/api/users/get/id=${cookies.replace(
      "KLINGTGUT.id=",
      ""
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
        if (String(res.status).startsWith("2")) {
          return res.json();
        }
      }
    })
    .then((data) => {
      if (!data.ok) return;

      const user = data.response.contents;
      accountName.innerHTML = user.username;
      accountSubtitle.innerHTML = "Profil bearbeiten";
    });
};
