function submitCredentials(type) {
  const email = document.getElementById("email-input");
  const password = document.getElementById("password-input");
  const username = document.getElementById("username-input");

  if (type === "login") {
    if (!email.value || !password.value) {
      return alert("Please fill out all fields.");
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
        if (res.json().ok) {
          return res;
        }
      })
      .then((res) => {
        if (res.json().ok) {
          return (window.location.href = "https://klingt-gut.onrender.com/");
        }
      });
  } else if (type === "register") {
    if (!email.value || !password.value || !username.value) {
      return alert("Please fill out all fields.");
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
        if (res.json().ok) {
          return res;
        }
      })
      .then((res) => {
        if (res.json().ok) {
          return (window.location.href = "https://klingt-gut.onrender.com/");
        }
      });
  }
}
