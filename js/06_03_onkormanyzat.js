<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>
  <title>geoPath measures</title>
</head>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 14px;
  color: #333;
}

#content .info {
  height: 20px;
}

#content .map path {
  fill: #aaa;africa
  stroke: #fff;
}

#content .bounding-box rect {
  fill: none;
  stroke: #333;
  stroke-dasharray: 2,1;
}

#content .centroid {
  display: none;
}

#content .centroid circle {
  fill: red;
}

</style>

<body>
  <div id="content">
    <div class="info">Hover over a country</div>
    <svg width="620px" height="600px">
      <g class="map"></g>
      <g class="bounding-box"><rect></rect></g>
      <g class="centroid"><circle r="4"></circle></g>
    </svg>
  </div>


  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.9.1/d3.min.js"></script>

  <script>

var projection = d3.geoMercator()
  .scale(400)
  .translate([200, 280])
  .center([0, 5]);

var geoGenerator = d3.geoPath()
  .projection(projection);

function handleMouseover(d) {

  var pixelArea = geoGenerator.area(d);
  var bounds = geoGenerator.bounds(d);
  var centroid = geoGenerator.centroid(d);
  var measure = geoGenerator.measure(d);

  d3.select('#content .info')
    .text(d.properties.name + ' (path.area = ' + pixelArea.toFixed(1) + ' path.measure = ' + measure.toFixed(1) + ')');

  d3.select('#content .bounding-box rect')
    .attr('x', bounds[0][0])
    .attr('y', bounds[0][1])
    .attr('width', bounds[1][0] - bounds[0][0])
    .attr('height', bounds[1][1] - bounds[0][1]);

  d3.select('#content .centroid')
    .style('display', 'inline')
    .attr('transform', 'translate(' + centroid + ')');
}

function update(geojson) {
  var u = d3.select('#content g.map')
    .selectAll('path')
    .data(geojson.features);

  u.enter()
    .append('path')
    .attr('d', geoGenerator)
    .on('mouseover', handleMouseover);
}



// REQUEST DATA
d3.json('onklak.json', function(err, json) {
  update(json)
})

  </script>
</body>
</html>
