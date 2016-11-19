<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <script src="https://d3js.org/d3.v3.min.js"></script>
  <style>
    body { margin:0;position:fixed;top:0;right:0;bottom:0;left:0; }
    .line {
      fill: none;
      stroke: black;
      stroke-width: 1.5px;
    }
  </style>
</head>

<body>
  <script>
    // Feel free to change or delete any of the code you see in this editor!
    var svg = d3.select("body").append("svg")
      .attr("width", 960)
      .attr("height", 500)

    var width = 800;
    var height = 400;

    // http://bl.ocks.org/zanarmstrong/raw/05c1e95bf7aa16c4768e/
    var parseDate = d3.time.format("%Y-%m");
    var displayDate = d3.time.format("%b %y");
    var displayValue = d3.format(",.0f");
    
    // Ordinal scale
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .5);

    var y = d3.scale.linear()
        .range([height, height - 200]);

    var line = d3.svg.line()
        .x(function(d) { return x(d.name); })
        .y(function(d) { return y(d.value); });
    
    var g = svg.append("g")
    	.attr("transform", "translate(50, 0)")
    
   	d3.json("dataset.json", function(data) {

      // Pre-processing
      data.forEach(function(d) {
				d.value;// = +d.value;
        d["date"] = parseDate.parse(d["date"]);
      });
      
      x.domain(data.map(function(d) { return d.name; }));
			y.domain([0, d3.max(data, function(d) { return d.value; })]);
      
      svg.selectAll("text").data(data).enter()
       .append("text")
        .text(function(d, i) { return displayDate(d.date); })
        .attr("y", 420)
        .attr("x", function(d) { return x(d.name); })
        .style("font-size", 10)
        .style("font-family", "monospace");
      
// la partie modifiée...

       svg.selectAll(".value").data(data).enter()
           .append("circle")
            .attr("cx", function(d) { return x(d.name) + 50; })
            .attr("cy", function(d) { return y(d.value); })
            .attr("r", 5)
            .style("fill", "black")
       
         .on("mouseover", function(d) {
                 d3.select(this).style("fill", "red")
                 svg.selectAll("#line").data([d]).enter()
                    .append("line")
                    .style("stroke", "black")
                    .style("stroke-dasharray", ("2"))
                    .attr("id","line")
                    .attr("x1",function(d){return x(d.name)+50;})
                    .attr("y1",function(d){return y(d.value);}) 
                    .attr("x2",function(d){return x(d.name)+50;})
                    .attr("y2",400)
                 svg.selectAll("#tooltip").data([d]).enter()
                 		.append("text")
                    .text(function(d){return(d.value);})
                    .attr("id","tooltip")
                    .attr("x",function(d){return x(d.name)+50;})
                    .attr("y",function(d){return y(d.value)-25;})
                    .style("fill","green")
             })
       
            .on("mouseout", function(d){
              d3.select(this).style("fill","black")
              svg.selectAll("#line, #tooltip").data(data).remove()
            });       
//

      g.selectAll(".value").data([data[data.length -1]]).enter()
       .append("text")
        .text(function(d, i) { return displayValue(d.value); })
        .attr("class", "value")
        .attr("y", function(d) { return y(d.value); })
        .attr("x", width - 20)
        .style("font-size", 20)
        .style("font-family", "monospace");

      g.selectAll("path").data([data]).enter().append("path")
        .attr("class", "line")
        .attr("d", line);

      
    });

  </script>
</body>
