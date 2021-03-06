let expect = require("chai").expect
let path = require("path")
let file = path.resolve("ipl.js")
let match = require(file)

describe("ipl", function () {
    it("number of matches played per year of all the years", function (done) {
        let fileName = path.resolve("./testSamples/question1matches.csv");
        let expectedResult = {
            '2017': 2,
            '2016': 2,
            '2015': 1
        }

        match.getmatchNums(fileName).then(function (data) {
            try {
                expect(data).deep.equals(expectedResult);
                done();
            } catch (e) {
                done(e);
            }
        })

    })

    it("matches won of all teams over all the years of IPL", function (done) {
        let fileName = path.resolve("./testSamples/question2.csv");
        const expectedResult = {

            "Royal Challengers Bangalore": {
                "2008": 1,
                "2009": 1
            },

            "Kolkata Knight Riders": {
                "2010": 1,
                "2017": 1
            },
            "Kings XI Punjab": {
                "2008": 1
            },
            "Deccan Chargers": {
                "2009": 1
            },
            "Mumbai Indians": {
                "2010": 1,
                "2017": 2
            }

        };
        match.getMatchwon(fileName).then(function (data) {
            try {
                expect(data).deep.equals(expectedResult);
                done();
            } catch (e) {
                done(e);
            }
        })

    })

    it("fetching match ids", async function () {
        const matches = path.resolve("./testSamples/ques3TestMatches.csv")
        const expectedResult = [
            577, 578, 579, 580, 581, 582, 583,
            584, 585, 586, 587, 588, 589, 590,
        ]
        const year = "2016";

        const result = await match.getMatchID(matches, year);
        expect(result).deep.equal(expectedResult);
        const failureResult = [0, 1];
        expect(failureResult).not.deep.equal(expectedResult);
    })


    it("For the year 2016 plot the extra runs conceded per team.", async function () {
        let deliveriesFileName = path.resolve("./testSamples/ques3deliveries.csv");

        const match_ids = [1, 2];
        const expectedResult = {
            'Sunrisers Hyderabad': 6,
            'Royal Challengers Bangalore': 3
        }
        const result = await match.extraRuns(deliveriesFileName, match_ids);
        expect(result).deep.equals(expectedResult);
    })

    it(" For the year 2015 plot the top economical bowlers", async function () {
        let deliveriesFileName = path.resolve("./testSamples/question4.csv");
        const match_ids = [536, 553];
        const expectedResult = {
            'Sandeep Sharma': 6,
            'AM Rahane': 1.5,
        }

        const result = await match.economyRate(deliveriesFileName, match_ids);
        expect(result).deep.equals(expectedResult);

    })


    it("highest six by batman", function (done) {
        let fileName = path.resolve("./testSamples/question5.csv");


        let expectedResult = {
            'BB McCullum': 4,
            'SC Ganguly': 2
        }

        match.highestSixes(fileName).then(function (data) {
            try {
                console.log(data)
                expect(data).deep.equals(expectedResult);
                done();
            } catch (e) {
                done(e);
            }
        })

    })

})