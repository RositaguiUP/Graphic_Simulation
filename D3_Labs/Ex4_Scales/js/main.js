/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg").attr("width", 500).attr("height", 500);

d3.json("./data/buildings.json").then((data)=> {
  
  var maxHght = d3.max(data, (d) => { return d.height; })

  var x = d3.scaleBand().domain(data.map((d) => { return d.name; })).range([0, 400]).paddingInner(0.3).paddingOuter(0.3);
  var y = d3.scaleLinear().domain([0, maxHght]).range([0, 400]);

  var colorScale = d3.scaleOrdinal().domain((d) => { return d.name; }).range(d3.schemeSet3);

  data.forEach((d)=>{
    svg.append("rect").attr("x", x(d.name)).attr("y", 500 - y(d.height))
      .attr("height", y(d.height)).attr("width", x.bandwidth()).attr('fill', colorScale(d.name));
	});
  
});
