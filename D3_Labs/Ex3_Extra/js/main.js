/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg").attr("width", 400).attr("height", 900);

var i = 0;
d3.json("./data/buildings.json").then((data)=> {
    data.forEach((d)=>{
		d.height = +d.height;
        var x = i * 30;
        var rect = svg.append("rect").attr("x", x).attr("y", 900 - d.height).attr("height", d.height).attr("width", 10).attr("fill","blue");
        i += 1;
	});
	console.log(data);
});