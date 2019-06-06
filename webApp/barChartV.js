//  the data that powers the bar chart, a simple array of numeric values
var chartData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20];

//  the size of the overall svg element
var width = 720,
    height = 200,
    padding = {left:20,right:20};

var barWholeWidth = width / chartData.length,
    barOffset = barWholeWidth/4,
    barWidth = barWholeWidth-barOffset;

var yScale = d3.scaleLinear()
  .domain([0,d3.max(chartData)])
  .range([0,height])

var svg = d3.select('#bar-chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#dff0d8')

svg.selectAll('rect').data(chartData)
  .enter().append('rect')
//    .style({'fill': '#3c763d', 'stroke': '#d6e9c6', 'stroke-width': '5'})
  .attr('fill', '#3c763d')
  .attr('stroke', '#d6e9c6')
  .attr('stroke-width', '5')
  .attr('width', function (data, i) {
    return barWidth;
  })
  .attr('height', function (data) {
    return yScale(data);
  })
  .attr('x', function (data, i) {
    return i * (barWidth + barOffset);
  })
  .attr('y', function (data) {
    return height - yScale(data);
  });