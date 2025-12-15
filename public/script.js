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
  