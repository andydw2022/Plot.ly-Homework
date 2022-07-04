
DataVisualisation Homework using Plotly and Javascript
======================================================

Layout of files and folders:
----------------------------

data:
      samples.json
Images:
      Images of what is expected to be shown on the web page
static:
      js:
        app.js contains the code to display the data and make the web page interactive
index.html: File to run from github web server to see the contents of the web page
Github link is:

 https://andydw2022.github.io/Plot.ly-Homework

ABout the web page:
===================
# Plot.ly Homework - Belly Button Biodiversity
Data source:
Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)


The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people's navels, while the rest were relatively rare.

## Step 1: Plotly

1. Use the D3 library to read in `samples.json`.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Use `sample_values` as the values for the bar chart.

* Use `otu_ids` as the labels for the bar chart.

* Use `otu_labels` as the hovertext for the chart.

  ![bar Chart](Images/hw01.png)

3. Create a bubble chart that displays each sample.

* Use `otu_ids` for the x values.

* Use `sample_values` for the y values.

* Use `sample_values` for the marker size.

* Use `otu_ids` for the marker colours.

* Use `otu_labels` for the text values.

![Bubble Chart](Images/bubble_chart.png)

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

![hw](Images/hw03.png)

6. Update all of the plots any time that a new sample is selected.

![hw](Images/hw02.png)

## Advanced Challenge Assignment (Optional)

* Gauge Chart from <https://plot.ly/javascript/gauge-charts/> used to plot the weekly washing frequency of the individual.

* Washing frequency goes from 0-9 per week.

* Chart updated whenever a new individual is selected.

![Weekly Washing Frequency Gauge](Images/gauge.png)

## Deployment

Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo.

## Hints

* Use `console.log` inside of your JavaScript code to see what your data looks like at each step.

* Refer to the [Plotly.js documentation](https://plot.ly/javascript/) when building the plots.

