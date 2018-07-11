function loadDoc(file) {
    var filecontent = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            filecontent = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", file, false);
    xhttp.send();
    return filecontent;
}


function displayHighchart() {
    var highchartContents1 = loadDoc("./Jsonfiles/wonMatchesInAllYear.json");
    var highchartContents2 = loadDoc("./Jsonfiles/matchesPlayed.json");
    var highchartContents3 = loadDoc("./Jsonfiles/extraRunsConceded.json");
    var highchartContents4 = loadDoc("./Jsonfiles/economicRate.json");
console.log(highchartContents2);

    var chart = new CanvasJS.Chart("chartContainer1", {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "number of matches played per year"

        },
        subtitles: [{
            text: ""
        }],
        axisX: {
            title: "Season"
        },
        axisY: {
            title: "matches won per year",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "matches",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer"
        },
        data: [{
            type: "column",
            name: "Season",
            showInLegend: true,
            yValueFormatString: "#,##0.# matches",
            dataPoints: highchartContents1
        }]
    });
    chart.render();

    let chartObj = [];
    for (i = 0; i < highchartContents2.length; i++) {
        let obj = {
            type: "stackedBar",
            showInLegend: true,
            name: highchartContents2[i][0],
            dataPoints: highchartContents2[i][1]
        }
        chartObj.push(obj);
    }   
    var chart2 = new CanvasJS.Chart("chartContainer2", {
        title: {
            text: "IPL Team."
        },
        toolTip: {
            shared: true
        },
        axisY: {
            title: "Won match per Year"
        },
        data: chartObj
    });
    chart2.render();

    // var chart2 = new CanvasJS.Chart("chartContainer2", {

    //     exportEnabled: true,
    //     animationEnabled: true,
    //     title: {
    //         text: "matches won of all teams over all the years of IPL"
    //     },
    //     axisY: {
    //         interval: 10,
    //         //suffix: "%"
    //     },
    //     toolTip: {
    //         shared: true
    //     },
    //     data: [{
    //             type: "stackedBar100",
    //             toolTipContent: "{label}<br><b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Sunrisers Hyderabad",
    //             dataPoints: [{
    //                     "y": 10,
    //                     "label": "2013"
    //                 },
    //                 {
    //                     "y": 6,
    //                     "label": "2014"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2015"
    //                 },
    //                 {
    //                     "y": 11,
    //                     "label": "2016"
    //                 },
    //                 {
    //                     "y": 8,
    //                     "label": "2017"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Rising Pune Supergiant",
    //             dataPoints: [{
    //                 "y": 10,
    //                 "label": "2017"
    //             }]
    //         }, {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Kolkata Knight Riders",
    //             dataPoints: [{
    //                     "y": 6,
    //                     "label": "2008"
    //                 },
    //                 {
    //                     "y": 3,
    //                     "label": "2009"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2010"
    //                 }, {
    //                     "y": 8,
    //                     "label": "2011"
    //                 },
    //                 {
    //                     "y": 12,
    //                     "label": "2012"
    //                 },
    //                 {
    //                     "y": 6,
    //                     "label": "2013"
    //                 },
    //                 {
    //                     "y": 11,
    //                     "label": "2014"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2015"
    //                 },
    //                 {
    //                     "y": 8,
    //                     "label": "2016"
    //                 },
    //                 {
    //                     "y": 9,
    //                     "label": "2017"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} )",
    //             showInLegend: true,
    //             name: "Kings XI Punjab",
    //             dataPoints: [{
    //                     "y": 10,
    //                     "label": "2008"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2009"
    //                 },
    //                 {
    //                     "y": 4,
    //                     "label": "2010"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2011"
    //                 },
    //                 {
    //                     "y": 8,
    //                     "label": "2012"
    //                 },
    //                 {
    //                     "y": 8,
    //                     "label": "2013"
    //                 },
    //                 {
    //                     "y": 12,
    //                     "label": "2014"
    //                 },
    //                 {
    //                     "y": 3,
    //                     "label": "2015"
    //                 },
    //                 {
    //                     "y": 4,
    //                     "label": "2016"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2017"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Royal Challengers Bangalore",
    //             dataPoints: [{
    //                     "y": 4,
    //                     "label": "2008"
    //                 },
    //                 {
    //                     "y": 9,
    //                     "label": "2009"
    //                 },
    //                 {
    //                     "y": 8,
    //                     "label": "2010"
    //                 },
    //                 {
    //                     "y": 10,
    //                     "label": "2011"
    //                 },
    //                 {
    //                     "y": 8,
    //                     "label": "2012"
    //                 },
    //                 {
    //                     "y": 9,
    //                     "label": "2013"
    //                 },
    //                 {
    //                     "y": 5,
    //                     "label": "2014"
    //                 },
    //                 {
    //                     "y": 8,
    //                     "label": "2015"
    //                 },
    //                 {
    //                     "y": 9,
    //                     "label": "2016"
    //                 },
    //                 {
    //                     "y": 3,
    //                     "label": "2017"
    //                 }
    //             ]
    //         },{
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Mumbai Indians",
    //             dataPoints: [{
    //                     "y": 7,
    //                     "label": "2008"
    //                 },
    //                 {
    //                     "y": 5,
    //                     "label": "2009"
    //                 },
    //                 {
    //                     "y": 11,
    //                     "label": "2010"
    //                 },
    //                 {
    //                     "y": 10,
    //                     "label": "2011"
    //                 },
    //                 {
    //                     "y": 10,
    //                     "label": "2012"
    //                 },
    //                 {
    //                     "y": 13,
    //                     "label": "2013"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2014"
    //                 },
    //                 {
    //                     "y": 10,
    //                     "label": "2015"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2016"
    //                 },
    //                 {
    //                     "y": 12,
    //                     "label": "2017"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Delhi Daredevils",
    //             dataPoints: [{
    //                     "y": 7,
    //                     "label": "2008"
    //                 },
    //                 {
    //                     "y": 10,
    //                     "label": "2009"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2010"
    //                 },
    //                 {
    //                     "y": 4,
    //                     "label": "2011"
    //                 },
    //                 {
    //                     "y": 11,
    //                     "label": "2012"
    //                 },
    //                 {
    //                     "y": 3,
    //                     "label": "2013"
    //                 },
    //                 {
    //                     "y": 2,
    //                     "label": "2014"
    //                 },
    //                 {
    //                     "y": 5,
    //                     "label": "2015"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2016"
    //                 },
    //                 {
    //                     "y": 6,
    //                     "label": "2017"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Gujarat Lions",
    //             dataPoints: [{
    //                     "y": 9,
    //                     "label": "2016"
    //                 },
    //                 {
    //                     "y": 4,
    //                     "label": "2017"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name:"Chennai Super Kings",
    //             dataPoints: [{
    //                     "y": 9,
    //                     "label": "2008"
    //                 },
    //                 {
    //                     "y": 8,
    //                     "label": "2009"
    //                 },
    //                 {
    //                     "y": 9,
    //                     "label": "2010"
    //                 },
    //                 {
    //                     "y": 11,
    //                     "label": "2011"
    //                 },
    //                 {
    //                     "y": 10,
    //                     "label": "2012"
    //                 },
    //                 {
    //                     "y": 12,
    //                     "label": "2013"
    //                 },
    //                 {
    //                     "y": 10,
    //                     "label": "2014"
    //                 },
    //                 {
    //                     "y": 10,
    //                     "label": "2015"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Rajasthan Royals",
    //             dataPoints: [{
    //                     "y": 13,
    //                     "label": "2008"
    //                 },
    //                 {
    //                     "y": 6,
    //                     "label": "2009"
    //                 },
    //                 {
    //                     "y": 6,
    //                     "label": "2010"
    //                 },
    //                 {
    //                     "y": 6,
    //                     "label": "2011"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2012"
    //                 },
    //                 {
    //                     "y": 11,
    //                     "label": "2013"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2014"
    //                 },
    //                 {
    //                     "y": 7,
    //                     "label": "2015"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Deccan Chargers",
    //             dataPoints: [{
    //                     "y": 2,
    //                     "label": "2008"
    //                 },
    //                 {
    //                     "y": 9,
    //                     "label": "2009"
    //                 },
    //                 {
    //                     "y": 8,
    //                     "label": "2010"
    //                 },
    //                 {
    //                     "y": 6,
    //                     "label": "2011"
    //                 },
    //                 {
    //                     "y": 4,
    //                     "label": "2012"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Pune Warriors",
    //             dataPoints: [{
    //                     "y": 4,
    //                     "label": "2011"
    //                 },
    //                 {
    //                     "y": 4,
    //                     "label": "2012"
    //                 },
    //                 {
    //                     "y": 4,
    //                     "label": "2013"
    //                 }
    //             ]
    //         },
    //         {
    //             type: "stackedBar100",
    //             toolTipContent: "<b>{name}:</b> {y} (#percent%)",
    //             showInLegend: true,
    //             name: "Kochi Tuskers Kerala",
    //             dataPoints: [{
    //                 "y": 6,
    //                 "label": "2011"
    //             }]
    //         }

    //     ]
    // });
    // chart2.render();

    var chart3 = new CanvasJS.Chart("chartContainer3", {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "In the year 2016 the extra runs conceded per team"
        
        },
        subtitles: [{
            text: ""
        }],
        axisX: {
            title: "Team"
        },
        axisY: {
            title: "extra runs conceded",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "extraRuns",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer"
        },
        data: [{
            type: "column",
            name: "extraRuns",
            showInLegend: true,
            yValueFormatString: "#,##0.# extraRuns",
            dataPoints: highchartContents3
        }]
    });
    chart3.render();

    var chart4 = new CanvasJS.Chart("chartContainer4", {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "In the year 2015 the top economical bowlers"

        },
        subtitles: [{
            text: ""
        }],
        axisX: {
            title: "bowlers"
        },
        axisY: {
            title: "Economic rate",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "economicRate",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer"
        },
        data: [{
            type: "column",
            name: "extraRuns",
            showInLegend: true,
            yValueFormatString: "#,##0.# economicRate",
            dataPoints: highchartContents4
        }]
    });
    chart4.render();


}
displayHighchart();