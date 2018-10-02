if (d3.select("#viscontainer-kozmu02").node().getBoundingClientRect().width  > 550)
{
   if (d3.select("#viscontainer-kozmu02").node().getBoundingClientRect().width  < 900){
        var width_abs_kozmu02 = d3.select("#viscontainer-kozmu02").node().getBoundingClientRect().width ;
        } else {
         var width_abs_kozmu02 = 900
        }
} else {
  var width_abs_kozmu02 = 550 //
};


function MyTitle(){
    d3.selectAll("#svg_kozmu02_title > *").remove();

	var margin_kozmu02 = {top: width_abs_kozmu02/(900/20), right: 0, bottom: width_abs_kozmu02/(900/60), left: width_abs_kozmu02/(900/60)},
		width = width_abs_kozmu02 - margin_kozmu02.left - margin_kozmu02.right,
		height = 450 - margin_kozmu02.top - margin_kozmu02.bottom;

	var svg_kozmu02_title = d3.select("#svg_kozmu02_title")
	.attr("width", width + margin_kozmu02.left + margin_kozmu02.right)
	.attr("height", width_abs_kozmu02/(900/50));

	svg_kozmu02_title.append('text')
		.attr('id', 'kozmu02_title')
		.attr("x",  (width -   margin_kozmu02.left - margin_kozmu02.right)/2 - margin_kozmu02.left   )
		.attr("y", width_abs_kozmu02/(900/15))
        .attr("font-size", width_abs_kozmu02/(900/19))
		.text("Hátralékos fogyasztók a tartozás hossza szerint");

	svg_kozmu02_title.append('text')
		.attr('id', 'kozmu02_title')
		.attr("x",   (width -   margin_kozmu02.left - margin_kozmu02.right)/2 - margin_kozmu02.left  )
		.attr("y", width_abs_kozmu02/(900/35))
        .attr("font-size", width_abs_kozmu02/(900/19))
		.text("(Millió, 2017. december 31.)");
}

function MyTitle2(){
    d3.selectAll("#svg_kozmu02_title > *").remove();

	var margin_kozmu02 = {top: width_abs_kozmu02/(900/20), right: 0, bottom: width_abs_kozmu02/(900/60), left: width_abs_kozmu02/(900/60)},
		width = width_abs_kozmu02 - margin_kozmu02.left - margin_kozmu02.right,
		height = 450 - margin_kozmu02.top - margin_kozmu02.bottom;

	var svg_kozmu02_title = d3.select("#svg_kozmu02_title")
	.attr("width", width + margin_kozmu02.left + margin_kozmu02.right)
	.attr("height", width_abs_kozmu02/(900/50));

	svg_kozmu02_title.append('text')
		.attr('id', 'kozmu02_title')
		.attr("x",  (width -   margin_kozmu02.left - margin_kozmu02.right)/2 - margin_kozmu02.left   )
		.attr("y", width_abs_kozmu02/(900/15))
        .attr("font-size", width_abs_kozmu02/(900/19))
		.text("Hátralékos fogyasztók a tartozás hossza szerint");

	svg_kozmu02_title.append('text')
		.attr('id', 'kozmu02_title')
		.attr("x",   (width -   margin_kozmu02.left - margin_kozmu02.right)/2 - margin_kozmu02.left  )
		.attr("y", width_abs_kozmu02/(900/35))
        .attr("font-size", width_abs_kozmu02/(900/19))
		.text("(%, 2017. december 31.)");
}

