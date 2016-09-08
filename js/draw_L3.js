
// 33 for small plots
var width33 = 155;
var height33 = 155;
// padding between small plots
var margin33 = { top: 20, right: 30, bottom: 20, left: 30 };
// L3 for the main svg
var widthL3 = width33 * 4 + margin33.left * 11;
var heightL3 = height33 * 3 + margin33.top * 8;

// function to draw L3 image, with 2 specified SNIae
// If only draw for one SNIa, the second parameter is uundefined
function createLevel3Image(key1, key2) {
    if (key1 != undefined) { key1 -= 1; }
    if (key2 != undefined) { key2 -= 1; }
    
    d3.select("#mainSVG")
        .attr("width", widthL3)
        .attr("height", heightL3);

    // extent for all 3 variables based on 2 SNIa
    var M0Extent = d3.extent(M0[key1].concat(M0[key2]));
    var x1StarExtent = d3.extent(x1Star[key1].concat(x1Star[key2]));
    var cStarExtent = d3.extent(cStar[key1].concat(cStar[key2]));

    // drawFirst indicates whether key2 is undefined
    // only set second dataset when key2 is not undefined
    if (key2 == undefined) {
        var drawFirst = true;
        var dataset2 = { M0: undefined, x1Star: undefined, cStar: undefined };
    } else {
        drawFirst = false;
        var dataset2 = { M0: M0[key2], x1Star: x1Star[key2], cStar: cStar[key2] };
    }

    // draw 6 small plots, 3 for both histograms and scatters, all with coordinates
    drawHistogram(drawFirst, 0, M0Extent, M0[key1], M0[key2]);
    drawHistogramCoordinates(0, "M0");
    drawScatter(drawFirst, 1, M0Extent, x1StarExtent, M0[key1], x1Star[key1], dataset2.M0, dataset2.x1Star);
    drawScatterCoordinates(1, "M0", "x1*");
    drawScatter(drawFirst, 2, M0Extent, cStarExtent, M0[key1], cStar[key1], dataset2.M0, dataset2.cStar);
    drawScatterCoordinates(2, "M0", "c*");
    drawHistogram(drawFirst, 5, x1StarExtent, x1Star[key1], x1Star[key2]);
    drawHistogramCoordinates(5, "x1*");
    drawScatter(drawFirst, 6, x1StarExtent, cStarExtent, x1Star[key1], cStar[key1], dataset2.x1Star, dataset2.cStar);
    drawScatterCoordinates(6, "x1*", "c*");
    drawHistogram(drawFirst, 10, cStarExtent, cStar[key1], cStar[key2]);
    drawHistogramCoordinates(10, "c*");

    // draw additional correlation plots if 2 SNIa selected
    if (!drawFirst) {
        drawScatter2(3, d3.extent(M0[key1]), d3.extent(M0[key2]), M0[key1], M0[key2]);
        drawScatterCoordinates(3, "M0["+(key1+1)+"]", "M0["+(key2+1)+"]");
        drawScatter2(7, d3.extent(x1Star[key1]), d3.extent(x1Star[key2]), x1Star[key1], x1Star[key2]);
        drawScatterCoordinates(7, "c*["+(key1+1)+"]", "c*["+(key2+1)+"]");
        drawScatter2(11, d3.extent(cStar[key1]), d3.extent(cStar[key2]), cStar[key1], cStar[key2]);
        drawScatterCoordinates(11, "x1*["+(key1+1)+"]", "x1*["+(key2+1)+"]");
    }

    // write messages to label the SN ID
    if (drawFirst) {
        d3.select("#mainSVG")
            .append("text")
            .attr("x", 20)
            .attr("y", heightL3 - 50)
            .text(function (d) {
                return "orange: " + (key1+1);
            })
            .attr("fill", "orange");
    } else {
        d3.select("#mainSVG")
            .append("text")
            .attr("x", 20)
            .attr("y", heightL3 - 30)
            .text(function (d) {
                return "green: " + (key2+1);
            })
            .attr("fill", "green")
    }
}

