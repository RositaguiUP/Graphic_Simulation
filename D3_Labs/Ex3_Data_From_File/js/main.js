/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg").attr("width", 400).attr("height", 400);

d3.csv("./data/ages.csv").then((data)=> {
    data.forEach((d)=>{
		d.age = +d.age;
	});
	console.log(data);
});

d3.tsv("./data/ages.tsv").then((data)=> {
    data.forEach((d)=>{
		d.age = +d.age;
	});
	console.log(data);
});

var i = 5;

d3.json("./data/ages.json").then((data)=> {
    data.forEach((d)=>{
		d.age = +d.age;
        var x = i * 30;
        var crcl = svg.append("circle").attr("cx", x).attr("cy", 50 - d.age).attr("r", d.age);
        if (d.age > 10) {
            crcl.attr("fill","blue");
        } else {
            crcl.attr("fill","red");
        }
        i += 1;
	});
	console.log(data);
});

// error 
d3.json("/data/users.json").then((data) => {
    console.log(data); 
}).catch((error)=> {
    console.warn(error);
});

