/**
 * @file
 * General data munging functionality
 * @module wrapper-starter-new/parseData
 */

import * as d3 from 'd3';
import loadData from '@financial-times/load-data';

/**
 * Parses data file and returns structured data
 * @param {string} url - Path to CSV/TSV/JSON file
 * @param {Options} options - Configuration object, dependent upon chart template
 * @return {Object}          Object containing series names, value extent and raw data object.
 */
export function load(url, options) {
    return loadData(url).then((result) => {
        const data = result.data ? result.data : result;
        const { yMin, joinPoints, highlightNames, dateFormat } = options; // eslint-disable-line no-unused-vars

        // Ensure all the dates in the date column are a date object...
        const parseDate = d3.timeParse(dateFormat);
        data.forEach((d) => {
            d.date = parseDate(d.date);
        });

        /**
         * Automatically calculate the seriesnames, excluding the "marker" and "annotate column".
         * @type {Array}
         */
        const seriesNames = getSeriesNames(data.columns);

        /**
         * Array for calculating the minimum and max values in the dataset.
         * @type {Array}
         */
        const valueExtent = extentMulti(data, seriesNames); // eslint-disable-line no-unused-vars

        /**
         * Format the dataset that is used to draw the lines
         * @type {Array}
         */
        const plotData = seriesNames.map(d => ({
            name: d,
            lineData: getlines(data, d),
        }));

        if (highlightNames.length > 0) {
            plotData.sort((a, b) => {
                if (highlightNames.indexOf(a.name) > highlightNames.indexOf(b.name)) {
                    return 1;
                } else if (highlightNames.indexOf(a.name) === highlightNames.indexOf(b.name)) {
                    return 0;
                }
                return -1;
            });
        }

        /**
         * Filter data for annotations.
         * @type {Array}
         */
        const annos = data.filter(d => (d.annotate !== '' && d.annotate !== undefined));

        /**
         * Format the data that is used to draw highlight tonal bands.
         * @type {Array}
         */
        const boundaries = data.filter(d => (d.highlight === 'begin' || d.highlight === 'end'));
        const highlights = boundaries.map((d, i) => {
            if (d.highlight === 'begin') {
                return { begin: d.date, end: boundaries[i + 1].date };
            }
            return undefined;
        });

        return {
            plotData,
            highlights,
            annos,
        };
    });
}


/**
 * Returns the columns headers from the top of the dataset, excluding specified
 * @param  {Array} columns Columns to get headers from
 * @return {Array}         Array of column headers
 */
export function getSeriesNames(columns) {
    const exclude = ['date', 'annotate', 'highlight'];
    return columns.filter(d => (exclude.indexOf(d) === -1));
}

/**
 * Calculates the extent of multiple columns
 * @param {Array} data - Multiple columns of data
 * @param {Array} columns - Column names as strings
 * @return {Array}         Array containing the min and max of all columns
 */
function extentMulti(data, columns) {
    const ext = data.reduce((acc, row) => {
        const values = columns.map(key => +row[key]);
        const rowExtent = d3.extent(values);
        if (!acc.max) {
            acc.max = rowExtent[1];
            acc.min = rowExtent[0];
        } else {
            acc.max = Math.max(acc.max, rowExtent[1]);
            acc.min = Math.min(acc.min, rowExtent[0]);
        }
        return acc;
    }, {});
    return [ext.min, ext.max];
}

/**
 *  Sorts the column information in the dataset into groups according to the column
  * head, so that the line path can be passed as one object to the drawing function
 * @param {Object} d - Datum
 * @param {Object} group - Group
 * @param {Boolean} joinPoints - Whether to join points together
 * @return {Array}              Array of objects containing each line's data
 */
export function getlines(d, group, joinPoints) {
    const lineData = [];
    d.forEach((el) => {
        const column = {};

        column.name = group;
        column.date = el.date;
        column.value = +el[group];
        column.highlight = el.highlight;
        column.annotate = el.annotate;

        if (el[group]) {
            lineData.push(column);
        }

        if (el[group] === false && joinPoints === false) {
            lineData.push(null);
        }
    });

    return lineData;
}
