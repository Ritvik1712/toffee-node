const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const server = require("http").createServer(app);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ideally in the .env file, but made public for ease of deployment
const DATABASE = "toffee";
const MONGO_PASSWORD = "toor";
const MONGO_USER = "root";

const User = require("./models/users");
const Transaction = require("./models/transactions");

// set up DB access
var mongoose = require("mongoose");
const mongoDB = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.8dchtrd.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function () {
    console.log("Connedcted to db");
  })
  .catch(function (e) {
    console.error(e);
  });

app.get("/", (req, res) => {
  res.render("intro");
});

app.get("/:name", (req, res) => {
  let start = req.query.start;
  let end = req.query.end;
  let category = req.query.category;
  let username = parseInt(req.params.name);

  console.log(`url query: ${start} ${end} ${category}`);

  if (!start) {
    start = 0;
  }

  if (!end) {
    end = 999999999999999;
  }

  if (!category) {
    category = false;
  }

  Transaction.find({ username: username })
    .where("createdAt")
    .gt(start)
    .lt(end)
    .then((transactions) => {
      console.log(
        `Fetched ${transactions.length} transactions for ${username}`
      );
      transactions = transactions.sort(function compareFunction(a, b) {
        return a.createdAt - b.createdAt;
      });

      let total = 0;
      transactions.forEach((item) => {
        total += item.amount;
        console.log(item.createdAt);
      });

      res.render("home", {
        username: username,
        transactions: transactions,
        total: total,
      });
    })
    .catch((err) => console.error(err));
});

app.get("/:name/category", (req, res) => {
  let start = req.query.start;
  let end = req.query.end;
  console.log(`url query: ${start} ${end}`);

  if (!start) {
    start = 0;
  }

  if (!end) {
    end = 999999999999999;
  }

  Transaction.find({ username: req.params.name })
    .where("createdAt")
    .gt(start)
    .lt(end)
    .then((transactions) => {
      console.log(
        `Fetched ${transactions.length} transactions for ${req.params.name}`
      );

      let foodAndDrink = [];
      let lifestyle = [];
      let entertainment = [];
      let utilities = [];
      let home = [];
      let transportation = [];
      let misc = [];
      let totals = {};

      let foodTotal = 0;
      let lifeTotal = 0;
      let entertainmentTotal = 0;
      let utilitiesTotal = 0;
      let homeTotal = 0;
      let transportationTotal = 0;
      let miscTotal = 0;

      transactions.forEach((transaction) => {
        console.log(`At transaction: ${transaction.category}`);
        const date = new Date(parseInt(transaction.createdAt));
        console.log(transaction.createdAt);

        transaction.createdAt = date.toLocaleString();
        if (transaction.category == "foodAndDrink") {
          foodAndDrink.push(transaction);
          foodTotal += transaction.amount;
        } else if (transaction.category == "lifestyle") {
          lifestyle.push(transaction);
          lifeTotal += transaction.amount;
        } else if (transaction.category == "entertainment") {
          entertainment.push(transaction);
          entertainmentTotal += transaction.amount;
        } else if (transaction.category == "utilities") {
          utilities.push(transaction);
          utilitiesTotal += transaction.amount;
        } else if (transaction.category == "home") {
          home.push(transaction);
          homeTotal += transaction.amount;
        } else if (transaction.category == "transportation") {
          transportation.push(transaction);
          transportationTotal += transaction.amount;
        } else {
          misc.push(transaction);
          miscTotal += transaction.amount;
        }
      });

      totals["foodAndDrink"] = foodTotal;
      totals["lifestyle"] = lifeTotal;
      totals["entertainment"] = entertainmentTotal;
      totals["utilities"] = utilitiesTotal;
      totals["home"] = homeTotal;
      totals["transportation"] = transportationTotal;
      totals["misc"] = miscTotal;
      totals["total"] =
        foodTotal +
        lifeTotal +
        entertainmentTotal +
        utilitiesTotal +
        homeTotal +
        transportationTotal +
        miscTotal;

      res.render("categories", {
        username: req.params.name,
        foodAndDrink: foodAndDrink,
        lifestyle: lifestyle,
        entertainment: entertainment,
        utilities: utilities,
        home: home,
        transportation: transportation,
        misc: misc,
        totals: totals,
      });
    })
    .catch((err) => console.error(err));
});

app.get("/register/user/:username/:name", (req, res) => {
  let name = req.params.name;
  let username = req.params.username;
  const user = new User({
    username: username,
    name: name,
  });
  user
    .save()
    .then(() => {
      console.log(`${name} ${username} saved to db`);
      res.redirect(`/${username}`);
    })
    .catch((err) => console.error(err));
});

app.get(
  "/register/transaction/:username/:amount/:category/:date",
  (req, res) => {
    let username = req.params.username;
    let amount = req.params.amount;
    let category = req.params.category;
    let date = req.params.date;

    const transaction = new Transaction({
      username: username,
      amount: amount,
      category: category,
      createdAt: date,
    });

    transaction
      .save()
      .then(() => {
        console.log(`${username} ${amount} ${category} ${date} saved to db`);
        res.redirect(`/${username}`);
      })
      .catch((err) => console.error(err));
  }
);

app.post("/", (req, res) => {
  console.log("Got body:", req.body);
  res.sendStatus(200);
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${port}`);
});
