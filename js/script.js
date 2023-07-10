console.log(("b" + "a" + +"a" + "a").toLowerCase());

let titrePrincipal = document.getElementById("titre-principal");
titrePrincipal.innerText = "Hello, Cyber!";

let button = document.getElementById("button");
button.addEventListener("click", () => {
  titrePrincipal.style.backgroundColor = "lightcoral";
});

let image = document.getElementById("pokemon-image");
let input = document.getElementById("pokemon-input");
let checkbox = document.getElementById("pokemon-shiny");

let results;
fetch(
  "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 151)
).then(async (data) => {
  results = await data.json();
  image.src = results.sprites.front_default;
  if (results.sprites.front_female === null) {
    checkbox.remove();
  }
});

image.addEventListener("mouseenter", () => {
  if (results !== null) {
    if (checkbox.checked) {
      image.src = results.sprites.back_female;
    } else {
      image.src = results.sprites.back_default;
    }
  }
});

image.addEventListener("mouseleave", () => {
  if (results !== null) {
    if (checkbox.checked) {
      image.src = results.sprites.front_female;
    } else {
      image.src = results.sprites.front_default;
    }
  }
});

input.addEventListener("keypress", (ev) => {
  if (ev.key === "Enter") {
    fetch(
      "https://pokeapi.co/api/v2/pokemon/" + input.value.toLowerCase()
    ).then(async (data) => {
      if (data.status == 404) {
        image.src =
          "https://upload.wikimedia.org/wikipedia/commons/3/3b/MissingNo.svg";
        results = null;
      } else {
        results = await data.json();
        image.src = results.sprites.front_default;
        if (results.sprites.front_female === null) {
          checkbox.remove();
        }
      }
    });
  }
});

checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    image.src = results.sprites.front_female;
  } else {
    image.src = results.sprites.front_default;
  }
});
