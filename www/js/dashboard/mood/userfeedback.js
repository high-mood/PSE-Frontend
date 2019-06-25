
var graph = document.querySelector("#graph");
var dot = document.querySelector("#dot");
console.log("HELLO");
var svg = d3.selectAll('#userfeedback-svg')

var x = d3.scaleLinear().domain([-10, 10]).range([17, 203]);
var y = d3.scaleLinear()
    .domain([-10, 10])
    .range([30, 150]);
svg.append("g")
    .attr("transform", "translate(-10,80)")
    .call(d3.axisBottom(x));

graph.addEventListener("click", getClickPosition, false);

function getClickPosition(e) {
    var parentPos = getPos(graph);
    var xPos = e.clientX - parentPos.x - (dot.offsetWidth / 2);
    var yPos = e.clientY - parentPos.y - (dot.offsetHeight / 2);

    var translate3dValue = "translate3d(" + xPos + "px," + yPos + "px, 0)"
    dot.style.transform = translate3dValue;
}

function getPos(element) {
    var xPos = 0;
    var yPos = 0;
    while (element) {
        xPos += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPos += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    if (!(xPos < 0 || yPos < 0 || xPos > 200 || yPos > 200)) {
        return {
            x: xPos,
            y: yPos
        };
    }
}

function sendFeedback(el) {
    var values = el.style.transform.split(/\w+\(|\);?/);
    if (!values[1] || !values[1].length) {
        return [];
    }
    console.log(values[1].split(/,\s?/g).slice(0, 2))
    return values[1].split(/,\s?/g).slice(0, 2);
}
