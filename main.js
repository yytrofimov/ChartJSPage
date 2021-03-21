// //Access to XMLHttpRequest at 'https://datanomlabb.net/paul/json/data-diagram.json'
// //from origin 'http://127.0.0.1:5500' has been blocked by CORS policy:
// //No 'Access-Control-Allow-Origin' header is present on the requested resource.
// //Så jag laddar ner filen och jobbar lokalt
function get_data(filenames) {
    for (filename of filenames) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", filename, false);
        xhr.send();
        if (xhr.status != 200) {
            console.log(xhr.status + ": " + xhr.statusText);
        } else {
            let dataset = JSON.parse(xhr.responseText);
            var dataPoints = [];
            console.log(Object.keys(dataset).length);
            for (i of dataset) {
                dataPoints.push({ x: i["group"]["hour"], y: i["min"]["temperature"] });
            }
            console.log(dataPoints);
            return dataPoints;
        }
    }
}

// get_data(["data-diagram.json"]);

window.onload = function () {
    dataPoints = get_data(["data-diagram.json"]);
    // var dataPoints = [];

    var options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Daily Sales Data",
        },
        axisX: {
        },
        axisY: {
            title: "°C",
            titleFontSize: 24,
        },
        data: [
            {
                type: "spline",
                yValueFormatString: "$#,###.##",
                dataPoints: dataPoints,
            },
        ],
    };
    $("#chartContainer").CanvasJSChart(options);
    console.log(dataPoints);
};
