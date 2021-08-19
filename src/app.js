const express = require("express");
const chalk = require("chalk");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup static directory to serve
app.use(express.static(publicDir));

//setup handlebars engine and views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Burhanuddin Savliwala",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Burhanuddin Savliwala",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Burhanuddin Savliwala",
    msg: "Umme salma is a goodgirl \n She is very obedient and caring",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      message: "Address query is missing",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      //return console.log("Error:", chalk.red(error));
      return res.send({
        message: error,
      });
    }

    forecast(data, (error1, data1) => {
      if (error1) {
        //return console.log("Error:", chalk.redBright.bold(error1));
        return res.send({
          message: error1,
        });
      }
      //console.log(data.location);
      //console.log("Data:", chalk.green(JSON.stringify(data1)));
      res.send({
        forecast: data1,
        location: data.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    console.log("No Query passed");
    return res.send({
      message: "error you must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    msg: "Help article not found",
    name: "Burhanuddin Savliwala",
  });
});

app.get("*", (req, res) => {
  //* means anything else other than the routes mentioned above
  res.render("error", {
    title: "404",
    name: "Burhanuddin Savliwala",
    msg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log(chalk.blue.bold("Server started Successfully:)"));
});
