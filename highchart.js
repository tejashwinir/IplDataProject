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
    var highchartContents1 = loadDoc("./jsonfiles/wonMatchesInAllYear.json");
    var highchartContents2 = loadDoc("./jsonfiles/matchesPlayed.json");
    var highchartContents3 = loadDoc("./jsonfiles/extraRunsConceded.json");
    var highchartContents4 = loadDoc("./jsonfiles/economyRate.json");
    var highchartContents5 = loadDoc("./jsonfiles/highestSixes.json");

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

    var chart5 = new CanvasJS.Chart("chartContainer5", {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "number of sixes by a batsman"
        },
        subtitles: [{
            text: ""
        }],
        axisX: {
            title: "bowler"
        },
        axisY: {
            title: "sixes",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "sixes",
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
            name: "sixes",
            showInLegend: true,
            yValueFormatString: "#,##0.# sixes",
            dataPoints: highchartContents5
        }]
    });
    chart5.render();


}
displayHighchart();