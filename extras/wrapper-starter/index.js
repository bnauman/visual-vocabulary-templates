/**
 * @file
 * Bootstrapping code for line chart
 * @module wrapper-starter-new/index
 */

import * as d3 from 'd3';
import * as gLegend from 'g-legend';
import gChartframe from 'g-chartframe';
import * as gAxis from 'g-axis';
import * as parseData from './parseData.js';
import lineChart from './drawChart.js';

/**
 * The data file to load
 * @type {string}
 */
const dataFile = 'data.csv';

/**
 * The formatter reflecting the date format in the data.
 *
 *  Some common formatting parsers:
 *  '%m/%d/%Y'        01/28/1986
 *  '%d-%b-%y'        28-Jan-86
 *  '%Y %b'           1986 Jan
 *  '%Y-%m-%d'        1986-01-28
 *  '%B %d'           January 28
 *  '%d %b'           28 Jan
 *  '%H:%M'           11:39
 *  '%H:%M %p'        11:39 AM
 *  '%d/%m/%Y %H:%M'  28/01/2016 11:39
 *
 * @link http://devdocs.io/d3~4/d3-format#locale_format
 * @type {string}
 */
const dateFormat = '%d/%m/%Y';

/**
 * Configuration consistent across charts.
 * Mainly used for frame microcopy.
 * @type {Object}
 */
const sharedConfig = {
    title: 'Title not yet added',
    subtitle: 'Subtitle not yet added',
    source: 'Source not yet added',
};

// @TODO Put the user defined variables below and delete where not applicable...

/**
 * Sets the minimum value on the yAxis.
 * @type {number}
 */
const yMin = 0;

/**
 * Sets the maximum value on the yAxis.
 * @type {number}
 */
const yMax = 0;

/**
 * Sets which tick to highlight on the yAxis.
 * @type {number}
 */
const yAxisHighlight = 0;

/**
 * Number of tick on the yAxis.
 * @type {number}
 */
const numTicksy = 5;

/**
 * Alignment of the yAxis.
 * @type {string}
 */
const yAxisAlign = 'right';

/**
 * Alignment of the xAxis.
 * @type {string}
 */
const xAxisAlign = 'bottom';

/**
 * Date interval on xAxis. Can be one of:
 *   - "century"
 *   - "jubilee"
 *   - "decade"
 *   - "lustrum"
 *   - "years"
 *   - "months"
 *   - "days"
 *   - "hours"
 * @type {string}
 */
const interval = 'fiscal';

/**
 * Show annotations, defined in the 'annotate' column.
 * @type {Boolean}
 */
const annotate = true;

/**
 * Show dots on lines.
 * @type {Boolean}
 */
const markers = false;

/**
 * Alignment of the legend. Can be:
 *   - "hori"
 *   - "vert"
 * @type {string}
 */
const legendAlign = 'vert';

/**
 * Geometry of legend marker. Can be:
 *   - rect
 *   - line
 *   - circ
 * @type {string}
 */
const legendType = 'line';

/**
 * Turns on or off the minor/secondary yAxis.
 * @type {Boolean}
 */
const minorAxis = true;

/**
 * Column names you wish to highlight.
 * E.g.: ['series1','series2']
 * @type {Array}
 */
const highlightNames = [];

/**
 * Curve interpolation setting.
 * Examples:
 *   - d3.curveStep
 *   - d3.curveStepBefore
 *   - d3.curveStepAfter
 *   - d3.curveBasis
 *   - d3.curveCardinal
 *   - d3.curveCatmullRom
 * @link http://devdocs.io/d3~4/d3-shape#curves
 * @type {function}
 */
const interpolation = d3.curveLinear;

/**
 * Use an inverted scale.
 * @type {Boolean}
 */
const invertScale = false;

/**
 * Use a log scale.
 * @type {Boolean}
 */
const logScale = false;

/**
 * Join gaps in lines when there are no data points.
 * @type {Boolean}
 */
const joinPoints = true;

/**
 * Use an intraday trading scale.
 * @type {Boolean}
 */
const intraday = false;

/**
 * Individual frame configuration.
 * Used to set margins (defaults shown below), _et cetera_.
 * @type {Object}
 */
const frame = {
    webS: gChartframe.webFrameS(sharedConfig)
            .margin({ top: 100, left: 15, bottom: 82, right: 5 })
            // .title('Put headline here') // Use this if you need to override the defaults
            // .subtitle("Put headline |here") // Use this if you need to override the defaults
            .height(400),

    webM: gChartframe.webFrameM(sharedConfig)
            .margin({
                top: 100, left: 20, bottom: 86, right: 5,
            })
            // .title('Put headline here')
            .height(500),

    webL: gChartframe.webFrameL(sharedConfig)
            .margin({
                top: 100, left: 20, bottom: 104, right: 5,
            })
            // .title('Put headline here')
            .height(700)
            .fullYear(true),

    webMDefault: gChartframe.webFrameMDefault(sharedConfig)
            .margin({
                top: 100, left: 20, bottom: 86, right: 5,
            })
            // .title('Put headline here')
            .height(500),

    print: gChartframe.printFrame(sharedConfig)
            .margin({ top: 40, left: 7, bottom: 35, right: 7 })
            // .title('Put headline here')
            .width(53.71)      // 1 col
            // .width(112.25)  // 2 col
            // .width(170.8)   // 3 col
            // .width(229.34)  // 4 col
            // .width(287.88)  // 5 col
            // .width(346.43)  // 6 col
            // .width(74)      // markets std print
            .height(69.85),    // std print (Use 58.21mm for markets charts that matter)

    social: gChartframe.socialFrame(sharedConfig)
            .margin({
                top: 140, left: 50, bottom: 138, right: 40,
            })
            // .title("Put headline here")
            .width(612)
            .height(612), // 700 is ideal height for Instagram

    video: gChartframe.videoFrame(sharedConfig)
            .margin({
                left: 207, right: 207, bottom: 210, top: 233,
            }),
            // .title("Put headline here")
};


// Add the frames to the page...
d3.selectAll('.framed').each(function addFrames() {
    const figure = d3.select(this);

    figure.select('svg')
        .call(frame[figure.node().dataset.frame]);
});
parseData.load(dataFile, { dateFormat, yMin, joinPoints, highlightNames })
.then(({ plotData }) => {
    Object.keys(frame).forEach((frameName) => {
        const currentFrame = frame[frameName];

        // @TODO Configure your main chart drawing function here
        const myChart = lineChart();

        // @TODO Define your other functions to be called here

        currentFrame.plot()
            .selectAll('.column-holder')
            .data(plotData)
            .enter()
            .append('g')
            .call(myChart);

        /**
         * Used when drawing the yAxis ticks.
         * @type {number}
         */
        const tickSize = currentFrame.dimension().width;

        /**
         * Create a 'g' element at the back of the chart to add time period.
         * @type {d3Selection}
         */
        const background = currentFrame.plot().append('g');

        background.append('rect')
            .attr('width', currentFrame.dimension().width)
            .attr('height', currentFrame.dimension().height)
            .attr('fill', '#ededee');
    });
});
