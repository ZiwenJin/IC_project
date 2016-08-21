
/*
var widthL3 = 800;
var heightL3 = 800;
var width33 = Math.floor(widthL3 / 4);
var height33 = Math.floor(heightL3 / 4);
var margin33 = { top: Math.floor(heightL3 / 32), right: Math.floor(widthL3 / 32), bottom: Math.floor(heightL3 / 32), left: Math.floor(widthL3 / 32) };
*/

var width33 = 200;
var height33 = 200;
var margin33 = { top: 20, right: 20, bottom: 20, left: 20 };
var widthL3 = width33 * 4 + margin33.left * 11;
var heightL3 = height33 * 3 + margin33.top * 8;

/*
function createLevel3Image2(key1, key2) {
    d3.select("#mainSVG")
        .attr("width", widthL3)
        .attr("height", heightL3);

    var M0Extent = d3.extent(M0[key1].concat(M0[key2]));
    var x1StarExtent = d3.extent(x1Star[key1].concat(x1Star[key2]));
    var cStarExtent = d3.extent(cStar[key1].concat(cStar[key2]));

    if (key2 == undefined) {
        drawHistogram(M0Extent, M0[key1], 0, "red");
        drawScatter(x1StarExtent, M0Extent, x1Star[key], M0[key], 1, "red");
        drawScatter(cStarExtent, M0Extent, cStar[key], M0[key], 2, "red");
        drawScatter(M0Extent, x1StarExtent, M0[key], x1Star[key], 3, "red");
        drawHistogram(x1StarExtent, x1Star[key], 4, "red");
        drawScatter(cStarExtent, x1StarExtent, cStar[key], x1Star[key], 5, "red");
        drawScatter(M0Extent, cStarExtent, M0[key], cStar[key], 6, "red");
        drawScatter(x1StarExtent, cStarExtent, x1Star[key], cStar[key], 7, "red");
        drawHistogram(cStarExtent, cStar[key], 8, "red");
    } else {
        drawHistogram2(M0Extent, M0[key1], M0[key2], 0, "green");
        drawScatter2(x1StarExtent, M0Extent, x1Star[key], M0[key], 1, "green");
        drawScatter2(cStarExtent, M0Extent, cStar[key], M0[key], 2, "green");
        drawScatter2(M0Extent, x1StarExtent, M0[key], x1Star[key], 3, "green");
        drawHistogram2(x1StarExtent, x1Star[key], 4, "green");
        drawScatter2(cStarExtent, x1StarExtent, cStar[key], x1Star[key], 5, "green");
        drawScatter2(M0Extent, cStarExtent, M0[key], cStar[key], 6, "green");
        drawScatter2(x1StarExtent, cStarExtent, x1Star[key], cStar[key], 7, "green");
        drawHistogram2(cStarExtent, cStar[key], 8, "green");
    }
}

test("a", "b", "c");

function test(p1, p2="ha", p3) {
    console.log(p1);
    console.log(p2);
    console.log(p3);
}
*/



function createLevel3Image(key1, key2) {
    d3.select("#mainSVG")
        .attr("width", widthL3)
        .attr("height", heightL3);

    var M0Extent = d3.extent(M0[key1].concat(M0[key2]));
    var x1StarExtent = d3.extent(x1Star[key1].concat(x1Star[key2]));
    var cStarExtent = d3.extent(cStar[key1].concat(cStar[key2]));

    if (key2 == undefined) {
        var drawFirst = true;
        var dataset2 = { M0: undefined, x1Star: undefined, cStar: undefined };
    } else {
        drawFirst = false;
        var dataset2 = { M0: M0[key2], x1Star: x1Star[key2], cStar: cStar[key2] };
    }

    // if want to adjust the coordinate, seems both SNIa data are required
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

    // testing: draw scatter between M0, x1*, c*
    if (!drawFirst) {
        drawScatter2(3, d3.extent(M0[key1]), d3.extent(M0[key2]), M0[key1], M0[key2]);
        drawScatterCoordinates(3, "M0["+(key1+1)+"]", "M0["+(key2+1)+"]");
        drawScatter2(7, d3.extent(x1Star[key1]), d3.extent(x1Star[key2]), x1Star[key1], x1Star[key2]);
        drawScatterCoordinates(7, "c*["+(key1+1)+"]", "c*["+(key2+1)+"]");
        drawScatter2(11, d3.extent(cStar[key1]), d3.extent(cStar[key2]), cStar[key1], cStar[key2]);
        drawScatterCoordinates(11, "x1*["+(key1+1)+"]", "x1*["+(key2+1)+"]");
    }


    if (drawFirst) {
        d3.select("#mainSVG")
            .append("text")
            .attr("x", 20)
            .attr("y", heightL3 - 50)
            .text(function (d) {
                return "red: " + (key1+1);
            })
            .attr("fill", "red");
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

function drawHistogram(drawFirst, id, xExtent, xData1, xData2) {
    var histX = d3.scaleLinear()
        .domain(xExtent)
        .range([0, width33]);
    if (drawFirst) {
        var bins1 = d3.histogram()
            .domain(histX.domain())
            .thresholds(histX.ticks(7))
            (xData1);
        var histY = d3.scaleLinear()
            .domain([0, d3.max(bins1, function(d) { return d.length; })])
            .range([height33, 0]);
    } else {
        var bins1 = d3.histogram()
            .domain(histX.domain())
            .thresholds(histX.ticks(7))
            (xData1);
        var bins2 = d3.histogram()
            .domain(histX.domain())
            .thresholds(histX.ticks(7))
            (xData2);
        var histY = d3.scaleLinear()
            .domain([0, d3.max(bins1.concat(bins2), function(d) { return d.length; })])
            .range([height33, 0]);
    }

    // id = [0, ..., 8]
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

    if (drawFirst) {
        var x = d3.select("#svg" + id)
            .append("g")
            .attr("class", "axisX" + id)
            .attr("transform", "translate(0," + height33 + ")")
            .call(d3.axisBottom(histX));

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
            .attr("fill", "red");
    } else {
        d3.select(".axisX" + id).remove();
        d3.select("#svg" + id).select("#g1").remove();

        var x = d3.select("#svg" + id)
            .append("g")
            .attr("class", "axisX" + id)
            .attr("transform", "translate(0," + height33 + ")")
            .call(d3.axisBottom(histX));

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
            .attr("fill", "red")
            .attr("opacity", "0.8");

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
            .attr("opacity", "0.8");
    }
}

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

    if (drawFirst) {
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
            .data(d3.range(xData1.length))  // .data(d3.range(xData.length))
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(xData1[d]); })
            .attr("cy", function(d) { return y(yData1[d]); })
            .attr("r", 1)
            .attr("fill", "red");
    } else {
        d3.select(".axisX" + id).remove();
        d3.select(".axisY" + id).remove();

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

        d3.select("#svg" + id).select("#g1").selectAll("circle")
            .attr("cx", function(d) { return x(xData1[d]); })
            .attr("cy", function(d) { return y(yData1[d]); })
            .attr("opacity", "0.8");

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
            .attr("opacity", "0.8");
    }
}

function drawScatter2(id, xExtent, yExtent, xData, yData) {
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

function drawHistogramCoordinates(id, xLabel) {
    d3.select("#svg" + id)
        .append("text")
        .attr("x", width33 - 20)
        .attr("y", height33 + margin33.bottom + 10)
        .style("text-anchor", "middle")
        .text(xLabel);
}

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
