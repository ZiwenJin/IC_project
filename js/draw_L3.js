
var widthL3 = 900;
var heightL3 = 600;
var width33 = Math.floor(widthL3 / 4);
var height33 = Math.floor(heightL3 / 4);
var widthPadding = Math.floor(widthL3 / 16);
var heightPadding = Math.floor(heightL3 / 16);

function createLevel3Image2(key, color) {
    d3.select("#L3Img")
        .append("svg")
        .attr("class", "mainSVG")
        .attr("width", widthL3)
        .attr("height", heightL3);

    drawHistogram(M0[key], 0, color);
    drawScatter(x1Star[key], M0[key], 1, color);
    drawScatter(cStar[key], M0[key], 2, color);
    drawScatter(M0[key], x1Star[key], 3, color);
    drawHistogram(x1Star[key], 4, color);
    drawScatter(cStar[key], x1Star[key], 5, color);
    drawScatter(M0[key], cStar[key], 6, color);
    drawScatter(x1Star[key], cStar[key], 7, color);
    drawHistogram(cStar[key], 8, color);

    if (color == "red") {
        d3.select(".mainSVG")
            .append("text")
            .attr("x", 20)
            .attr("y", 15)
            .text(function (d) {
                return "red: " + (key+1);
            })
            .attr("fill", "red");
    }
    if (color == "green") {
        d3.select(".mainSVG")
            .append("text")
            .attr("x", 20)
            .attr("y", 35)
            .text(function (d) {
                return "green: " + (key+1);
            })
            .attr("fill", "green")
    }
}


function drawHistogram(xData, id, color) {
    var histX = d3.scaleLinear()
        .domain([Math.floor(d3.min(xData)*100)/100, Math.ceil(d3.max(xData)*100)/100])
        .range([0, width33]);
    var bins = d3.histogram()
        .domain(histX.domain())
        .thresholds(histX.ticks(5))
        (xData);
    var histY = d3.scaleLinear()
        .domain([0, d3.max(bins, function(d) { return d.length; })])
        .range([height33, 0]);

    // id = [0, ..., 8]
    var xPos = id % 3 + 1;
    var yPos = Math.floor(id / 3) + 1;
    d3.select(".mainSVG")
        .append("svg")
        .attr("id", "svg" + id)
        .attr("class", "miniSVG histogram")
        .attr("width", width33 + widthPadding)
        .attr("height", height33 + heightPadding)
        .attr("x", xPos*widthPadding + (xPos-1)*width33)
        .attr("y", yPos*heightPadding + (yPos-1)*height33);

    d3.select("#svg" + id)
        .append("g")
        .attr("id", "g" + id)
        .selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("transform", function(d) { return "translate(" + histX(d.x0) + ", " + histY(d.length) + ")"; })
        .attr("x", 1)
        .attr("width", histX(bins[0].x1) - histX(bins[0].x0) - 2)
        .attr("height", function(d) { return height33 - histY(d.length); })
        .attr("fill", color)
        .attr("opacity", "0.8");

    var x = d3.select("#svg" + id)
        .append("g")
        .attr("class", "axisX" + id)
        .attr("transform", "translate(0," + height33 + ")")
        .call(d3.axisBottom(histX));
}

function drawScatter(xData, yData, id, color) {
    var x = d3.scaleLinear()
        .domain([d3.min(xData), d3.max(xData)])
        .range([0, width33]);
    var y = d3.scaleLinear()
        .domain([d3.min(yData), d3.max(yData)])
        .range([height33, 0]);

    // id = [0, ..., 8]
    var xPos = id % 3 + 1;
    var yPos = Math.floor(id / 3) + 1;

    d3.select(".mainSVG")
        .append("svg")
        .attr("id", "svg" + id)
        .attr("class", "miniSVG scatter")
        .attr("width", width33 + widthPadding)
        .attr("height", height33 + heightPadding)
        .attr("x", xPos*widthPadding + (xPos-1)*width33)
        .attr("y", yPos*heightPadding + (yPos-1)*height33);

    d3.select("#svg" + id)
        .append("g")
        .attr("id", "g" + id)
        .selectAll("circle")
        .data(d3.range(xData.length))  // .data(d3.range(xData.length))
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(xData[d]); })
        .attr("cy", function(d) { return y(yData[d]); })
        .attr("r", 2)
        .attr("fill", color)
        .attr("opacity", "0.8");

    d3.select("#svg" + id)
        .append("g")
        .attr("class", "axisX" + id)
        .attr("transform", "translate(" + 50 + ", " + height33 + ")")
        .call(d3.axisBottom(x));

    d3.select("#svg" + id)
        .append("g")
        .attr("class", "axisY" + id)
        .attr("transform", "translate(" + 50 + ", 0)")
        .call(d3.axisLeft(y));
}

function zoomHistogram(data, gid) {
    return d3.zoom()
        .scaleExtent([0.5, 5])
        .on("zoom", function() {
            bins = d3.histogram()
                .domain(histX.domain())
                .thresholds(histX.ticks(d3.event.transform.k))
                (data);

            d3.select("#g" + gid)
                .selectAll("rect")
                .data(bins)
                .enter()
                .append("rect")
                .attr("transform", function(d) { return "translate(" + histX(d.x0) + ", " + histY(d.length) + ")"; })
                .attr("x", 1)
                .attr("width", histX(bins[0].x1) - histX(bins[0].x0) - 2)
                .attr("height", function(d) { return height33 - histY(d.length); });

            d3.select(".axisX" + gid).remove();

            var x = d3.select("#svg" + gid)
                .append("g")
                .attr("class", "axisX" + gid)
                .attr("transform", "translate(0," + height33 + ")")
                .call(d3.axisBottom(histX));
        });
}

function zoomScatter(gid) {
    return d3.zoom()
        .scaleExtent([0.5, 10])
        //.translateExtent([[-1000, -1000], [1000, 1000]])
        .on("zoom", function() {
            d3.select("#" + gid).attr("transform", d3.event.transform);
            d3.select("#" + gid)
                .selectAll("circle")
                .attr("r", 2 / d3.event.transform.k);

        });
}

d3.select("#svg1").call(zm = zoomScatter("g1"));
d3.select("#svg2").call(zm = zoomScatter("g2"));
