google.charts.load("current", { packages: ["corechart"] });
console.log(fnd);
console.log(life);
console.log(ent);
console.log(home);
console.log(util);
console.log(trans);
console.log(misc);
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
    ["home", home],
    ["lifestyle", life],
    ["transportation", trans],
    ["miscellaneous", misc],
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
  var data = google.visualization.arrayToDataTable([
    ["Week Number", "Expenditure"],
    ["Week 1", 3413],
    ["Week 2", 5413],
    ["Week 3", 2313],
    ["Week 4", 9413],
  ]);

  var options = {
    title: "Expenditure of this month per week",
    hAxis: {
      title: "Total expenditure",
      minValue: 0,
    },
    vAxis: {
      title: "This month",
    },
  };

  var chart = new google.visualization.BarChart(
    document.getElementById("column")
  );

  chart.draw(data, options);
}