// function to draw histograms
function drawHistogram(drawFirst, id, xExtent, xData1, xData2) {
    // x axis attr
    var histX = d3.scaleLinear()
        .domain(xExtent)
        .range([0, width33]);

    // first SN's bins
    var bins1 = d3.histogram()
        .domain(histX.domain())
        .thresholds(histX.ticks(10))
        (xData1);

    // second SN's bins, only updated when !drawFirst
    var bins2 = [];
    // only draw bins2 when !drawFirst
    if (!drawFirst) {
        bins2 = d3.histogram()
            .domain(histX.domain())
            .thresholds(histX.ticks(10))
            (xData2);
    }

    // scale function of y axis, depends on both bins
    var histY = d3.scaleLinear()
        .domain([0, d3.max(bins1.concat(bins2), function(d) { return d.length; })])
        .range([height33, 0]);

    // find position of small plot by id = [0, ..., 8], and then create it
    var xPos = id % 4 + 1;
    var yPos = Math.floor(id / 4) + 1;
    d3.select("#mainSVG")
        .append("svg")
        .attr("id", "svg" + id)
        .attr("class", "miniSVG histogram")
        .attr("width", width33 + margin33.left + margin33.right)
        .attr("height", height33 + margin33.top + margin33.bottom)
        .attr("x", xPos*(margin33.left + margin33.right) + (xPos-1)*width33)
        .attr("y", yPos*(margin33.top + margin33.bottom) + (yPos-1)*height33);

    // remove previous x axis and draw second SN when !drawFirst
    if (!drawFirst) {
        d3.select(".axisX" + id).remove();
        d3.select("#svg" + id).select("#g1").remove();

        d3.select("#svg" + id)
            .append("g")
            .attr("id", "g2")
            .selectAll("rect")
            .data(bins2)
            .enter()
            .append("rect")
            .attr("transform", function(d) { return "translate(" + histX(d.x0) + ", " + histY(d.length) + ")"; })
            .attr("x", 1)
            .attr("width", function(d) { return histX(d.x1) - histX(d.x0) - 2; })
            .attr("height", function(d) { return height33 - histY(d.length); })
            .attr("fill", "green")
            .attr("opacity", "0.7");
    }

    // anyway, draw first SN
    d3.select("#svg" + id)
        .append("g")
        .attr("id", "g1")
        .selectAll("rect")
        .data(bins1)
        .enter()
        .append("rect")
        .attr("transform", function(d) { return "translate(" + histX(d.x0) + ", " + histY(d.length) + ")"; })
        .attr("x", 1)
        .attr("width", function(d) { return histX(d.x1) - histX(d.x0) - 2; })
        .attr("height", function(d) { return height33 - histY(d.length); })
        .attr("fill", "orange")
        .attr("opacity", "0.7");

    // draw x axis
    var x = d3.select("#svg" + id)
        .append("g")
        .attr("class", "axisX" + id)
        .attr("transform", "translate(0," + height33 + ")")
        .call(d3.axisBottom(histX));
}

