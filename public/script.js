/* formations */
  const mainImage = document.getElementById("mainImage");
  const imageTitle = document.getElementById("imageTitle");
  const buttons = document.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      mainImage.src = btn.dataset.img;
      imageTitle.textContent = btn.dataset.title;
      
      // Remove highlight from all buttons
      buttons.forEach(b => b.classList.remove("active"));

      // Highlight the clicked button
      btn.classList.add("active");

      mainImage.classList.remove("zoom-in");
    void mainImage.offsetWidth;

    mainImage.src = btn.dataset.img;
    mainImage.classList.add("zoom-in");


    });
  });
  const form = document.getElementById("dForm");
if (form)
{
form.addEventListener("submit", function(e) {
  e.preventDefault(); // stop redirect

  if (confirm("Sure You Want To Save Your Work?")) {
    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());

    // Load existing accounts (array of objects)
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Add new account
    accounts.push(obj);

    // Save back to localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));

    console.log("Saved accounts:", accounts); // check in console
    alert("Account saved!");
    form.reset();
  }
});


// event handler for the reset button instead of onreset on the button itself
form.addEventListener("reset", function(e) { // 
  // Ask for confirmation before clearing
  if (!confirm("Sure you want to clear your data?")) {
    e.preventDefault(); // cancel the reset if user clicks "Cancel"
  }
});

const inputs = form.querySelectorAll("input, textarea, select");

inputs.forEach(input => {
  input.addEventListener("blur", function(e) {
    if (input.value.trim() === "") {
      // Look for an existing span with class "required" next to the input
      let span = input.parentElement.querySelector(".required");

      // If none exists, create one
      if (!span) {
        span = document.createElement("span");
        span.className = "required";
        input.parentElement.appendChild(span);
      }

      // Show the asterisk
      span.textContent = " *";
      span.style.color = "red";
      span.style.fontWeight = "bold";
    } else {
      // If the field is filled, remove the asterisk
      const span = input.parentElement.querySelector(".required");
      if (span) {
        span.textContent = "";
      }
    }
  });
});
}
