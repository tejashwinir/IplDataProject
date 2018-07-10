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
    var highchartContents = loadDoc("wonMatchesInAllYear.json");
    console.log(highchartContents);
    var chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        animationEnabled: true,
        title:{
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
            dataPoints: highchartContents
        }]
    });
    chart.render();

}
displayHighchart();