// function to draw scatters
function drawScatter(drawFirst, id, xExtent, yExtent, xData1, yData1, xData2, yData2) {
    var x = d3.scaleLinear()
        .domain(xExtent)
        .range([0, width33]);
    var y = d3.scaleLinear()
        .domain(yExtent)
        .range([height33, 0]);

    // id = [0, ..., 8]
    var xPos = id % 4 + 1;
    var yPos = Math.floor(id / 4) + 1;

    d3.select("#mainSVG")
        .append("svg")
        .attr("id", "svg" + id)
        .attr("class", "miniSVG scatter")
        .attr("width", width33 + margin33.left + margin33.right)
        .attr("height", height33 + margin33.top + margin33.bottom)
        .attr("x", xPos*(margin33.left + margin33.right) + (xPos-1)*width33)
        .attr("y", yPos*(margin33.top + margin33.bottom) + (yPos-1)*height33);

    if (!drawFirst) {
        d3.select(".axisX" + id).remove();
        d3.select(".axisY" + id).remove();
        d3.select("#svg" + id).select("#g1").remove();

        d3.select("#svg" + id)
            .append("g")
            .attr("id", "g2")
            .selectAll("circle")
            .data(d3.range(xData2.length))  // .data(d3.range(xData.length))
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(xData2[d]); })
            .attr("cy", function(d) { return y(yData2[d]); })
            .attr("r", 1)
            .attr("fill", "green")
            .attr("opacity", "0.3");
    }

    d3.select("#svg" + id)
        .append("g")
        .attr("id", "g1")
        .selectAll("circle")
        .data(d3.range(xData1.length))  // .data(d3.range(xData.length))
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(xData1[d]); })
        .attr("cy", function(d) { return y(yData1[d]); })
        .attr("r", 1)
        .attr("fill", "orange")
        .attr("opacity", "0.3");

    d3.select("#svg" + id)
        .append("g")
        .attr("class", "axisX" + id)
        .attr("transform", "translate(" + 0 + ", " + height33 + ")")
        .call(d3.axisBottom(x).ticks(5));

    d3.select("#svg" + id)
        .append("g")
        .attr("class", "axisY" + id)
        .attr("transform", "translate(" + 0 + ", 0)")
        .call(d3.axisRight(y).ticks(5));
}

// function to additional correlation scatter
function drawScatter2(id, xExtent, yExtent, xData, yData) {
    var x = d3.scaleLinear()
        .domain(xExtent)
        .range([0, width33]);
    var y = d3.scaleLinear()
        .domain(yExtent)
        .range([height33, 0]);

    // actually, only id = 3, 7, 11 used
    var xPos = id % 4 + 1;
    var yPos = Math.floor(id / 4) + 1;

    d3.select("#mainSVG")
        .append("svg")
        .attr("id", "svg" + id)
        .attr("class", "miniSVG scatter")
        .attr("width", width33 + margin33.left + margin33.right)
        .attr("height", height33 + margin33.top + margin33.bottom)
        .attr("x", xPos*(margin33.left + margin33.right) + (xPos-1)*width33)
        .attr("y", yPos*(margin33.top + margin33.bottom) + (yPos-1)*height33);

    d3.select("#svg" + id)
        .append("g")
        .attr("class", "axisX" + id)
        .attr("transform", "translate(" + 0 + ", " + height33 + ")")
        .call(d3.axisBottom(x).ticks(5));

    d3.select("#svg" + id)
        .append("g")
        .attr("class", "axisY" + id)
        .attr("transform", "translate(" + 0 + ", 0)")
        .call(d3.axisRight(y).ticks(5));

    d3.select("#svg" + id)
        .append("g")
        .attr("id", "g1")
        .selectAll("circle")
        .data(d3.range(xData.length))  // .data(d3.range(xData.length))
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(xData[d]); })
        .attr("cy", function(d) { return y(yData[d]); })
        .attr("r", 1)
        .attr("fill", "blue");
}

// function to label histogram coordinate
function drawHistogramCoordinates(id, xLabel) {
    d3.select("#svg" + id)
        .append("text")
        .attr("x", width33 - 20)
        .attr("y", height33 + margin33.bottom + 10)
        .style("text-anchor", "middle")
        .text(xLabel);
}

// function to label scatter coordinate
function drawScatterCoordinates(id, xLabel, yLabel) {
    d3.select("#svg" + id)
        .append("text")
        .attr("x", width33 - 20)
        .attr("y", height33 + margin33.bottom + 10)
        .text(xLabel);
    d3.select("#svg" + id)
        .append("text")
        .attr("x", 30)
        .attr("y", 12)
        .text(yLabel);
}