/* formations */
const mainImage = document.getElementById("mainImage");
const imageTitle = document.getElementById("imageTitle");
const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    mainImage.src = btn.dataset.img;
    imageTitle.textContent = btn.dataset.title;

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    mainImage.classList.remove("zoom-in");
    void mainImage.offsetWidth;
    mainImage.classList.add("zoom-in");
  });
});

function getRedirectPath(fileName) {
  const path = window.location.pathname;
  console.log("Current path:", path, "Target:", fileName);

  if (path.endsWith("/index.html") || path === "/") {
    if (fileName === "index.html") {
      return "index.html";
    }
    return "public/" + fileName;
  }

  if (path.includes("/public/")) {
    if (fileName === "index.html") {
      return "../index.html";
    }
    return fileName;
  }

  return fileName;
}

/* SIGNUP PAGE */
const form = document.getElementById("dForm");
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (confirm("Sure You Want To Save Your Work?")) {
      const data = new FormData(form);
      const obj = Object.fromEntries(data.entries());

      let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      accounts.push(obj);
      localStorage.setItem("accounts", JSON.stringify(accounts));

      localStorage.setItem("currentUser", obj.uname);

      console.log("Saved accounts:", accounts);
      alert("Account saved!");
      form.reset();

      window.location.href = getRedirectPath("index.html");

    }
  });

  // Required field asterisk logic
  const inputs = form.querySelectorAll("input, textarea, select");
  inputs.forEach(input => {
    input.addEventListener("blur", function() {
      if (input.value.trim() === "") {
        let span = input.parentElement.querySelector(".required");
        if (!span) {
          span = document.createElement("span");
          span.className = "required";
          input.parentElement.appendChild(span);
        }
        span.textContent = " *";
        span.style.color = "red";
        span.style.fontWeight = "bold";
      } else {
        const span = input.parentElement.querySelector(".required");
        if (span) span.textContent = "";
      }
    });
  });
}

/* LOGIN PAGE */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = new FormData(loginForm);
    const obj = Object.fromEntries(data.entries());

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    let user = accounts.find(acc => acc.uname === obj.uname && acc.pword === obj.pword);

    if (user) {
      localStorage.setItem("currentUser", user.uname);
      alert("Login successful!");
      window.location.href = getRedirectPath("index.html");
    }
     else {
      alert("Incorrect username or password.");
    }

  });
}

// Logout code
const authControls = document.getElementById("authControls");

if (authControls) {
  let currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    // Show logout button
    authControls.innerHTML = `<button id="logoutBtn">Logout</button>`;

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("currentUser");
      alert("You have been logged out.");
      window.location.href = getRedirectPath("index.html");
    });
  } 
}


// Protect nav links
const protectedLinks = document.querySelectorAll(".nav-center a, .right-section a");

protectedLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    // Check login state
    let currentUser = sessionStorage.getItem("currentUser") || localStorage.getItem("currentUser");

    if (!currentUser) {
      e.preventDefault(); // stop navigation
      window.location.href = getRedirectPath("accounts.html"); // redirect to signup page
    }
  });
});

