
function getmatchNums(dataset) {
    console.log(dataset);
    let fs = require("fs");
    return new Promise(function (resolve, reject) {
        let matchesPerSeason = {}
        fs.readFile(dataset, function (err, data) {
            if (err) {
                reject(err)
            } else {
                data.toString().split("\n").forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const match = line.split(",")
                        const season = match[1]
                        if (matchesPerSeason.hasOwnProperty(season)) {
                            matchesPerSeason[season]++
                        } else {
                            matchesPerSeason[season] = 1
                        }
                    }
                })
            }
            //console.log(matchesPerSeason);
            resolve(matchesPerSeason)
        })
    })

}


// const fs = require('fs')
// const path = require('path')
// const dataset = path.resolve("2ndque.csv")
// let year = "2016"
// getMatchwon(dataset, year)

function getMatchwon(matches) {
    var fs = require("fs");
    var teamNames = {}
    return new Promise(function (resolve, reject) {
        fs.readFile(matches, function (err, matches) {
            if (err) {
                reject(err)
            } else {
                matches.toString().split("\n").forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const match = line.split(",");
                        const year = match[1];
                        const winner = match[2];
                        if (teamNames.hasOwnProperty(winner)) {
                            if (teamNames[winner].hasOwnProperty(year))
                                teamNames[winner][year]++;
                            else
                                teamNames[winner][year] = 1;
                        } else {
                            teamNames[winner] = {};
                            teamNames[winner][year] = 1;
                        }
                    }
                })


            }

            console.log(teamNames);
            
            resolve(teamNames)
        })
    })
}

//3.For the year 2016 plot the extra runs conceded per team.
function getMatchID(matches, year) {
    var fs = require("fs");
    var path = require("path");
    var matches = path.resolve("match1.csv");
    var matchid = [];
    return new Promise(function (resolve, reject) {
        fs.readFile(matches, function (err, matches) {
            if (err) {
                reject(err)
            } else {
                matches.toString().split("\n").forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const match = line.split(",");

                        if (year == match[1]) {
                            matchid.push(match[0]);
                        }
                    }
                })
            }
            resolve(matchid)
        })
    })
}

function extra_runs(delivery, year) {
    return new Promise(function (resolve, reject) {
        let matchesPerSeason = {}
        console.log("jasgd");

        fs.readFile(dataset, function (err, data) {
            if (err) {
                reject(err)
            } else {
                data.toString().split("\n").forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const match = line.split(",")
                        const season = match[1]
                        if (matchesPerSeason.hasOwnProperty(season)) {
                            matchesPerSeason[season]++
                        } else {
                            matchesPerSeason[season] = 1
                        }
                    }
                })
            }
            resolve(matchesPerSeason)
        })
    })
}



module.exports = {
    getmatchNums: getmatchNums,
    getMatchID: getMatchID,
    extra_runs: extra_runs,
    getMatchwon: getMatchwon
}