const fs = require('fs');
const path = require('path');
const matches = path.resolve("matches.csv");
const deliveries = path.resolve("deliveries.csv");
let year = "2016"
getMatchwon(matches);


getMatchID(matches, "2016").then(function (data) {
    let deliveriesFileName = path.resolve("deliveries.csv");
    convertingtoJsonQue3(deliveriesFileName, data);
})

getMatchID(matches, "2015").then(function (data) {
    let deliveriesFileName = path.resolve("deliveries.csv");
    convertingtoJsonQue4(deliveriesFileName, data);
})

//--------------------------------first question
function getmatchNums(dataset) {
    return new Promise(function (resolve, reject) {
        let matchesPerSeason = {}
        fs.readFile(dataset, function (err, data) {
            if (err) {
                reject(err)
            } else {
                data.toString().split("\n").forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const match = line.split(",");
                        const season = match[1];
                        if (matchesPerSeason.hasOwnProperty(season)) {
                            matchesPerSeason[season]++;
                        } else {
                            matchesPerSeason[season] = 1;
                        }
                    }
                })
            }
            resolve(matchesPerSeason);
        })
    })

}

//-------------------------first question object converting to Json
function convertingtoJson() {
    let matchesData = require('path').resolve("matches.csv");
    getmatchNums(matchesData).then(async function (matchesData) {
        let matchperyear = [];
        for (key in matchesData) {
            let matchAndSeason = {};
            matchAndSeason['label'] = key;
            matchAndSeason['y'] = matchesData[key];
            matchperyear.push(matchAndSeason);
        }
        require('fs').writeFile("./Jsonfiles/wonMatchesInAllYear.json", JSON.stringify(matchperyear, null, 4), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("wonMatchesInAllYear File Created");
        });
    })

}
convertingtoJson();


//------------------second question: matches won of all teams over all the years of IPL
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
                        const winner = match[10];
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
            let matchs = [];
            for (key in teamNames) {
                let arr = [];
                for (innerKey in teamNames[key]) {
                    let obj = {
                        y: teamNames[key][innerKey],
                        label: innerKey
                    }
                    arr.push(obj);
                }
                let obj1 = {
                    teamNames: key,
                    label: arr
                }
                matchs.push(obj1);
            }
            require('fs').writeFile("./Jsonfil/matcheplayed.json", JSON.stringify(matchs, null, 4), (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("extraRunsConceded File Created");
            });
            resolve(teamNames);
        })
    })
}


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
                            matchid.push(parseInt(match[0]));
                        }
                    }
                })
            }
            resolve(matchid);
        })
    })
}
getMatchID(matches, year);

//--------------third question: For the year 2016 plot the extra runs conceded per team.
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
                        if (match_ids.includes(parseInt(delivery[0]))) {
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
            resolve(extraRunsPerTeam)
        })
    })
}

//-----------------------------third question object converting to Json

function convertingtoJsonQue3(deliveriesFileName, match_ids) {
    extraRuns(deliveriesFileName, match_ids).then(async function (matchesData) {
        let matchperyear = [];
        for (key in matchesData) {
            let matchAndSeason = {};
            matchAndSeason['label'] = key;
            matchAndSeason['y'] = matchesData[key];
            matchperyear.push(matchAndSeason);
        }
        require('fs').writeFile("./Jsonfiles/extraRunsConceded.json", JSON.stringify(matchperyear, null, 4), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("extraRunsConceded File Created");
        });
    })
}

//-------------------------------For the year 2015 plot the top economical bowlers.

function economicalRate(deliveries, matchId) {
    let economicRate = {};
    let total_runs = [];
    let temp_player = [];
    let playerObject = {};
    return new Promise(function (resolve, reject) {
        let extraRunsPerTeam = {}
        fs.readFile(deliveries, function (err, data) {
            if (err) {
                reject(err)
            } else {
                data.toString().split("\n").forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const delivery = line.split(",")
                        if (matchId.includes(parseInt(delivery[0]))) {
                            var player = delivery[8];
                            if (!total_runs[player]) {
                                temp_player.push(player)
                                total_runs[player] = {
                                    "id": delivery[0],
                                    "total_run": 0,
                                    "balls": 0,
                                    'over': 0,
                                    'economic_rate': 0
                                };
                            }
                            total_runs[player].total_run += parseInt(delivery[17]);
                            total_runs[player].balls++;
                            if (delivery[10] != 0) {
                                total_runs[player].balls--;
                            } else if (delivery[13] != 0) {
                                total_runs[player].balls--;
                            }
                        }
                    }

                })
            }
            for (let i = 0; i < temp_player.length; i++) {
                let player_obj = total_runs[temp_player[i]]
                let balls = player_obj.balls;
                let over = parseInt(balls) / 6;
                let economic_rate = parseInt(player_obj.total_run) / over;
                total_runs[temp_player[i]].over = over;
                total_runs[temp_player[i]].economic_rate = economic_rate;
                playerObject[temp_player[i]] = economic_rate;
            }
            var arr = sortObject(playerObject);

            function sortObject(playerObject) {
                var arr = [];
                for (var prop in playerObject) {
                    if (playerObject.hasOwnProperty(prop)) {
                        arr.push({
                            'key': prop,
                            'value': playerObject[prop]
                        });
                    }
                }
                arr.sort(function (a, b) {
                    return a.value - b.value;
                });
                return arr;
            }
            arr.sort(function (a, b) {
                return a.value - b.value;
            });
            let sortedArr = arr.splice(arr.length - 10, arr.length - 1);
            for (obj in sortedArr) {
                var key = sortedArr[obj].key;
                var value = sortedArr[obj].value;
                economicRate[key] = value;
            }
            resolve(economicRate);
        })
    })
}

//-----------------------------fourth question object converting to Json

function convertingtoJsonQue4(deliveries, matchId) {
    economicalRate(deliveries, matchId).then(async function (matchesData) {
        let matchperyear = [];
        for (key in matchesData) {
            let matchAndSeason = {};
            matchAndSeason['label'] = key;
            matchAndSeason['y'] = matchesData[key];
            matchperyear.push(matchAndSeason);
        }
        require('fs').writeFile("./Jsonfiles/economicRate.json", JSON.stringify(matchperyear, null, 4), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("economicRate File Created");
        });
    })
}


module.exports = {
    getmatchNums: getmatchNums,
    getMatchID: getMatchID,
    extraRuns: extraRuns,
    getMatchwon: getMatchwon,
    economicalRate: economicalRate
}