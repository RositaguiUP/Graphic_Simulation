/*
*    main.js
*/

var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 600;
var height = 400;

var svg = d3.select("#chart-area").append("svg").attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom).attr('fill', "black");;
var g = svg.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// Scales
var x = d3.scaleLog().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var area = d3.scaleLinear().range([25*Math.PI, 1500*Math.PI]);

// Labels
g.append('text').attr('class', 'x axis-label').attr('x', width / 2).attr('y', height + 50).attr("font-size", "20px")
.attr('text-anchor', 'middle').style("fill","white").text("GDP Per Capita($)");

var yLabel = g.append('text').attr('class', 'y axis-label').attr('x', -(height / 2)).attr('y', -60).attr("font-size", "20px")
.attr('text-anchor', 'middle').attr("transform", "rotate(-90)").style("fill","white").text("Life Expectancy (Years)");

var legend = g.append("g").attr("transform", "translate(" + (width - 10) + "," + (height - 125) + ")");

// Axis
var xAxisGroup = g.append("g").attr("class", "x axis").attr("transform", "translate(0, " + height + ")")

var yAxisGroup = g.append("g").attr("class", "y axis");



d3.json("data/data.json").then(function(data){
	console.log(data);
});

// Data
var continents = ["africa", "americas", "asia", "europe"];

d3.json("./data/data.json").then((data)=> {
	years = data.map ( (d) => {
		return d.year;
	});

	formData = data.map((year) => {
		return year["countries"].filter((country) => {
			var dataExists = (country.income && country.life_exp);
			return dataExists;
		}).map((country) => {
			country.income = +country.income;
			country.life_exp = +country.life_exp;
			return country;
		})
	});

	yearsLen = years.length;

	continents.forEach((continent, i) => {
		var legendRow = legend.append("g").attr("transform", "translate(0, " + (i * 20) + ")");
		legendRow.append("rect").attr("width", 10).attr("height", 10).attr("fill", colors[continent]);
		legendRow.append("text").attr("x", -10).attr("y", 10).attr("text-anchor", "end").style("text-transform", "capitalize").text(continent);
	});

	d3.interval( ( ) => {
		index = (index < 214) ? index+1 : 0;
			update(formData[index]);
	}, 1000);
  
}).catch((error)=> {
  console.log(error);
});

update = (data) => {

  var maxHght = d3.max(data, (d) => { return d[value]; })

  x.domain([142, 150000]).base(10);
  y.domain([0, 90]);
  area.domain([2000, 1400000000]);

  var xAxisCall = d3.axisBottom(x).ticks([400, 4000, 40000]).tickFormat( d3.format("($d"))
  xAxisGroup.call(xAxisCall).selectAll("text").style("fill","white");
  g.select(".x.axis").select(".domain").attr("stroke", "white");

  var yAxisCall = d3.axisLeft(y);
  yAxisGroup.call(yAxisCall).selectAll("text").style("fill","white");
  g.select(".y.axis").select(".domain").attr("stroke", "white");

  var circles = g.selectAll('circle').data(data);
  
  circles.exit().transition(t).remove();

  // Update
  circles.attr("x", (d) => { return x(d.month); }).attr("y", (d) => { return y(d[value]);} )
    .attr("height", (d) => { return height - y(d[value]); }).attr("width", x.bandwidth());
    
  circles.enter().append("circle").attr("fill", (d) => {return colors[d.continent]})
  .attr("cx", (d) => { return x(d.income); })
  .attr("cy", (d) => { return y(d.life_exp); })
  .attr("r", (d) => {return Math.sqrt(area(d.population)/ Math.PI)})
  .merge(circles)
  .transition(t)
  .attr("fill", (d) => {return colors[d.continent]})
  .attr("cx", (d) => { return x(d.income); })
  .attr("cy", (d) => { return y(d.life_exp); })
  .attr("r", (d) => {return Math.sqrt(area(d.population)/ Math.PI)});

}
