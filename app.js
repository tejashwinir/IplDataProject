let expect = require("chai").expect
let path = require("path");
let file = path.resolve("ipl.js");
let match = require(file);
const matches = path.resolve("csvFiles/matches.csv");
const deliveries = path.resolve("csvFiles/deliveries.csv");

match.convertingtoJson();
match.getMatchwon(matches);
match.getMatchID(matches,"2016");
match.fecthingData(matches);
match.convertingtoJsonQue5(deliveries);