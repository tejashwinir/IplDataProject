let expect = require("chai").expect
let path = require("path")
let file = path.resolve("app.js")
// let smapleData=path.resolve("test.csv")
let match = require(file)

describe("ipl", function () {
    // int maId=[];
    it("number of matches played per year of all the years", function (done) {
        let fileName = path.resolve("./test.csv")
        let expectedResult = {
            '2017': 2,
            '2016': 2,
            '2015': 1
        }

        match.getmatchNums(fileName).then(function (data) {
            try {
                expect(data).deep.equals(expectedResult);
                console.log(data);
                console.log(expectedResult);


                done();
            } catch (e) {
                done(e);
            }
        })

    })

    it("matches won of all teams over all the years of IPL", function (done) {
        let fileName = path.resolve("./2ndque.csv")
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
                expect(data).deep.equals(expectedResult)
                done();
            } catch (e) {
                done(e);
            }
        })

    })


    it("fetching matches ids", function (done) {
        let matches = path.resolve("./match.csv")
        const expectedResult = [
            "577", "578","579","580","581","582","583",
            "584","585", "586","587", "588", "589", "590",
        ]
        let year = "2016"
        match.getMatchID(matches, year).then(function (data) {
            try {
                expect(data).deep.equals(expectedResult);
                done();
            } catch (e) {
                done(e);
            }
        })

    })


    // it("For the year 2016 plot the extra runs conceded per team.",function(done) {
    //     let deliveries=path.resolve("./delivery.csv")
    //     const expectedResult={
    //         'Rising Pune Supergiants': 108,
    //         'Mumbai Indians': 102,
    //         'Kolkata Knight Riders': 122,
    //         'Delhi Daredevils': 106,
    //         'Gujarat Lions': 98,
    //         'Kings XI Punjab': 100,
    //         'Sunrisers Hyderabad': 107,
    //         'Royal Challengers Bangalore': 156 
    //     }
    //     match.extra_runs(deliveries,matches).then(function(data){
    //         try{
    //             expect(data).deep.equals(expectedResult);
    //             console.log(data);
    //             console.log(expectedResult);


    //             done();
    //         }
    //         catch(e)
    //         {
    //             done(e);
    //         }
    //     })

    //    })



})