// makes a barchart (call on empty divId, data is a list of songs with at least the key:value pairs: time, exitedness and happiness)
function createBarChart(divId,start,end,data) {
  console.log(data);

  var height = 300
  var width = 600
  var barWidth = (9 * width / 10) / (2 * (end - start + 1));
  var exitednessColor = "#1ba2c1";
  var happinessColor = "#1cc18f";
  
  // 0. Clear the div.

  $(`#${divId}`).empty();
  
  // 1. Add svg to target div.
  var svg = d3.select("#" + divId).append("svg")
  .attr('width', "100%")
  .attr('height', "100%")
  .attr("viewBox","0 0 " + width + " " + height)
  .attr("preserveAspectRatio","xMidYMid meet");
  
  // 2. Calculate data for bins
  dataSet = []
  for (var i = 0; i < data.length; i++) {
    hourData = data[i];
    if(hourData.hour >= start && hourData.hour <= end) {
      dataSet.push({x:hourData.hour,y:hourData.excitedness});
      dataSet.push({x:(hourData.hour + ".5"),y:hourData.happiness});
    }
  }
  
  var yMax = d3.max(dataSet.map(function(dataSet) { return Math.abs(dataSet.y); }));
  var barHeight = (9 * height / 20) / yMax;
  
  console.log(yMax);

  // 3. Make the scales.
  var xScale = d3.scaleLinear()
                 .domain([start,end + 1])
                 .range([0,(9 * width / 10)]);
  var yScale = d3.scaleLinear()
                 .domain([-yMax,yMax])
                 .range([(9 * height / 10),0]);

  // 4. Make the labels.
  svg.append("g")
    .attr("text-anchor", "middle")
    .attr("fill","#ffffff")
    .attr("transform", "translate(" + 3 + "," + height / 2 + ")rotate(" + 90 + "," + 0 + "," + 0 + ")")
    .append("text")
    .text("mood");
  svg.append("g")
    .attr("text-anchor", "middle")
    .attr("fill","#ffffff")
    .attr("transform", "translate(" + width / 2.05 + "," + height + ")")
    .append("text")
    .text("time");

  // 5. Make the bars od the data.
  svg.selectAll('rect').data(dataSet)
    .enter().append('rect')
    .attr('fill', function (data) {
      if ((data.x).indexOf('.') == -1) {
        return exitednessColor;
      } else {
        return happinessColor;
      }
    })
    .attr('width', barWidth)
    .attr('height', function (data) {
      return Math.abs(data.y * barHeight);
    })
    .attr('x', function (data) {
      return (2 * (data.x - start)) * barWidth + width / 20;
    })
    .attr('y', function (data) {
      if (data.y >= 0) {
        return (height / 2) - (data.y * barHeight);
      } else {
        return (height / 2);
      }
    })

  // 6. Make the axes.
  var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks((end - start + 1));
  svg.append("g")
    .call(xAxis)
      .attr("class","heatmapAxis")
      .attr("transform","translate(" + width / 20 + "," + height / 2 + ")");
  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(4);
  svg.append("g")
    .call(yAxis)
      .attr("class","heatmapAxis")
      .attr("transform","translate(" + width / 20 + "," + height / 20 + ")");
}
