function convertCategory(category) {
  mapping = {
    foodAndDrink: "Food and Drink",
    entertainment: "Entertainment",
    utilities: "Utilities",
    transportation: "Transportation",
    home: "Home",
    lifestyle: "Lifestyle",
    misc: "Miscellaneous",
  };

  console.log(mapping[category]);
}

function goToCategory(username) {
  console.log("hello bhai chalja please");
  console.log(username);
  window.location.replace(`/${username}/category`);
}

let btn = document.querySelector("#translate-btn");
let translate = document.querySelector("#google_translate_element");
btn.addEventListener("click", () => {
  console.log("yeettt");
  if (translate.style.display == "none") translate.style.display = "inline";
  else translate.style.display = "none";
});
