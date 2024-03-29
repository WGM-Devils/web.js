function submitCredentials(type) {
  const email = document.getElementById("email-input");
  const password = document.getElementById("password-input");
  const username = document.getElementById("username-input");

  if (type === "login") {
    if (!email.value || !password.value) {
      return alert("Bitte füllen Sie alle Felder aus.");
    }

    const data = {
      email: email.value,
      password: password.value,
    };

    fetch("https://klingt-gut.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "KlingtGut",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.ok) {
          console.log(data);
          const user = data.response.contents.users[0];
          document.cookie = `KLINGTGUT.id=${
            user._id
          }; expires=${new Date().setDate(new Date().getDate() + 14)}`;
          return (window.location.href = "https://klingt-gut.onrender.com/");
        }
      });
  } else if (type === "register") {
    if (!email.value || !password.value || !username.value) {
      return alert("Bitte füllen sie alle Felder aus.");
    }

    const data = {
      email: email.value,
      password: password.value,
      username: username.value,
    };

    fetch("https://klingt-gut.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "KlingtGut",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.ok) {
          const user = data.response.contents.users[0];
          document.cookie = `KLINGTGUT.id=${
            user._id
          }; expires=${new Date().setDate(new Date().getDate() + 14)}`;
          return (window.location.href = "https://klingt-gut.onrender.com/");
        }
      });
  }
}
