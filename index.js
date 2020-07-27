const fs = require("fs");
const csv = require("csvtojson");

const express = require('express');
const app = express();
var cors = require('cors');
const path = __dirname + "/public/index.html";

const { matchesPlayedPerYear, 
        matchesWonEachYear, 
        extraRuns, 
        topEconomicalBowlers, 
        matchesWonPerVenue } = require("./ipl/matches");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const result = [];
function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {
          result.push({"matchesPlayedPerYear" : matchesPlayedPerYear(matches) })
          result.push({"matchesWonEachYear" : matchesWonEachYear(matches) })
          result.push({"extraRuns": extraRuns(deliveries, matches)});
          result.push({"topEconomicalBowlers": topEconomicalBowlers(deliveries, matches)});
          result.push({"matchesWonPerVenue": matchesWonPerVenue(deliveries, matches)});
          saveData(result);
      });
   })
}

function saveData(result) {
  // const jsonData = {
  //   [name]: result
  // };
  const jsonString = JSON.stringify(result);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();



app.use(
  cors({
      credentials: true,
      origin: true
  })
);

app.options('*', cors());

app.use(express.static("public"));
app.get('/', function(req, res){
  // res.json("data")
  // res.sendFile(path);
});

const port = process.env.PORT || 8080;
app.listen(port, ()=> {
  console.log(`Server Running at : ${port}`);
})