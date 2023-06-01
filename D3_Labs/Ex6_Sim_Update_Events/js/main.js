/*
*    main.js
*/

var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 600;
var height = 400;
var flag = true;

var svg = d3.select("#chart-area").append("svg").attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom).attr('fill', "black");;
var g = svg.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// Scales
var x = d3.scaleBand().range([0, width]).paddingInner(0.3).paddingOuter(0.3);
var y = d3.scaleLinear().range([height, 0]);

// Labels
g.append('text').attr('class', 'x axis-label').attr('x', width / 2).attr('y', height + 50).attr("font-size", "20px")
.attr('text-anchor', 'middle').style("fill","white").text("Month");

var yLabel = g.append('text').attr('class', 'y axis-label').attr('x', -(height / 2)).attr('y', -60).attr("font-size", "20px")
.attr('text-anchor', 'middle').attr("transform", "rotate(-90)").style("fill","white").text("Revenue (dlls.)");

// Axis
var xAxisGroup = g.append("g").attr("class", "x axis").attr("transform", "translate(0, " + height + ")")

var yAxisGroup = g.append("g").attr("class", "y axis");

// Data
d3.json("./data/revenues.json").then((data)=> {
  data.forEach((d)=>{
    d.revenue = +d.revenue;
    d.profit  = +d.profit;
    console.log(d.month)
	});

  d3.interval( ( ) => {
    update(data);
    flag = !flag;
  }, 1000);
  
}).catch((error)=> {
  console.log(error);
});

update = (data) => {
  var value = flag ? "revenue" : "profit";

  var maxHght = d3.max(data, (d) => { return d[value]; })

  x.domain(data.map((d) => { return d.month; }));
  y.domain([0, maxHght]);

	var xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall).selectAll("text").style("fill","white");
  g.select(".x.axis").select(".domain").attr("stroke", "white");

  var yAxisCall = d3.axisLeft(y).ticks(5).tickFormat((d) => { return '$' + d/1000 + 'K'; });
  yAxisGroup.call(yAxisCall).selectAll("text").style("fill","white");
  g.select(".y.axis").select(".domain").attr("stroke", "white");

  var rects = g.selectAll('rect').data(data);
  
  rects.exit().remove();

  // Update
  rects.attr("x", (d) => { return x(d.month); }).attr("y", (d) => { return y(d[value]);} )
    .attr("height", (d) => { return height - y(d[value]); }).attr("width", x.bandwidth());
    
  rects.enter().append("rect").attr("x", (d) => { return x(d.month); }).attr("y", (d) => { return y(d[value]);} )
    .attr("height", (d) => { return height - y(d[value]); }).attr("width", x.bandwidth())
    .attr('fill', "yellow");

  var label = flag ? "Revenue" : "Profit";
  yLabel.text(label);

}

