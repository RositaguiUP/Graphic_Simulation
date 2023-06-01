/*
*    main.js
*/


var margin = {top: 10, right: 10, bottom: 150, left:100};
var width = 600;
var height = 400;

var svg = d3.select("#chart-area").append("svg").attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom);
var g = svg.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("./data/buildings.json").then((data)=> {
  
  var maxHght = d3.max(data, (d) => { return d.height; })

  var x = d3.scaleBand().domain(data.map((d) => { return d.name; })).range([0, width]).paddingInner(0.3).paddingOuter(0.3);
  var y = d3.scaleLinear().domain([0, maxHght]).range([height, 0]);

  var colorScale = d3.scaleOrdinal().domain((d) => { return d.name; }).range(d3.schemeSet3);

  var rects = g.selectAll('rect').data(data).enter().append("rect").attr("x", (d) => { return x(d.name); }).attr("y", (d) => { return y(d.height);} )
    .attr("height", (d) => { return height - y(d.height); }).attr("width", x.bandwidth())
    .attr('fill', (d) => { return colorScale(d.name); });
	
  var bottomAxis = d3.axisBottom(x);
  g.append("g").attr("class", "bottom axis").attr("transform", "translate(0, " + height + ")").call(bottomAxis)
    .selectAll("text").attr("transform", "rotate(-40)").attr("dx", -5).attr("dy", 10).attr('text-anchor', 'end');


  var leftAxis = d3.axisLeft(y).ticks(5).tickFormat((d) => { return d + 'm'; });
  g.append('g').attr('class', 'y axis').call(leftAxis);


  g.append('text').attr('class', 'x axis-label').attr('x', width / 2).attr('y', height + 140).attr("font-size", "20px")
    .attr('text-anchor', 'middle').text("The world's tallest buildings");

  g.append('text').attr('class', 'y axis-label').attr('x', -(height / 2)).attr('y', -60).attr("font-size", "20px")
    .attr('text-anchor', 'middle').attr("transform", "rotate(-90)").text("Height (m)");  
  
});
