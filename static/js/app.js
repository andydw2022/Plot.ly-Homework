//Load data from file in json format
//
d3.json('data/samples.json').then(function(data)  {
    console.log('---data payload-------------');
    console.log(data);
    var inputdata=data;
    var meta_data=data.metadata
    //Choose an indvidual to start a plot. pick "940" the first one 
    var initialdataset = inputdata.samples.filter(sample => sample.id === "940")[0];
    var chosenid=initialdataset.id
    console.log('---chosenid---------------');
    console.log(chosenid);
    //console.log('---initialdataset payload----------------');
    console.log(initialdataset);
    
    samplevalues = initialdataset.sample_values;
    console.log('---samplevalues payload----------------');
    console.log(samplevalues)
    initial_otu_ids = initialdataset.otu_ids;
    intial_otu_labels = initialdataset.otu_labels;
    console.log('---initial_otu_ids payload----------------');
    console.log(initial_otu_ids);
    console.log('---initial_otu_labels payload----------------');
    console.log(intial_otu_labels);
    // Use slice to select the top 10 OTUs for the chosen individual's sample_values, otu_ids and otu_labels
    // Values seen to be already sorted.
    samplevalues_10 = samplevalues.slice(0, 10);
    otu_ids_10 = initial_otu_ids.slice(0, 10);
    otu_labels_10 = intial_otu_labels.slice(0, 10);
    //Check what values we got 
    console.log('---Top ten of samplesvalues, otu_ids and otu_labels----------------');
    console.log(samplevalues_10);
    console.log(otu_ids_10);
    console.log(otu_labels_10);

    // Create a drop down list of individuals' ids
    var names = data.names;
    names.forEach((name) => {
	d3.select("#selDataset").append("option").text(name);
	})

   // Create the first trace for the horizontal bar chart
   var trace1 = {
     x: samplevalues_10,
     y: otu_ids_10.map(outId => `OTU ${outId}`),
     text: otu_labels_10,
     type: "bar",
     orientation: "h"
   };

   // data for horizontal bar chart
   var h_barData = [trace1];

   // Prepare layout parameters for the horizontal bar layout
   var h_barlayout = {
     title: `<b>Top 10 OTUs found in Test Subject #${chosenid}<b>`,
     xaxis: { title: "Sample Value"},
     yaxis: { title: "OTU ID"},
     autosize: false,
     width: 450,
     height: 600
   }
   //Create second trace for the bubble chart
   var trace2 = {
     x: initial_otu_ids,
     y: samplevalues,
     text: intial_otu_labels,
     mode: 'markers',
     marker: {
       color: initial_otu_ids,
       size: samplevalues
     }
   };

   var bubble_data = [trace2];
   //Prepare layout parameters for the bubble chart
   var bubbleLayout = {
     title: `<b>Bubble Chart OTU IDs in Test Subject #${chosenid} <b>`,
     xaxis: { title: "OTU ID"},
     yaxis: { title: "Sample Value"}, 
     showlegend: false,
   };
   // Put the bubble chart plot to the div tag with id "bubble"
   Plotly.newPlot('bubble', bubble_data, bubbleLayout);
   // Put the bar chart plot to the div tag with id "bar"
   Plotly.newPlot("bar", h_barData, h_barlayout);
   
   // Display metatdata of an individual's demographic information.
   metainfo = data.metadata.filter(sample => sample.id == chosenid)[0];
   
   // Wipe the contents of the panel
   d3.select("#sample-metadata").html("");
 
   // Display each key-value pair from the metadata JSON object
   Object.entries(metainfo).forEach(([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`));
 
  // Advanced Challenge Assignment : Gauge Chart
   var wfreq = metainfo.wfreq;
   var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: metainfo.wfreq,
      gauge: {
        axis: { visible: true,range: [0,9], dtick: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6","6-7","7-8","8-9"] },
        steps: [
          { range: [0, 1], color: 'rgb(255, 255, 255)',text:"0-1" },
          { range: [1, 2], color: 'rgb(232,226,202)' },
          { range: [2, 3], color: 'rgb(226,210,172)' },
          { range: [3, 4], color: 'rgb(223,189,139)'},
          { range: [4, 5], color: 'rgb(215, 230, 255)' },
          { range: [5, 6], color: 'rgb(223,162,103)' },
          { range: [6, 7], color: 'rgb(226,126,64)' },
          { range: [7, 8], color: 'rgb(226,100,64)' },
          { range: [8, 9], color: 'rgb(175, 250, 255)' }       
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 9
        }},
      title: { text: `Belly Button Washing Frequency <br> Test Subject #${chosenid} Weekly Washings`},
      type: "indicator",
      mode: "gauge+number"
    }
  ]
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);
})
//
//Call this function when the user uses the drop down list to select a new individual
//
function refreshPlot() {
     //Read data in again for a new test subject
    // Assign the value of the dropdown menu option to a variable
    console.log('----- New individual chosen----------');
    // Select the dropdown menu
    var rp_dropdownlist = d3.select("#selDataset");
    // Filter the dataset based on new individual
    var rp_chosenid = rp_dropdownlist.property("value");
    console.log(rp_chosenid);
    d3.json('data/samples.json').then(function(data)  {
       var rp_data=data;
       console.log('---rp_data payload');
       console.log(rp_data);
     
       var rp_dataset = rp_data.samples.filter(sample => sample.id === rp_chosenid)[0];
       console.log('---rp_data new indivdual"s  payload ', rp_chosenid);
       console.log(rp_dataset);
   
     // Select all sample_values, otu_ids and otu_labels of the selected test ID
       var rp_sample_values = rp_dataset.sample_values;
       var rp_otu_ids = rp_dataset.otu_ids;
       var rp_otu_labels = rp_dataset.otu_labels;
   
     // Select the top 10 OTUs for the chosen ID with its sample_values, otu_ids and otu_labels
       var rp_samplevalues_10 = rp_sample_values.slice(0, 10);
       var rp_otu_ids_10      = rp_otu_ids.slice(0, 10);
       var rp_otu_labels_10   = rp_otu_labels.slice(0, 10);
    //Check what values we got 
      console.log('---Top ten of samplesvalues, otu_ids and otu_labels of new test subject *',rp_chosenid)      
       console.log(rp_samplevalues_10);
       console.log(rp_otu_ids_10);
       console.log(rp_otu_labels_10);
     // Refresh horizontal bar chart
     // Wipe the contents of the panel
      d3.select("#sample-metadata").html("");
      d3.select("#bar").html("");
      d3.select("#bubble").html("");
      d3.select("#gauge").html("");
     // Create the first trace for the horizontal bar chart
   var trace1 = {
    x: rp_samplevalues_10,
    y: rp_otu_ids_10.map(outId => `OTU ${outId}`),
    text: rp_otu_labels_10,
    type: "bar",
    orientation: "h"
  };

  // data for horizontal bar chart
  var h_barData = [trace1];

  // Prepare layout parameters for the horizontal bar layout
  var h_barlayout = {
    title: `<b>Top 10 OTUs found in Test Subject #${rp_chosenid}<b>`,
    xaxis: { title: "Sample Value"},
    yaxis: { title: "OTU ID"},
    autosize: false,
    width: 450,
    height: 600
  }
  //Create second trace for the bubble chart
  var trace2 = {
    x: rp_otu_ids,
    y: rp_samplevalues_10,
    text: rp_otu_labels_10,
    mode: 'markers',
    marker: {
      color: rp_otu_ids_10,
      size: rp_samplevalues_10
    }
  };

  var bubble_data = [trace2];
  //Prepare layout parameters for the bubble chart
  var bubbleLayout = {
    title: `<b>Bubble Chart OTU IDs in Test Subject #${rp_chosenid} <b>`,
    xaxis: { title: "OTU ID"},
    yaxis: { title: "Sample Value"}, 
    showlegend: false,
  };
  // Put the bubble chart plot to the div tag with id "bubble"
  Plotly.newPlot('bubble', bubble_data, bubbleLayout);
  // Put the bar chart plot to the div tag with id "bar"
  Plotly.newPlot("bar", h_barData, h_barlayout);

     // Display metatdata of an individual's demographic information.
     rp_metainfo = data.metadata.filter(sample => sample.id == rp_chosenid)[0];
   
     // Wipe the contents of the panel
     d3.select("#sample-metadata").html("");
   
     // Display each key-value pair from the metadata JSON object
     Object.entries(rp_metainfo).forEach(([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`));
   
     // Advanced Challenge Assignment : Gauge Chart
     var rp_wfreq = rp_metainfo.wfreq;
     var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: rp_metainfo.wfreq,
        gauge: {
          axis: { visible: true,range: [0,9], dtick: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6","6-7","7-8","8-9"] },
          steps: [
            { range: [0, 1], color: 'rgb(255, 255, 255)',text:"0-1" },
            { range: [1, 2], color: 'rgb(232,226,202)' },
            { range: [2, 3], color: 'rgb(226,210,172)' },
            { range: [3, 4], color: 'rgb(223,189,139)'},
            { range: [4, 5], color: 'rgb(215, 230, 255)' },
            { range: [5, 6], color: 'rgb(223,162,103)' },
            { range: [6, 7], color: 'rgb(226,126,64)' },
            { range: [7, 8], color: 'rgb(226,100,64)' },
            { range: [8, 9], color: 'rgb(175, 250, 255)' }       
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 9
          }},
        title: { text: `Belly Button Washing Frequency <br> Test Subject #${rp_chosenid} Weekly Washings`},
        type: "indicator",
        mode: "gauge+number"
      }
    ]
   
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);
   })
};