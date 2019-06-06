// from https://www.tutorialsteacher.com/d3js/create-pie-chart-using-d3js

// function to make a pieChart using the dataset data with {label:x,size:y}
// pairs to be inserted into the div using id divID with measurements in pixels of width and height
// and at the top a title.
// After 8 elements the colors repeat.
function makePieChart(data,divID,width,height,title) {
  // set variables
  var radius = Math.min(width, height) / 2;

  // make svg in <div id="pie-chart">
  var svg = d3.select("#" + divID).append("svg")
              .attr('width', width)
              .attr('height', height + 20);

  var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 20) + ")");

  // colors to be used for the slices
  var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c','#bfff00','#00ffff','#bf00ff',]);

  var pie = d3.pie().value(function(d) {
    return d.size;
  });

  var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - 80);

  var arc = g.selectAll("arc")
             .data(pie(data))
             .enter()
             .append("g")
             .attr("class", "arc")

  // Add path
  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.label); });

  // Add label
  arc.append("text")
    .attr("transform", function(d) {
      return "translate(" + label.centroid(d) + ")";
    })
    .text(function(d) { return d.data.label; });

  // Add a title at the top
  svg.append("g")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (width / 2) + "," + 20 + ")")
    .append("text")
    .text(title)
    .attr("class", "title")
}