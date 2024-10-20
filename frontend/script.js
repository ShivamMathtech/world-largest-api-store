var typed = new Typed("#element", {
  strings: ["FOOD API", "DRESS API", "DRINKS API", "CAR API", "OTHER API"],
  typeSpeed: 50,
  loop: true,
});

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content-section");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute("data-target");

      // Hide all sections
      sections.forEach((section) => {
        section.style.display = "none";
      });

      // Show the target section
      document.getElementById(targetId).style.display = "block";
    });
  });

  // Show the first section by default
  document.getElementById("section1").style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  const pizzaCardsContainer = document.getElementById("pizza-cards");
  const showMoreBtn = document.getElementById("show-more-btn");
  let pizzaData = [];
  let currentIndex = 0;
  const cardsPerRow = 3; // Number of cards per row

  // Fetch the JSON file (update the path if needed)
  fetch("pizzas.json")
    .then((response) => response.json())
    .then((data) => {
      pizzaData = data;
      renderCards();
    })
    .catch((error) => console.error("Error fetching JSON:", error));

  // Function to render the cards
  function renderCards() {
    const newCards = pizzaData.slice(currentIndex, currentIndex + cardsPerRow);
    newCards.forEach((pizza) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                <img src="${pizza.imageSrc}" alt="${pizza.title}">
                <h3>${pizza.title}</h3>
                <p>Price: $${pizza.price}</p>
                <button>${pizza.ingredientButton}</button>
            `;
      pizzaCardsContainer.appendChild(card);
    });
    currentIndex += cardsPerRow;
    if (currentIndex >= pizzaData.length) {
      showMoreBtn.style.display = "none";
    }
  }

  // Event listener for the "Show More" button
  showMoreBtn.addEventListener("click", () => {
    renderCards();
  });
});
