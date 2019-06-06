d3.select(".barChartH")
  .selectAll("div")
  .data(chartData)
    .enter()
    .append("div")
    .style("width", function(d) { return d + "px"; })
    .text(function(d) { return d; });