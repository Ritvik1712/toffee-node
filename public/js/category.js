google.charts.load("current", { packages: ["corechart"] });

let transactions = foodAndDrink.concat(
  lifestyle,
  entertainment,
  utilities,
  home,
  transportation,
  misc
);

let months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  data.addRows([
    ["food & drinks", fnd],
    ["entertainment", ent],
    ["utilities", util],
    ["home", hme],
    ["lifestyle", life],
    ["transportation", trans],
    ["miscellaneous", msc],
  ]);

  // Set chart options
  var options = {
    title: "Expenditure by category",
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById("pie"));
  chart.draw(data, options);
}

google.charts.load("current", { packages: ["corechart", "bar"] });
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {
  let date = new Date();
  let days = date.getDate();
  let array = [["Day", "Expenditure"]];

  for (i = 1; i <= days; i++) {
    let startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      i,
      0,
      0,
      0
    ).valueOf();

    let endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      i + 1,
      0,
      0,
      0
    ).valueOf();

    let trans = [];
    let total = 0;
    transactions.forEach((transaction) => {
      if (
        transaction.createdAt * 1000 >= startDate &&
        transaction.createdAt * 1000 < endDate
      ) {
        trans.push(transaction);
        total += transaction.amount;
      }
    });

    array.push([`${months[date.getMonth() + 1]} ${i}`, total]);
  }

  var data = google.visualization.arrayToDataTable(array);

  var options = {
    title: "Daily expense for this month",
    hAxis: {
      title: "Total Expenditure",
      minValue: 0,
    },
    vAxis: {
      title: "Days",
    },
  };

  var chart = new google.visualization.BarChart(
    document.getElementById("column")
  );

  column = document.querySelector("#column");
  console.log(column);

  column.style.height = 150 + array.length * 35 + "px";

  chart.draw(data, options);
}

let btn = document.querySelector("#translate-btn");
let translate = document.querySelector("#google_translate_element");
btn.addEventListener("click", () => {
  console.log("yeettt");
  if (translate.style.display == "none") translate.style.display = "inline";
  else translate.style.display = "none";
});
