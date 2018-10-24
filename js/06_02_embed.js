// map
var width = window.innerWidth * 0.99;
var height = window.innerHeight * 0.7;
d3.select('svg')
    .attr('width', width)
    .attr('height', height * 0.77);

var f = width + height * 5; // works on desktop, laptop, probably it isn't that good on mobile
var projection = d3.geoMercator()
    .center([19.5, 47]) // roughly the center of Hungary
    .translate([width / 2, height / 2])
    .scale(f);
var geoGenerator = d3.geoPath()
    .projection(projection);

function returnNaN(x) {
    if (x == 0) {
        return "Nincs adat";
    } else {
        return x
    }

};

function handleMouseover(d) {
    var pixelArea = geoGenerator.area(d);
    var bounds = geoGenerator.bounds(d);
    var centroid = geoGenerator.centroid(d);
    var measure = geoGenerator.measure(d);

    d3.select('#content .info')
        .html('<p id="infotext"><b>' + d.properties.NUTS5NAME + '</b><br>Lakástranzakciók átlagos vételára (millió Ft)<br>' + returnNaN(eval('d.properties.Lakástranzakciók_' + inputValue)) + '</p>');

    d3.select('#content .bounding-box rect')
        .attr('x', bounds[0][0])
        .attr('y', bounds[0][1])
        .attr('width', bounds[1][0] - bounds[0][0])
        .attr('height', bounds[1][1] - bounds[0][1]);

    d3.select('#content .centroid')
        .style('display', 'inline')
        .attr('transform', 'translate(' + centroid + ')');
}

function handleMouseout(d) {


    d3.select('#content .info')
        .html('<p id="unseen"><b>info1</b><br>info2<br>info3<p>');

    d3.select('#content .centroid')
        .style('display', 'none');
}


function update(geojson) {
    var u = d3.select('#content g.map')
        .selectAll('path')
        .data(geojson.features)
        .attr("fill", initialState);

    u.enter()
        .append('path')
        .attr("fill", initialState)
        .attr('d', geoGenerator)
        .attr("stroke", "#000")
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);
}

// set slider values
var inputValue = "2007";
var time = ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];

// when the input range changes update the rectangle
d3.select("#timeslide").on("input", function () {
    update2(+this.value);
});

function update2(value) {
    document.getElementById("range").innerHTML = time[value];
    inputValue = time[value];
    d3.selectAll("path")
        .style("fill", timeMatch);
}

// this is where we group the prices and set their color
// TODO: group prices according to the example
function timeMatch(data) {
    if (inputValue == "2007") {
        return d3.interpolateOranges(data.properties.Kat_2007 / 7)
    } else if (inputValue == "2008") {
        return d3.interpolateOranges(data.properties.Kat_2008 / 7)
    } else if (inputValue == "2009") {
        return d3.interpolateOranges(data.properties.Kat_2009 / 7)
    } else if (inputValue == "2010") {
        return d3.interpolateOranges(data.properties.Kat_2010 / 7)
    } else if (inputValue == "2011") {
        return d3.interpolateOranges(data.properties.Kat_2011 / 7)
    } else if (inputValue == "2012") {
        return d3.interpolateOranges(data.properties.Kat_2012 / 7)
    } else if (inputValue == "2013") {
        return d3.interpolateOranges(data.properties.Kat_2013 / 7)
    } else if (inputValue == "2014") {
        return d3.interpolateOranges(data.properties.Kat_2014 / 7)
    } else if (inputValue == "2015") {
        return d3.interpolateOranges(data.properties.Kat_2015 / 7)
    } else if (inputValue == "2016") {
        return d3.interpolateOranges(data.properties.Kat_2016 / 7)
    } else if (inputValue == "2017") {
        return d3.interpolateOranges(data.properties.Kat_2017 / 7)
    };
}

function initialState(data) {
    if (document.getElementById("range").innerHTML == 2007) {
        return d3.interpolateOranges(data.properties.Kat_2007 / 7)
    };
}

// REQUEST DATA
d3.json('../../data/06_teruleti_egyenlotlensegek_kiszoritas/habitat_jofogas.geojson', function (err, json) {
    update(json)
})
