//  Load data from file
Plotly.d3.json("data/samples.json", function(data) {
    console.log(data);
});
//Plotly.d3.json("data/samples.json", function(sampledata){} );

// var sampledata = [163, 126, 113, 78, 71, 51, 50, 47, 40, 40, 
//     37, 36, 30, 28, 25, 23, 22, 19, 19, 14, 13, 13, 13, 12, 12, 
//     11, 11, 11, 10, 10, 10, 8, 7, 7, 7, 6, 5, 5, 5, 4, 4, 4, 3, 
//     3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
//      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

// Create the Trace
var trace1 = {
  x: data.samples.sample_values,
  type: "bar",
  orientation : "h"
};

// // Create the data array for the plot
 var data = [trace1];

 var layout = {
    title: "Belly Button bacteria",
  };
  
  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("bar", data, layout);
// // Define the plot layout
// var layout = {
//   title: "Eye Color vs Flicker",
//   xaxis: { title: "Eye Color" },
//   yaxis: { title: "Flicker Frequency" }
// };

// // Plot the chart to a div tag with id "bar-plot"
// Plotly.newPlot("bar-plot", data, layout)  