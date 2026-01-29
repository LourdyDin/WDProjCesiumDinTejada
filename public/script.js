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
  // read from the localStorage saved as a string - to see if there are anything saved on the users coomputer
let acctString = localStorage.getItem("accounts")
if (!acctString) { accountList = {} } // initialize the variable to contain the list of accounts object
else accountList = JSON.parse(acctString) // converts string into the correct data type in this case object

const form = document.getElementById("dForm"); // get the HTML form from q3ge2Mendoza.html

// event handler on the submit button instead of onsubmit on the button itself
form.addEventListener("submit", function(e) { // assign an event handler of submit to the form
    //e.preventDefault(); // prevent page reload because forms gets submitted

    if (confirm("Sure You Want To Save Your Work?")) {   
        // use a predefined class to create an object of data
        const data = new FormData(form);

        // Convert to object
        const obj = Object.fromEntries(data.entries()); // get all the data from the form
        // place the object inside the accountList
        // accountList is an object containing other objects with username as the key
        accountList[obj.uname] = {};
        for (let key in obj) { // go through the properties of the object and create another account
            if (key != "uname") { 
                accountList[obj.uname][key] = obj[key];
            }
        }
        
        console.log(accountList) // to check all the account information if it will be saved correctly
        acctString = JSON.stringify(accountList) // convert object into string, as a requirement of localStorage
        localStorage.setItem("accounts", acctString) // save on the user's computer
        form.submit();
    }
  });

// event handler for the reset button instead of onreset on the button itself
form.addEventListener("reset", function(e) { // 
  // Ask for confirmation before clearing
  if (!confirm("Sure you want to clear your data?")) {
    e.preventDefault(); // cancel the reset if user clicks "Cancel"
  }
});

// called when user is on the input field
function BlurFunction() {
  document.getElementById("myInput").style.backgroundColor = "";
}