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
