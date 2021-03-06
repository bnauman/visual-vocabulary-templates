/**
 * General data munging functionality
 */

import * as d3 from 'd3';
import loadData from '@financial-times/load-data';

/**
 * Parses data file and returns structured data
 * @param  {String} url Path to CSV/TSV/JSON file
 * @return {Object}     Object containing series names, value extent and raw data object
 */
export function load(url, options) { // eslint-disable-line
    return loadData(url).then((result) => {
        const data = result.data ? result.data : result;
        const { sort } = options;

        const seriesNames = getSeriesNames(data.columns);

        // Use the seriesNames array to calculate the minimum and max values in the dataset
        const valueExtent = extentMulti(data, seriesNames);

        // identify total size - used for y axis
        const totalSize = d3.sum(data, d => d.size);

        let sizeCumulative = 0;

        // function that calculates the position of each rectangle in the stack
        const getSizes = function getStacks(el, key) {
            sizeCumulative = key === 0 ? 0 : sizeCumulative += Number(data[key - 1].size);
            return sizeCumulative;
        };

        const getStacks = function getStacks(el) {
            let posCumulative = 0;
            let negCumulative = 0;
            let baseX = 0;
            let baseX1 = 0;

            const stacks = seriesNames.map((name, i) => {
                if (el[name] > 0) {
                    baseX1 = posCumulative;
                    posCumulative += Number(el[name]);
                    baseX = posCumulative;
                }
                if (el[name] < 0) {
                    baseX1 = negCumulative;
                    negCumulative += Number(el[name]);
                    baseX = negCumulative;
                    if (i < 1) { baseX = 0; baseX1 = negCumulative; }
                }
                return {
                    name,
                    size: Number(el.size),
                    x: +baseX,
                    x1: +baseX1,
                    value: Number(el[name]),
                };
            });
            return stacks;
        };


        switch (sort) {
        case 'descending':
            data.sort((a, b) => b.size - a.size);// Sorts biggest rects to the left
            break;
        case 'ascending':
            data.sort((a, b) => a.size - b.size);// Sorts biggest rects to the right
            break;

        case 'alphabetical':
            data.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
        }

        const plotData = data.map((d, i) => ({
            name: d.name,
            size: Number(d.size),
            yPos: getSizes(d, i),
            bands: getStacks(d),
            total: d3.sum(getStacks(d), stack => stack.value),
        }));

        console.log(plotData);
        const columnNames = data.map(d => d.name); // create an array of the column names

        return {
            valueExtent,
            columnNames,
            seriesNames,
            totalSize,
            plotData,
            data,
        };
    });
}


// a function that returns the columns headers from the top of the dataset, excluding specified
function getSeriesNames(columns) {
    const exclude = ['name', 'size']; // adjust column headings to match your dataset
    return columns.filter(d => (exclude.indexOf(d) === -1));
}

// a function that calculates the cumulative ma min values of the dataset
function getMaxMin(values) {
    const cumulativeMax = d3.sum(values.filter(d => (d > 0)));
    const cumulativeMin = d3.sum(values.filter(d => (d < 0)));
    return [cumulativeMin, cumulativeMax];
}

// a function to work out the extent of values in an array accross multiple properties...
function extentMulti(data, columns) {
    const ext = data.reduce((acc, row) => {
        const values = columns.map(key => +row[key]);
        const maxMin = getMaxMin(values);
        const rowExtent = maxMin;
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