function stacked_chart(){
	d3.select("#svg_kozmu02").remove();

	var margin_kozmu02 = {top: width_abs_kozmu02/(900/20), right: 0, bottom: width_abs_kozmu02/(900/60), left: width_abs_kozmu02/(900/60)},
		width = width_abs_kozmu02 - margin_kozmu02.left - margin_kozmu02.right,
		height = 450 - margin_kozmu02.top - margin_kozmu02.bottom;

	var x_kozmu02 = d3.scaleBand()
	.rangeRound([0, width - width_abs_kozmu02/(900/300)])
	.paddingInner(0.15)
	.align(0.8);

	var y_kozmu02 = d3.scaleLinear()
	.rangeRound([380, 0]);

	var z_kozmu02 = d3.scaleOrdinal()
	.range(["#385988", "#43B02A", "#FF671F", "#A4343A"]);

	var svg_kozmu02 = d3.select("#viscontainer-kozmu02").append("svg")
	.attr("width", width + margin_kozmu02.left + margin_kozmu02.right)
	.attr("height", 380 + margin_kozmu02.top + margin_kozmu02.bottom)
	.attr("id","svg_kozmu02")
	.append("g")
	.attr("transform", "translate(" + margin_kozmu02.left + "," + margin_kozmu02.top + ")");


	d3.csv("../../data/04_eladosodas/04_kozmu02.csv", function(d, i, columns) {
		for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
		d.total = t;
		return d;
	}, function(error, data) {
		if (error) throw error;

		var keys_kozmu02 = data.columns.slice(1);

		var serie_kozmu02 = svg_kozmu02.selectAll(".serie_kozmu02")
		.data(d3.stack().keys(keys_kozmu02)(data))
		.enter().append("g")
		.attr("class", "serie_kozmu02");

		data.sort(function(a, b) { return b.total - a.total; });
		x_kozmu02.domain(data.map(function(d) { return d.name; }));
		y_kozmu02.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
		z_kozmu02.domain(keys_kozmu02);

		serie_kozmu02.append("g")
			.selectAll("g")
			.data(d3.stack().keys(keys_kozmu02)(data))
			.enter().append("g")
			.attr("fill", function(d) { return z_kozmu02(d.key); })
			.selectAll("rect")
			.data(function(d) { return d; })
			.enter().append("rect")
			.attr("x", function(d) { return x_kozmu02(d.data.name); })
			.attr("y", function(d) { return y_kozmu02(d[1]); })
			.attr("height", function(d) { return y_kozmu02(d[0]) - y_kozmu02(d[1]); })
			.attr("width", x_kozmu02.bandwidth());

		
		svg_kozmu02.append("g")
			.attr("class", "axis_kozmu02")
            .attr("font-size", width_abs_kozmu02/(900/15) )
			.attr("transform", "translate(0," + 380 + ")")
			.call(d3.axisBottom(x_kozmu02));

 		svg_kozmu02.selectAll(".tick")
            .attr("font-size", width_abs_kozmu02/(900/15) )


var locale = d3.formatLocale({
  decimal: ",",
});


		
var format = locale.format(",.1f");
		
		svg_kozmu02.append("g")
			.attr("class", "axis_kozmu02")
			.call(d3.axisLeft(y_kozmu02).tickFormat(function(d){
 if(this.parentNode.nextSibling){
return format(d/1000000) + " M"} else { return format(d/1000000)  + " M"}}))
			.append("text")
			.attr("x", 2)
			.attr("y", y_kozmu02(y_kozmu02.ticks().pop()))
			.attr("dy", "0.32em")
			.attr("text-anchor", "start");

 		svg_kozmu02.selectAll(".tick")
            .attr("font-size", width_abs_kozmu02/(900/16) )

		var legend_kozmu02 = svg_kozmu02.append("g")
			.selectAll("g")
			.data(keys_kozmu02.slice().reverse())
			.enter().append("g")
			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		legend_kozmu02.append("rect")
			.attr("x", width - width_abs_kozmu02/(900/280))
			.attr("width", width_abs_kozmu02/(900/18))
			.attr("height", width_abs_kozmu02/(900/18))
			.attr("fill", z_kozmu02);

		legend_kozmu02.append("text")
			.attr("class", "legend_kozmu02b")
			.attr("x", width-width_abs_kozmu02/(900/245))
			.attr("y", 8)
			.attr("dy", "0.32em")
			.attr("text-anchor", "start")
            .attr("font-size", width_abs_kozmu02/(900/16) )
			.text(function(d) { return d; });

		var tooltip_kozmu02 = svg_kozmu02.append("g")
			.attr("class", "tooltip_kozmu02")
			.style("visibility", "hidden");

		tooltip_kozmu02.append("rect")
			.attr("width", width_abs_kozmu02/(900/60))
			.attr("height", width_abs_kozmu02/(900/25))
			.attr("fill", "white")
			.attr("stroke", "#666")
			.attr("stroke-width", "0.5px");

		tooltip_kozmu02.append("text")
			.attr("x", width_abs_kozmu02/(900/30))
			.attr("dy", "1.2em")
            .attr("font-size", width_abs_kozmu02/(900/15) )
			.style("text-anchor", "middle");	

		serie_kozmu02.selectAll("rect")
			.on("mouseout", function() { tooltip_kozmu02.style("display", "none"); })
			.on("mousemove", function(d) {
			var delta_kozmu02 = d[1]-d[0];
			var xPosition_kozmu02 = d3.mouse(this)[0] - 25;
			var yPosition_kozmu02 = d3.mouse(this)[1] - 30;
			tooltip_kozmu02
				.style("visibility", "visible")
				.style("display", "inline")
				.attr("transform", "translate(" + xPosition_kozmu02 + "," + yPosition_kozmu02 + ")")
				.select("text").text((delta_kozmu02).toFixed(0));
		});

		serie_kozmu02.append('text')
			.attr("id", "kozmu02_forras")
			.attr("x", width- width_abs_kozmu02/(900/300))
			.attr("y",  380 + margin_kozmu02.bottom*0.66)
			.attr("text-anchor", "end")
            .attr("font-size", width_abs_kozmu02/(900/15) )
			.text("Adatok forrása: MEKH adatszolgáltatás, 2018.");
	});

}


