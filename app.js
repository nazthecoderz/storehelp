// Barista Guide — quick drink lookup.
const drinks = [
  {
    name: "Latte",
    hot: [
      "Que Espresso Shots",
      "Add Steamed Milk (2%)",
      "Pour contents into cup"
    ],
    iced: [
      "Que Espresso Shots",
      "Add Milk (2%)",
      "Pour contents into cup"
    ],
    note: "Hot and iced instructions supplied by the user."
  },
  {
    name: "Mocha",
    hot: [
      "Add Mocha Sauce",
      "Que Espresso Shots",
      "Add Steamed milk (2%)",
      "Add Whip-cream"
    ],
    iced: [
      "Add Mocha Sauce",
      "Que Espresso Shots",
      "Add Milk (2%)",
      "Add Whip-Cream"
    ],
    note: "Hot and iced instructions supplied by the user."
  },
  {
    name: "Macchiato",
    hot: [
      "Add Vanilla syrup",
      "Que espresso shots",
      "Add milk (2%)",
      "Add ice",
      "Add carmel drizzle (7,7,2)"
    ],
    iced: [
      "Add Vanilla Syrup",
      "Que Espresso Shots",
      "Add Milk (2%)",
      "Add Ice",
      "Add Carmel drizzle (7,7,2)"
    ],
    note: "Hot and iced instructions supplied by the user."
  },
  {
    name: "Matcha",
    hot: [
      "Add classic syrup (to cup)",
      "Steam matcha powder + Milk (2%)",
      "Add contents to cup"
    ],
    iced: [
      "Add classic syrup (to cup)",
      "Add matcha powder (to blender)",
      "Add milk (2% to cup)",
      "Add ice (to blender)",
      "Add contents to cup"
    ],
    note: "Hot and iced instructions supplied by the user."
  },
  {
    name: "Shaken Blend Oat Espresso",
    hot: [
      "Que blonde shots",
      "Add syrup in shaker",
      "Add ice in shaker",
      "Add shots to shaker",
      "Add cinnamon",
      "Shake",
      "Pour into cup",
      "Add oat milk"
    ],
    noVariant: true,
    note: "Build instructions supplied by the user."
  },
  {
    name: "Flat White",
    hot: [
      "Que resteto shots",
      "Add steamed milk (25)",
      "Pour in the center of cup"
    ],
    iced: ["No iced build is recorded in your note."],
    note: "Hot instructions supplied by the user. No iced instructions supplied."
  },
  {
    name: "NV Cortado",
    hot: ["Build not added yet."],
    iced: ["Build not added yet."],
    noBuild: true
  }
];

const $ = id => document.getElementById(id);
let currentDrink = null;
let currentTemperature = "hot";

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
  $(screenId).classList.remove("hidden");
}

function buildDrinkMenu() {
  const menu = $("drinkMenu");
  menu.innerHTML = "";
  drinks.forEach(drink => {
    const button = document.createElement("button");
    button.className = "drink-choice";
    button.type = "button";
    button.innerHTML = `<span>${drink.name}</span><span>›</span>`;
    button.addEventListener("click", () => openDrink(drink));
    menu.appendChild(button);
  });
}

function openDrink(drink) {
  currentDrink = drink;
  currentTemperature = "hot";
  $("detailTitle").textContent = drink.name;
  $("variantRow").classList.toggle("hidden", Boolean(drink.noBuild || drink.noVariant));
  renderDrink();
  renderDrinkGuides();
  showScreen("detail");
}

function renderDrinkGuides() {
  const area = $("drinkGuides");
  const shot = currentDrink.noBuild ? "" : `
    <div class="guide-block"><div class="guide-title">ESPRESSO SHOTS</div>
      <div class="guide-variant"><b>Hot</b><span>Short 1 · Tall 1 · Grande 2 · Venti 2</span></div>
      <div class="guide-variant"><b>Iced</b><span>Tall 1 · Grande 2 · Venti 3</span></div></div>`;
  const pumps = ["Flat White", "NV Cortado"].includes(currentDrink.name) ? "" : `
    <div class="guide-block"><div class="guide-title">${currentDrink.name === "Mocha" ? "MOCHA SAUCE PUMPS" : "SYRUP PUMPS"}</div>
      <div class="guide-variant"><b>Hot</b><span>Tall 2 · Grande 4 · Venti 5</span></div>
      <div class="guide-variant"><b>Iced</b><span>Tall 2 · Grande 4 · Venti 6</span></div></div>`;
  area.innerHTML = shot + pumps;
}

function renderDrink() {
  document.querySelectorAll("[data-variant]").forEach(button => {
    button.classList.toggle("active", button.dataset.variant === currentTemperature);
  });
  $("detailTag").textContent = currentDrink.noBuild ? "BUILD NOT ADDED" : currentDrink.noVariant ? "BUILD" : currentTemperature.toUpperCase();
  const instructions = currentDrink.noVariant ? currentDrink.hot : currentDrink[currentTemperature];
  $("steps").innerHTML = instructions
    .map((instruction, index) => `<li><span class="num">${String(index + 1).padStart(2, "0")}</span><span>${instruction}</span></li>`)
    .join("");
}

buildDrinkMenu();

document.querySelectorAll("[data-variant]").forEach(button => {
  button.addEventListener("click", () => {
    currentTemperature = button.dataset.variant;
    renderDrink();
  });
});

document.querySelectorAll("[data-back]").forEach(button => {
  button.addEventListener("click", () => showScreen("home"));
});
