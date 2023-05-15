/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg").attr("width", 400).attr("height", 400);

var data = [25, 20, 15, 10, 5];

for (var i = 0; i < data.length; i++) {
    var x = i * 30;
    console.log(x);
    var rect = svg.append("rect").attr("x", x).attr("y", 50 - data[i]).attr("width", 20).attr("height", data[i]).attr("fill","red");
}

    