var margin_0403 = {
    top: 80,
    right: 20,
    bottom: 75,
    left: 60
};

var width_0403 = d3.select("#topic04-vis03").node().getBoundingClientRect().width - margin_0403.left - margin_0403.right;
var height_0403 = d3.select("#topic04-vis03").node().getBoundingClientRect().height - margin_0403.top - margin_0403.bottom;

var x0_0403 = d3.scaleBand()
    .rangeRound([0, width_0403])
    .paddingInner(0.1);

var x1_0403 = d3.scaleBand()
    .padding(0.05);

var y_0403 = d3.scaleLinear()
    .rangeRound([height_0403, 0]);

var z_0403 = d3.scaleOrdinal()
    .range(["#385988", "#43B02A" , "#FF671F", "#A4343A", "#00AFD7", "#C4D600"]);

var svg_0403 = d3.select("#topic04-vis03").append("svg")
    .attr("width", width_0403 + margin_0403.left + margin_0403.right)
    .attr("height", height_0403 + margin_0403.top + margin_0403.bottom)
    .append("g")
    .attr("transform", "translate("+margin_0403.left +", "+margin_0403.top+")")

var tooltip_0403 = d3.tooltip() // returns the tooltip function
    .extent([[0,0],[width_0403,height_0403]]) // tells the tooltip how much area it has to work with
    .tips(["value", "median"],["Részvételi arány: ", "Mediánérték: "]) // tells the tooltip which properties to display in the tip and what to label thme
    .fontSize(13) // sets the font size for the tooltip
    .padding([8,4]) // sets the amount of padding in the tooltip rectangle
    .margin([10,10]) // set the distance H and V to keep the tooltip from the mouse pointer
    .visName("#topic04-vis03");

