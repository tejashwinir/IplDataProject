let fs = require("fs");
let path = require("path");
let year = "2016";

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
    let matchesData = require("path").resolve("csvFiles/matches.csv");
    getmatchNums(matchesData).then(async function (matchesData) {
        let matchperyear = [];
        for (key in matchesData) {
            let matchAndSeason = {};
            matchAndSeason['label'] = key;
            matchAndSeason['y'] = matchesData[key];
            matchperyear.push(matchAndSeason);
        }
        require("fs").writeFile("./jsonfiles/wonMatchesInAllYear.json", JSON.stringify(matchperyear, null, 4), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    })

}



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
            for (let key in teamNames) {
                let arr = [];
                for (let innerKey in teamNames[key]) {
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
            require('fs').writeFile("./jsonfiles/matcheplayed.json", JSON.stringify(matchs, null, 4), (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
            resolve(teamNames);
        })
    })
}

//-----------------------getting match Ids
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
                        if (year === match[1]) {
                            matchid.push(parseInt(match[0]));
                        }
                    }
                })
            }
            resolve(matchid);
        })
    })
}


// //--------------third question: For the year 2016 plot the extra runs conceded per team.

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

// //-----------------------------third question object converting to Json

function convertingtoJsonQue3(deliveriesFileName, match_ids) {
    extraRuns(deliveriesFileName, match_ids).then(async function (matchesData) {
        let matchperyear = [];
        let key;
        for (key in matchesData) {
            let matchAndSeason = {};
            matchAndSeason["label"] = key;
            matchAndSeason["y"] = matchesData[key];
            matchperyear.push(matchAndSeason);
        }
        require("fs").writeFile("./jsonfiles/extraRunsConceded.json", JSON.stringify(matchperyear, null, 4), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    })
}

// //-------------------------------For the year 2015 plot the top economical bowlers.

function economyRate(deliveries, matchId) {
    let economyRate = {};
    let total_runs = [];
    let temp_player = [];
    return new Promise(function (resolve, reject) {
        let extraRunsPerTeam = {}
        fs.readFile(deliveries, function (err, data) {
            if (err) {
                reject(err)
            } else {
                data.toString().split("\n").forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const delivery = line.split(",");
                        if (matchId.includes(parseInt(delivery[0]))) {
                            var player = delivery[8];
                            if (!total_runs[player]) {
                                temp_player.push(player)
                                total_runs[player] = {
                                    "id": delivery[0],
                                    "total_run": 0,
                                    "balls": 0,
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
            economyRate = calculatingEconomyRate(temp_player, total_runs)
            resolve(economyRate);
        })
    })
}

//-------------------calculating Economical Rate

function calculatingEconomyRate(temp_player, total_runs) {
    let economyRate = {};
    let playerObject = {};
    for (let i = 0; i < temp_player.length; i++) {
        let player_obj = total_runs[temp_player[i]]
        let balls = player_obj.balls;
        let over = parseInt(balls) / 6;
        let economic_rate = parseInt(player_obj.total_run) / over;
        playerObject[temp_player[i]] = economic_rate;
    }
    var arr = sortObject(playerObject);
    arr.sort(function (a, b) {
        return a.value - b.value;
    });

    let sortedArr = []
    if (arr.length > 10) {
        sortedArr = arr.splice(arr.length - 10, arr.length - 1);
    } else {
        sortedArr = arr
    }

    for (obj in sortedArr) {
        var key = sortedArr[obj].key;
        var value = sortedArr[obj].value;
        economyRate[key] = value;
    }
    return economyRate;
}

// //-----------------------------fourth question object converting to Json

function convertingtoJsonQue4(deliveries, matchId) {
    economyRate(deliveries, matchId).then(async function (matchesData) {
        let matchperyear = [];
        let key;
        for (key in matchesData) {
            let matchAndSeason = {};
            matchAndSeason["label"] = key;
            matchAndSeason["y"] = matchesData[key];
            matchperyear.push(matchAndSeason);
        }
        require("fs").writeFile("./jsonfiles/economyRate.json", JSON.stringify(matchperyear, null, 4), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    })
}

function fecthingData(matches) {
    getMatchID(matches, year).then(function (data) {
        let deliveriesFileName = path.resolve("csvFiles/deliveries.csv");
        convertingtoJsonQue3(deliveriesFileName, data);
    })

    getMatchID(matches, "2015").then(function (data) {
        let deliveriesFileName = path.resolve("csvFiles/deliveries.csv");
        convertingtoJsonQue4(deliveriesFileName, data);
    })

}

// //------------------------fifth question:

function highestSixes(deliveriesFileName) {
    bowlers = {};
    return new Promise(function (resolve, reject) {
        let highestSixPerTeam = {}
        fs.readFile(deliveriesFileName, function (err, data) {
            if (err) {
                reject(err)
            } else {
                data.toString().split("\n").forEach(function (line, index, arr) {
                    if (index !== 0) {
                        const delivery = line.split(",")
                        const batsman = delivery[6];
                        const sixes = delivery[15];
                        if (sixes == 6) {
                            if (highestSixPerTeam.hasOwnProperty(batsman)) {
                                highestSixPerTeam[batsman]++;
                            } else {
                                highestSixPerTeam[batsman] = 1;
                            }
                        }
                    }

                })
            }
            var arr = sortObject(highestSixPerTeam);
            arr.sort(function (a, b) {
                return a.value - b.value;
            });
            let sortedArr = []
            if (arr.length > 10) {
                sortedArr = arr.splice(arr.length - 10, arr.length - 1);
            } else {
                sortedArr = arr
            }
            for (obj in sortedArr) {
                var key = sortedArr[obj].key;
                var value = sortedArr[obj].value;
                bowlers[key] = value;
            }
            resolve(bowlers)
        })
    })
}

// //-------------------converting to json file

function convertingtoJsonQue5(deliveries) {
    highestSixes(deliveries).then(async function (matchesData) {
        let matchperyear = [];
        let key;
        for (key in matchesData) {
            let matchAndSeason = {};
            matchAndSeason["label"] = key;
            matchAndSeason["y"] = matchesData[key];
            matchperyear.push(matchAndSeason);
        }
        require("fs").writeFile("./jsonfiles/highestSixes.json", JSON.stringify(matchperyear, null, 4), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    })
}
// //--------------sorting an object by values

function sortObject(playerObject) {
    var arr = [];
    for (var prop in playerObject) {
        if (playerObject.hasOwnProperty(prop)) {
            arr.push({
                "key": prop,
                "value": playerObject[prop]
            });
        }
    }
    arr.sort(function (a, b) {
        return a.value - b.value;
    });
    return arr;
}

module.exports = {
    getmatchNums: getmatchNums,
    getMatchID: getMatchID,
    getMatchwon: getMatchwon,
    extraRuns: extraRuns,
    economyRate: economyRate,
    highestSixes: highestSixes,
    convertingtoJson: convertingtoJson,
    convertingtoJsonQue3: convertingtoJsonQue3,
    fecthingData: fecthingData,
    convertingtoJsonQue5: convertingtoJsonQue5,
}