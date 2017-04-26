var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 100};
var width = 860 - margin.right;
var height = 400 - margin.top - margin.bottom;

var xScaleRent = d3.scaleLinear().domain([2011, 2015]).range([0, width]),
    yScaleRent = d3.scaleLinear().domain([600, 2800]).range([height, 0]),
    colorScale = d3.scaleOrdinal(["#7116b0", "#03c942", "#7ebcb3", "#f18a72", "#08c6db", "#d7090d", "#8a97a4", "#18f8ff", "#f4325a", "#f4325a", "#cec755", "#7d6e44", "#6a2e26", "#31b3f6", "#2543e5", "#5926d9", "#ae992f", "#7ff16a", "#2ff634", "#5c4fb7", "#7d1c68", "#d2d844", "#683389", "#64b602", "#508527", "#e1adb7", "#bc2fc3", "#d34d8b", "#c94f07", "#f43ad5", "#025cc2", "#896f5c", "#5c7955", "#fbb375", "#af024c", "#fe8eb3", "#600ac4", "#bb5047", "#09435b", "#ca2acb", "#e33705", "#48cb93", "#a628db"]);

var xAxisRent = d3.axisBottom(xScaleRent).ticks(5),
    yAxisRent = d3.axisLeft(yScaleRent);

// Append the SVG container and set the origin
var svgRent = d3.select("#chart1")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Append the x axis
svgRent.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisRent);

svgRent.append("g")
    .attr("class", "axis")
    .call(yAxisRent);

svgRent.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("transform", "translate(" + width + "," + (height - 5) + ")")
    .text("year");

svgRent.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("transform", "translate(7, -5)")
    .attr("transform", "rotate(270 7 -5)")
    .text("average median rent");

d3.csv("data/median_rent/averageMedianRentChangeBySubborough.csv", function (subboroughs) {
  svgRent.append("g")            
      .selectAll("path")
      .data(subboroughs)
      .enter()
      .append("path")
      .attr("class", function(d) { return "median rent change " + d["subborough"].replace(/ /g, "").replace(".", "").toLowerCase(); })
      .attr("d", function(d) {
    
          //append checkboxes
          var checkbox = d3.select("#filter")
                          .append("g")
                          .attr("style", "display:block;");
          checkbox.append("input")
                  .attr("type", "checkbox")
                  .attr("class", "subborough-filter")
                  .attr("id", d["subborough"].replace(/ /g, "").replace(".", "").toLowerCase())
                  .attr("value", d["subborough"].replace(/ /g, "").replace(".", "").toLowerCase());

          checkbox.append("text")
                  .text("   " + d["subborough"]);
      
    
          var path = "";
          for (year of Object.keys(d)) {
            if (!isNaN(year)) {
              if (year == "2011") {
                path += ("M " + xScaleRent(year) + " " + yScaleRent(d[year]));
              } else {
                path += (" L " + xScaleRent(year) + " " + yScaleRent(d[year]));
              }  
            }
          }
          return path;
      })
      .attr("fill", "none")
      .attr("stroke", function(d) { return colorScale(d["subborough"]); });
});

var svgEvents = d3.select("#chart2")
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScaleEvents = d3.scaleLinear().domain([2011, 2015]).range([0, width]),
    yScaleEvents = d3.scaleLinear().domain([0, 1]).range([height, 0]);

var xAxisEvents = d3.axisBottom(xScaleEvents).ticks(5),
    yAxisEvents = d3.axisLeft(yScaleEvents);

// Append the x axis
svgEvents.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisEvents);

svgEvents.append("g")
    .attr("class", "axis")
    .call(yAxisEvents);

svgEvents.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("transform", "translate(" + width + "," + (height - 5) + ")")
    .text("year");

svgEvents.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
//    .attr("transform", "translate(7, -5)")
    .attr("transform", "rotate(270 7 -5)")
    .text("% Facebook events that are art-related");

