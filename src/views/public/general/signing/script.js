function submitCredentials(type) {
  const email = document.getElementById("email-input");
  const password = document.getElementById("password-input");
  const username = document.getElementById("username-input");

  if (type === "login") {
    if (!email.value || !password.value) {
      return alert("Bitte alle Felder ausfüllen.");
    }

    const data = {
      email: email.value,
      password: password.value,
    };

    fetch("https://klingt-gut.cyclic.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "KlingtGut",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.json().ok) {
          return res;
        }
      })
      .then((res) => {
        if (res.json().ok) {
          localStorage.setItem("KlingtGut", true);
          return (window.location.href = "https://klingt-gut.cyclic.app/");
        } else if (res.json().status === 403) {
          return alert("Ihre Anmeldedaten sind nicht richtg.");
        }
      });
  } else if (type === "register") {
    if (!email.value || !password.value || !username.value) {
      return alert("Bitte alle Felder ausfüllen.");
    }

    const data = {
      email: email.value,
      password: password.value,
      username: username.value,
    };

    fetch("https://klingt-gut.cyclic.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "KlingtGut",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.json().ok) {
          return res;
        }
      })
      .then((res) => {
        if (res.json().ok) {
          localStorage.setItem("KlingtGut", true);
          return (window.location.href = "https://klingt-gut.cyclic.app/");
        }
      });
  }
}
