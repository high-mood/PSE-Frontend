//  the data that powers the bar chart, a simple array of numeric values
var chartData = [1,0,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

var newChartData = [{"genre1": 4, "genre2": 8, "genre3": 1, "genre4": 0, "genre5": 7, "genre6": 15,}]

//  the size of the overall svg element
var width = 720,
    height = 200,
    padding = {left:20,right:20,top:10,bottom:30};

var barWholeWidth = width / chartData.length,
    barOffset = barWholeWidth / 4,
    barWidth = barWholeWidth - barOffset;

var svg = d3.select('#bar-chart')
  .append('svg')
  .attr('width', width + padding.left + padding.right)
  .attr('height', height + padding.top + padding.bottom)
  .style('background', '#dff0d8')

var yScale = d3.scaleLinear()
  .domain([0,d3.max(chartData)])
  .range([height, 0])

var yAxis = d3.axisLeft()
  .scale(yScale)

svg.selectAll('rect').data(chartData)
  .enter().append('rect')
  .attr('fill', '#3c763d')
  .attr('stroke', '#d6e9c6')
  .attr('stroke-width', '5')
  .attr('width', function (data, i) {
    return barWidth;
  })
  .attr('height', function (data) {
    return height - yScale(data);
  })
  .attr('x', function (data, i) {
    return i * (barWidth + barOffset) + 2 * padding.left;
  })
  .attr('y', function (data) {
    return yScale(data) + padding.top;
  });

svg.append("g").call(yAxis)
  .attr("transform","translate(" + padding.left + "," + padding.top + ")");