d3.csv("data/fb_events/changeInFacebookEvents.csv", function (subboroughs) {
  svgEvents.append("g")            
      .selectAll("path")
      .data(subboroughs)
      .enter()
      .append("path")
      .attr("class", function(d) { return "fb event change " + d["subborough"].replace(/ /g, "").replace(".", "").toLowerCase(); })
      .attr("d", function(d) {
          var path = "";
          for (year of Object.keys(d)){
            if (!isNaN(year)) {
              if (year == "2011") {
                path += ("M " + xScaleEvents(year) + " " + yScaleEvents(d[year]));
              } else {
                path += (" L " + xScaleEvents(year) + " " + yScaleEvents(d[year]));
              }  
            }
          }
          
          return path;
      })
      .attr("fill", "none")
      .attr("stroke", function(d) { return colorScale(d["subborough"]); });
    
  
});

var svgIncome = d3.select("#chart3")
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScaleIncome = d3.scaleLinear().domain([2011, 2015]).range([0, width]),
    yScaleIncome = d3.scaleLinear().domain([0, 200000]).range([height, 0]);

var xAxisIncome = d3.axisBottom(xScaleIncome).ticks(5),
    yAxisIncome = d3.axisLeft(yScaleIncome);

// Append the x axis
svgIncome.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisIncome);

svgIncome.append("g")
    .attr("class", "axis")
    .call(yAxisIncome);

svgIncome.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("transform", "translate(" + width + "," + (height - 5) + ")")
    .text("year");

svgIncome.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
//    .attr("transform", "translate(7, -5)")
    .attr("transform", "rotate(270 7 -5)")
    .text("average household income");

d3.csv("data/average_income/averageIncomeBySubborough.csv", function (subboroughs) {
  svgIncome.append("g")            
      .selectAll("path")
      .data(subboroughs)
      .enter()
      .append("path")
      .attr("class", function(d) { return "average income change " + d["subborough"].replace(/ /g, "").replace(".", "").toLowerCase(); })
      .attr("d", function(d) {
          var path = "";
          for (year of Object.keys(d)){
            if (!isNaN(year)) {
              if (year == "2011") {
                path += ("M " + xScaleIncome(year) + " " + yScaleIncome(d[year]));
              } else {
                path += (" L " + xScaleIncome(year) + " " + yScaleIncome(d[year]));
              }  
            }
          }
          
          return path;
      })
      .attr("fill", "none")
      .attr("stroke", function(d) { return colorScale(d["subborough"]); });
  
  
  
});

$(document).ready(function(){
  
  $(".subborough-filter").click(function(event) {
    
    const subborough = event.target.value;
    console.log(subborough);
    if (subborough == "all") {
      //uncheck everything else
      $(".subborough-filter").each(function() {
        if ($("#all").is(":checked")) {
          if ($(this).val() != "all") {
            $(this).prop("checked", false);
            $("." + $(this).val()).each(function() {
              $(this).removeClass("hidden");  
            }); 
          }
        } else {
          $("#all").prop("checked", true);
        }
      });
      //change display of everything to not hidden
    } else {
      if($("#all").is(":checked")) {
        $("#all").prop("checked", false);
        $(".subborough-filter").each(function() {
          if($(this).val() != subborough && $(this).val() != "all") {
            $("." + $(this).val()).each(function() {
              $(this).toggleClass("hidden");  
            });
          }
        });
      } else {
        
        if($("#" + subborough).is(":checked")) {
          $("." + subborough).each(function() {
            $(this).removeClass("hidden");  
          });
        } else {
          $("." + subborough).each(function() {
            $(this).toggleClass("hidden");  
          });
        }
        
        
      }
      
      
      
    }
    
    
    
    
    
    
    if($("#All").is(":checked")) {
      
    }
    
//    console.log(event.target.value);
//    console.log($("input[type=checkbox]:checked"));
  });
  
  
//  const filters = $(".subborough-filter");
//  console.log(filters);
//  
//  for (let i = 0; i < filters.length; i++) {
//    console.log(filters[i].attr('value'));
////    if (filters[i].is(":checked")) {
////      console.log(filters[i].val());
////    }
//  }
  
//  $(".subborough-filter").is(":checked", function() {
//    console.log("checked");
//    console.log($(".subborough-filter:checked"));
//  });
  
});