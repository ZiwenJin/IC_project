/**
 * Created by ziwen on 8/1/16.
 */

/*
var svgL3 = d3.select("#L3Img").append("svg");
var widthL3 = 800;
var heightL3 = 600;

var xHistL3 = d3.scaleLinear()
    .range([0, widthL3]);
var yHistL3 = d3.scaleLinear()
    .range([heightL3, 0]);

var bins_M0 = d3.histogram()
    .domain([Math.floor(d3.min(M0)*100)/100, Math.ceil(d3.max(M0)*100)/100])
    .threshold(xHistL3.ticks(10))
    (M0);

var bins_num_M0 = yHistL3
    .domain([0, d3.max(bins_M0, function(d) { return d.length; })]);

var bins_x1Star = d3.histogram()
    .domain([Math.floor(d3.min(x1Star)*100)/100, Math.ceil(d3.max(x1Star)*100)/100])
    .threshold(xHistL3.ticks(10))
    (x1Star);

var bins_num_x1Star = yHistL3
    .domain([0, d3.max(bins_x1Star, function(d) { return d.length; })]);

var bins_cStar = d3.histogram()
    .domain([Math.floor(d3.min(cStar)*100)/100, Math.ceil(d3.max(cStar)*100)/100])
    .threshold(xHistL3.ticks(10))
    (cStar);

var bins_num_x1Star = yHistL3
    .domain([0, d3.max(bins_cStar, function(d) { return d.length; })]);


d3.select("#L3Img")
*/