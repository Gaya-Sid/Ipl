const fs = require("fs");
const csv = require("csvtojson");
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
          result.push({"matchesWonEachYear" : [...matchesWonEachYear(matches)] })
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