d3.tsv("../../data/04_eladosodas/04_03_haztartasok_hitelallomanya_barchart.tsv", function (d, i, columns) {
    for (var i_0403 = 1, n = columns.length; i_0403 < n; ++i_0403) d[columns[i_0403]] = +d[columns[i_0403]];
    return d;
}, function (error, data) {
    if (error) throw error;

    var keys_0403 = data.columns.slice(1).slice(0,2),
        keysbar_0403 = keys_0403.slice(0,2);

    x0_0403.domain(data.map(function (d) {
        return d.kvintilis;
    }));
    x1_0403.domain(keys_0403).rangeRound([0, x0_0403.bandwidth()]);
    y_0403.domain([0, d3.max(data, function (d) {
        return d3.max(keys_0403, function (key) {
            return d[key];
        });
    })]).nice();
    
    console.log(data);

    svg_0403.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {
            return "translate(" + x0_0403(d.kvintilis) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
            return keys_0403.map(function (key) {
                return {
                    key: key,
                    value: d[key]
                };
            });
        console.log(d);
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x1_0403(d.key);
        })
        .attr("y", function (d) {
            return y_0403(d.value);
        })
        .attr("width", x1_0403.bandwidth())
        .attr("height", function (d) {
            return height_0403 - y_0403(d.value);
        })
        .attr("fill", function (d) {
            return z_0403(d.key);
        })
        .each(tooltip_0403.events);
    
    svg_0403.call(tooltip_0403) // draws the tooltip;
    
    svg_0403.append("g")
        .attr("class", "xaxis_0403")
        .attr("transform", "translate(0," + height_0403 + ")")
        .call(d3.axisBottom(x0_0403))
        .attr("font-size", function() {
            if (width_0403 <= 500) {return (width_0403 * 0.0005 + 0.5) + "em"}
            else 	{ return "14px" }
        ;})
        .selectAll(".tick text")
        .call(wrap_0403, x0_0403.bandwidth());

    svg_0403.append("g")
        .attr("class", "yaxis_0403")
        .call(d3.axisLeft(y_0403).tickFormat(formatPercent_tooltip))
        .attr("font-size", function() {
            if (width_0403 <= 500) {return (width_0403 * 0.0005 + 0.5) + "em"}
            else 	{ return "14px" }
        ;})
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", 0 - height_0403 / 2)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("text-anchor", "middle")
        .text("Részvételi arány");

    svg_0403.append("text")
        .attr("class", "xaxis_0403")
        .attr("transform",
            "translate(" + (width_0403/2) + " ," + 
                           (height_0403 + 40) + ")")
        .attr("font-size", function() {
            if (width_0403 <= 500) {return (width_0403 * 0.0005 + 0.5) + "em"}
            else 	{ return "14px" }
        ;})
        .style("text-anchor", "middle")
        .text("Jövedelmi ötöd");

    var legend_0403 = svg_0403.append("g")
        .attr("class", "legend_0403")
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys_0403.slice())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend_0403.append("rect")
        .attr("x", width_0403 - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z_0403);

    legend_0403.append("text")
        .attr("x", width_0403 - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .attr("font-size", function() {
            if (width_0403 <= 500) {return (width_0403 * 0.0005 + 0.5) + "em"}
            else 	{ return "14px" }
        ;})
        .style("font-family", "NeueHaasGroteskDisp Pro, Arial, Helvetica, sans-serif")
        .text(function (d) {
            return d;
        });
    
    svg_0403.append("text")
        .attr("class", "title_0403")
        .attr("x", (width_0403 / 2))             
        .attr("y", 0 - (margin_0403.top / 2))
        .attr("font-size", function() {
            if (width_0403 <= 500) {return (width_0403 * 0.0005 + 0.6) + "em"}
            else 	{ return "18px" }
        ;})
        .attr("text-anchor", "middle")
        .text("A háztartások hitelállománya nettó vagyoni helyzet alapján");
    
    svg_0403.append("text")
        .attr("class", "data_source_0403")
        .attr("x", width_0403)
        .attr("y", height_0403 + 70)
        .attr("font-size", function() {
            if (width_0403 <= 500) {return (width_0403 * 0.0005 + 0.5) + "em"}
            else 	{ return "14px" }
        ;})
        .style("text-anchor", "end")
        .text("Adatok forrása: Boldizsár et al. 2016.")
        .on('click', function(d) {
		window.open(
            'http://www.hitelintezetiszemle.hu/letoltes/boldizsar-anna-kekesi-zsuzsa-koczian-balazs-sisak-balazs.pdf',
            'blank'
		);
        })
        .on('mouseover', function(d){
            d3.select(this).style("cursor", "pointer"); 
        })

        .on("mouseout", function() { d3.select(this).style("cursor", "default"); })
        .on("mousemove", function(d) {
        d3.select(this).style("cursor", "pointer"); 
        });

    // Source: https://gist.github.com/guypursey/f47d8cd11a8ff24854305505dbbd8c07
    function wrap_0403(text, width) {
        text.each(function () {
            var text_0403 = d3.select(this),
                words_0403 = text_0403.text().split(/\s+/).reverse(),
                word_0403,
                line_0403 = [],
                lineNumber_0403 = 0,
                lineHeight_0403 = 1.1, // ems
                y_0403 = text_0403.attr("y"),
                dy_0403 = parseFloat(text_0403.attr("dy")),
                tspan_0403 = text_0403.text(null).append("tspan").attr("x", 0).attr("y", y_0403).attr("dy", dy_0403 + "em")
            while (word_0403 = words_0403.pop()) {
                line_0403.push(word_0403)
                tspan_0403.text(line_0403.join(" "))
                if (tspan_0403.node().getComputedTextLength() > width) {
                    line_0403.pop()
                    tspan_0403.text(line_0403.join(" "))
                    line_0403 = [word_0403]
                    tspan_0403 = text_0403.append("tspan").attr("x", 0).attr("y", y_0403).attr("dy", `${++lineNumber_0403 * lineHeight_0403 + dy_0403}em`).text(word_0403)
                }
            }
        })
    }
    
});
