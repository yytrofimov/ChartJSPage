// //Access to XMLHttpRequest at 'https://datanomlabb.net/paul/json/data-diagram.json'
// //from origin 'http://127.0.0.1:5500' has been blocked by CORS policy:
// //No 'Access-Control-Allow-Origin' header is present on the requested resource.
// //Så jag laddar ner filen och jobbar lokalt
function get_data(filenames) {
    let dataset = [];
    for (filename of filenames) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", filename, false);
        xhr.send();
        if (xhr.status != 200) {
            console.log(xhr.status + ": " + xhr.statusText);
        } else {
            let data = JSON.parse(xhr.responseText);
            dataset.push(data);
        }
    }
    return dataset;
}
function draw_diagram(obj_ID,obj_labels,obj_data,isTemp) {
    if (isTemp) {
        obj_color =[
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
        ]
        obj_borders_color = [
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
        ]
    }
    else {
        obj_color =[
            "rgba(104, 189, 218, 0.2)",
            "rgba(104, 189, 218, 0.2)",
            "rgba(104, 189, 218, 0.2)",
            "rgba(104, 189, 218, 0.2)",
            "rgba(104, 189, 218, 0.2)",
            "rgba(104, 189, 218, 0.2)",
        ]
        obj_borders_color = [
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
        ]

    }
    let ctx = document.getElementById(obj_ID).getContext("2d");
        let myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: obj_labels,
                datasets: [
                    {
                        label:
                            "day #" +
                            datasample[0]["group"]["day"] +
                            "-" +
                            (datasample[0]["group"]["day"] + 2) +
                            ", min temp, °C",
                        data: obj_data,
                        backgroundColor: obj_color,
                        borderColor: obj_borders_color,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max:30,
                                stepSize:10,
                            },
                        },
                    ],
                },
            },
        });
}
function create_diagram(filenames) {
    let dataset = get_data(filenames);
    let diagrams_counter = 0;
    for (let datasample of dataset) {
        let obj_data = [];
        let obj_data_2 = [];
        let obj_labels = [];
        for (i of datasample) {
            obj_labels.push(i["group"]["hour"] + ":00");
            obj_data.push(i["min"]["temperature"]);
            obj_data_2.push(i["max"]["humidity"]);
        }
        let diagram_container = document.createElement("div");
        diagram_container.id = "diagram_" + diagrams_counter + "_container";
        let diagram = document.createElement("canvas");
        diagram.id = "diagram_" + diagrams_counter;
        diagram_container.appendChild(diagram);
        diagram_container.style.height = "400px";
        diagram_container.style.width = "700px";
        diagram.height = "400px";
        diagram.width = "700px";

        document.body.appendChild(diagram_container);
        let ctx = document.getElementById("diagram_" + diagrams_counter).getContext("2d");
        let myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: obj_labels,
                datasets: [
                    {
                        label:
                            "day #" +
                            datasample[0]["group"]["day"] +
                            "-" +
                            (datasample[0]["group"]["day"] + 2) +
                            ", min temp, °C",
                        data: obj_data,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(255, 99, 132, 1)",
                            "rgba(255, 99, 132, 1)",
                            "rgba(255, 99, 132, 1)",
                            "rgba(255, 99, 132, 1)",
                            "rgba(255, 99, 132, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max:30,
                                stepSize:10,
                            },
                        },
                    ],
                },
            },
        });
        
        diagrams_counter += 1;
    }
}
// get_data(["data-diagram.json"]);
create_diagram(["data-diagram.json", "data-diagram_2.json"]);
