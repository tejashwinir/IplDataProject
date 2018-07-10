const fs = require('fs')
const path = require('path')
const matches = path.resolve("matches.csv")
let year = "2016"
getmatchNums(matches);
getMatchwon(matches);
getMatchID(matches,year)

getMatchID(dataset, "2016").then(function (data) {
        let deliveriesFileName=path.resolve("deliveries.csv")
    extraRuns(deliveriesFileName, data)
    
})

getMatchID(dataset, "2015").then(function (data) {
    let deliveriesFileName=path.resolve("deliveries.csv")
// extraRuns(deliveriesFileName, data)

})

//first question
function getmatchNums(dataset) {
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
            resolve(matchesPerSeason)
        })
    })

}

//first question object converting to Json
function convertingtoJson(){
    let matchesData = require('path').resolve("matches.csv");
    getmatchNums(matchesData).then(async function (matchesData) {
       let matchperyear = [];
       for (key in matchesData) {
           let matchAndSeason = {};
           matchAndSeason['label'] = key;
           matchAndSeason['y'] = matchesData[key];
           matchperyear.push(matchAndSeason);
       }
       require('fs').writeFile("wonMatchesInAllYear.json", JSON.stringify(matchperyear, null, 4), (err) => {
           if (err) {
               console.log(err);
               return;
           }
           console.log("wonMatchesInAllYear File Created");
       });
   })

}
convertingtoJson();


//second question 
function getMatchwon(matches) {
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
            resolve(teamNames)
        })
    })
}


//3.For the year 2016 plot the extra runs conceded per team.
function getMatchID(matches, year) {
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
            resolve(matchid);
        })
    })
}

const dataset = path.resolve("matches.csv")

function extraRuns(deliveriesFileName, match_ids) {

    return new Promise(function (resolve, reject) {
        let extraRunsPerTeam = {}
        fs.readFile(deliveriesFileName, function (err, data) {
            if (err) {
                reject(err)
            } else {
                data.toString().split("\n").forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const delivery = line.split(",")                                                                    
                        if(match_ids.includes(delivery[0])){
                            const bowlingTeam = delivery[3]

                            const extraRuns = delivery[16]
                        if (extraRunsPerTeam.hasOwnProperty(bowlingTeam)) {
                            extraRunsPerTeam[bowlingTeam] += Number(extraRuns)
                        } else {
                            extraRunsPerTeam[bowlingTeam] = Number(extraRuns)
                        }
                    }
                    }
                })
            }
            console.log(extraRunsPerTeam);
            
            resolve(extraRunsPerTeam)
        })
    })
}


module.exports = {
    getmatchNums: getmatchNums,
    getMatchID: getMatchID,
    extraRuns: extraRuns,
    getMatchwon: getMatchwon
}