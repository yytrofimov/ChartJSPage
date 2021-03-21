//Access to XMLHttpRequest at 'https://datanomlabb.net/paul/json/data-diagram.json'
//from origin 'http://127.0.0.1:5500' has been blocked by CORS policy:
//No 'Access-Control-Allow-Origin' header is present on the requested resource.
//Så jag laddar ner filen och jobbar lokalt
//DetUppgiften säger att data kommer att tillhandahållas från olika objekt,
// det vill säga det kommer att finnas många filer med data, vilket innebär
// att funktionalitet för bearbetning av en lista med filer har implementerats
// Den andra datafilen är syntetisk och gjord för ett exempel
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
function draw_diagram(obj_ID, obj_labels, obj_data, isTemp, day_number) {
    if (isTemp) {
        obj_color = [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
        ];
        obj_borders_color = [
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
        ];
        obj_label = "day #" + day_number + "-" + (day_number + 2) + ", min temp, °C";
        obj_max_tick = 30;
        obj_type = "bar";
    } else {
        obj_color = [
            "rgba(39, 178, 243,0.5)",
            "rgba(39, 178, 243,0.5)",
            "rgba(39, 178, 243,0.5)",
            "rgba(39, 178, 243,0.5)",
        ];
        obj_borders_color = [
            "rgba(39, 178, 243,1)",
            "rgba(39, 178, 243,1)",
            "rgba(39, 178, 243,1)",
            "rgba(39, 178, 243,1)",
        ];
        obj_label = "day #" + day_number + "-" + (day_number + 2) + ", max humidity";
        obj_max_tick = 50;
        obj_type = "line";
    }
    let ctx = document.getElementById(obj_ID).getContext("2d");
    let myChart = new Chart(ctx, {
        type: obj_type,
        data: {
            labels: obj_labels,
            datasets: [
                {
                    label: obj_label,
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
                            max: obj_max_tick,
                            stepSize: 10,
                        },
                    },
                ],
            },
        },
    });
}

function get_diagram_blank(diagram_number, isTemp) {
    var diagram_container = document.createElement("div");
    var diagram = document.createElement("canvas");
    if (isTemp) {
        diagram_container.id = "diagram_" + diagram_number + "_temp_container";
        diagram.id = "diagram_" + diagram_number + "_temp";
    } else {
        diagram_container.id = "diagram_" + diagram_number + "_humidity_container";
        diagram.id = "diagram_" + diagram_number + "_humidity";
    }
    diagram_container.appendChild(diagram);
    document.body.appendChild(diagram_container);
    diagram_container.style.height = "400px";
    diagram_container.style.width = "700px";
    diagram.height = "400px";
    diagram.width = "700px";
    return diagram.id;
}
function create_diagram(filenames) {
    let dataset = get_data(filenames);
    let diagrams_counter = 0;
    for (datasample of dataset) {
        let obj_data = [];
        let obj_data_2 = [0];
        let obj_labels = [];
        let obj_labels_2 = [0, "18:00", "18:00", 0];
        for (i of datasample) {
            obj_labels.push(i["group"]["hour"] + ":00");
            obj_data.push(i["min"]["temperature"]);
            if (i["group"]["hour"] == 18) {
                obj_data_2.push(i["max"]["humidity"]);
            }
        }
        obj_data_2.push(0);
        let temp_dia_id = get_diagram_blank(diagrams_counter + 1, (isTemp = true));
        let humidity_dia_id = get_diagram_blank(diagrams_counter + 1, (isTemp = false));
        draw_diagram(temp_dia_id, obj_labels, obj_data, (isTemp = true), datasample[0]["group"]["day"]);
        draw_diagram(humidity_dia_id, obj_labels_2, obj_data_2, (isTemp = false), datasample[0]["group"]["day"]);
        diagrams_counter += 1;
    }
}
create_diagram(["data-diagram.json", "data-diagram_2.json"]);