function normalized_chart(){		
	d3.select("#svg_kozmu02").remove();

	var margin_kozmu02 = {top: width_abs_kozmu02/(900/20), right: 0, bottom: width_abs_kozmu02/(900/60), left: width_abs_kozmu02/(900/60)},
		width = width_abs_kozmu02 - margin_kozmu02.left - margin_kozmu02.right,
		height = 450 - margin_kozmu02.top - margin_kozmu02.bottom;

	var x_kozmu02 = d3.scaleBand()
		.rangeRound([0, width - width_abs_kozmu02/(900/300)])
		.paddingInner(0.15)
		.align(0.8);

	var y_kozmu02 = d3.scaleLinear()
		.rangeRound([380, 0]);

	var z_kozmu02 = d3.scaleOrdinal()
		.range(["#385988", "#43B02A", "#FF671F", "#A4343A"]);

	var svg_kozmu02 = d3.select("#viscontainer-kozmu02").append("svg")
		.attr("width", width + margin_kozmu02.left + margin_kozmu02.right)
		.attr("height", 380 + margin_kozmu02.top + margin_kozmu02.bottom)
		.attr("id","svg_kozmu02")
		.append("g")
		.attr("transform", "translate(" + margin_kozmu02.left + "," + margin_kozmu02.top + ")");

	var stack = d3.stack()
		.offset(d3.stackOffsetExpand);

	d3.csv("../../data/04_eladosodas/04_kozmu02.csv", type, function(error, data) {
		if (error) throw error;

		data.sort(function(a, b) { return b.total - a.total; });

		x_kozmu02.domain(data.map(function(d) { return d.name; }));
		z_kozmu02.domain(data.columns.slice(1));

		var serie_kozmu02 = svg_kozmu02.selectAll(".serie_kozmu02")
			.data(stack.keys(data.columns.slice(1))(data))
			.enter().append("g")
			.attr("class", "serie_kozmu02")
			.attr("fill", function(d) { return z_kozmu02(d.key); });

		serie_kozmu02.selectAll("rect")
			.data(function(d) { return d; })
			.enter().append("rect")
			.attr("x", function(d) { return x_kozmu02(d.data.name); })
			.attr("y", function(d) { return y_kozmu02(d[1]); })
			.attr("height", function(d) { return y_kozmu02(d[0]) - y_kozmu02(d[1]); })
			.attr("width", x_kozmu02.bandwidth());

		svg_kozmu02.append("g")
			.attr("class", "axis_kozmu02")
            .attr("font-size", width_abs_kozmu02/(900/16) )
			.attr("transform", "translate(0," + 380 + ")")
			.call(d3.axisBottom(x_kozmu02));

		svg_kozmu02.append("g")
			.attr("class", "axis_kozmu02")
			.call(d3.axisLeft(y_kozmu02).ticks(10, "%"));

 		svg_kozmu02.selectAll(".tick")
            .attr("font-size", width_abs_kozmu02/(900/16) )

		var legendClassArray_kozmu02 = []; 
		var legendClassArray_orig_kozmu02 = []; 

		var legend_kozmu02 = svg_kozmu02.selectAll(".legend_kozmu02")
		.data(z_kozmu02.domain().slice().reverse())
		.enter().append("g")
		.attr("class", function (d) {
			legendClassArray_kozmu02.push(d.replace(/\s+|[,]+\s/g, '')); 
			legendClassArray_orig_kozmu02.push(d); 
			return "legend_kozmu02";
		})
		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		legend_kozmu02.append("rect")
			.attr("x", width - width_abs_kozmu02/(900/280))
			.attr("width", width_abs_kozmu02/(900/18))
			.attr("height", width_abs_kozmu02/(900/18))
			.style("fill", z_kozmu02)
			.attr("id", function (d, i) {
			return "id" + d.replace(/\s+|[,]+\s/g, '')});	

		legend_kozmu02.append("text")
			.attr("class", "legend_kozmu02")
			.attr("x", width-width_abs_kozmu02/(900/245))
			.attr("y", 8)
			.attr("dy", "0.32em")
			.attr("text-anchor", "start")
            .attr("font-size", width_abs_kozmu02/(900/16) )
			.text(function(d) { return d; });

		var tooltip_kozmu02 = svg_kozmu02.append("g")
			.attr("class", "tooltip_kozmu02")
			.style("display", "none");

		tooltip_kozmu02.append("rect")
			.attr("width", width_abs_kozmu02/(900/60))
			.attr("height", width_abs_kozmu02/(900/25))
			.attr("fill", "white")
			.attr("stroke", "#666")
			.attr("stroke-width", "0.5px");

		tooltip_kozmu02.append("text")
			.attr("x", width_abs_kozmu02/(900/30))
			.attr("dy", "1.2em")
            .attr("font-size", width_abs_kozmu02/(900/15) )
			.style("text-anchor", "middle");	

		serie_kozmu02.selectAll("rect")
			.on("mouseover", function() { tooltip_kozmu02.style("display", null); })
			.on("mouseout", function() { tooltip_kozmu02.style("display", "none"); })
			.on("mousemove", function(d) {
			var delta_kozmu02 = d[1]-d[0];
			var xPosition_kozmu02 = d3.mouse(this)[0] - 25;
			var yPosition_kozmu02 = d3.mouse(this)[1] - 30;
			tooltip_kozmu02.attr("transform", "translate(" + xPosition_kozmu02 + "," + yPosition_kozmu02 + ")")
				.select("text").text(((delta_kozmu02*100).toFixed(1)).toString().replace(".",",") +"%");
		});

		serie_kozmu02.append('text')
			.attr("id", "kozmu02_forras")
			.attr("x", width- width_abs_kozmu02/(900/300))
			.attr("y",  380 + margin_kozmu02.bottom*0.66)
            .attr("font-size", width_abs_kozmu02/(900/15) )
			.text("Adatok forrása: MEKH adatszolgáltatás, 2018.");

	});


	function type(d, i, columns) {
		for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
		d.total = t;
		return d;
	}
}
