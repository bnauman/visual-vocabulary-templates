/**
 * Chart rendering code.
 * Please rename to the same string as the parent directory.
 * @module wrapper-starter-new/factory
 */

import * as d3 from 'd3';
import gChartcolour from 'g-chartcolour';

/**
 * Chart factory function.
 * Returns a generator that draws the chart elements.
 * @return {factory~chart} Chart generator with fluent API
 */
export default function factory() {
    let rem = 10;
    let yScale = d3.scaleLinear();
    let xScale = d3.scaleTime();
    let seriesNames = [];
    let highlightNames = [];
    let yAxisAlign = 'right';
    let markers = false;
    const includeAnnotations = d => (d.annotate !== '' && d.annotate !== undefined); // eslint-disable-line
    let annotate = false; // eslint-disable-line
    let interpolation = d3.curveLinear;
    const colourScale = d3.scaleOrdinal()
    // .range(gChartcolour.lineWeb)
    .domain(seriesNames);

    /**
     * Main chart rendering function.
     * Gets called by g-chartframe.
     * @function chart
     * @param {D3Selection} parent - The parent container object as a D3 selection
     * @return {void}
     */
    function chart(parent) {

        // @TODO Your drawing function in here

    }

    /**
     * Get the y-scale.
     * @return {D3Scale}
     *//**
     * Set the y-scale.
     * @param {D3Scale} d - A D3 scale
     * @return {factory~chart}
     */
    chart.yScale = (d) => {
        if (!d) return yScale;
        yScale = d;
        return chart;
    };

    /**
     * Get the yAxis alignment value.
     * @return {string}
     *//**
     * Set the yAxis alignment value.
     * @param {string} d - The direction to align the yAxis
     * @return {factory~chart}
     */
    chart.yAxisAlign = (d) => {
        if (!d) return yAxisAlign;
        yAxisAlign = d;
        return chart;
    };

    /**
     * Get the highlighted names.
     * @return {string[]}
     *//**
     * Set the highlighted names.
     * @param {string[]} d - An array of values to highlight
     * @return {factory~chart}
     */
    chart.highlightNames = (d) => {
        highlightNames = d;
        return chart;
    };

    /**
     * Get the series names.
     * @return {string[]}
     *//**
     * Set the series names.
     * @param {string[]} d - An array of series values
     * @return {factory~chart}
     */
    chart.seriesNames = (d) => {
        if (typeof d === 'undefined') return seriesNames;
        seriesNames = d;
        return chart;
    };

    /**
     * Get the x-scale.
     * @return {D3Scale}
     *//**
     * Set the x-scale.
     * @param {D3Scale} d - A D3 scale
     * @return {factory~chart}
     */
    chart.xScale = (d) => {
        if (!d) return xScale;
        xScale = d;
        return chart;
    };

    /**
     * Get the plot dimensions.
     * @return {number[]}
     *//**
     * Set the plot dimensions.
     * @param {number[]} d - Width and height dimensions
     * @return {factory~chart}
     */
    chart.plotDim = (d) => {
        if (!d) return window.plotDim;
        window.plotDim = d;
        return chart;
    };

    /**
     * Get the rem value
     * @return {D3Scale}
     *//**
     * Set the rem value
     * @param {number} d - Value to set as rem value
     * @return {factory~chart}
     */
    chart.rem = (d) => {
        if (!d) return rem;
        rem = d;
        return chart;
    };

    /**
     * Get the annotate state
     * @return {boolean}
     *//**
     * Set the annotate state
     * @param {boolean} d - Turn annotations on or off
     * @return {factory~chart}
     */
    chart.annotate = (d) => {
        if (typeof d === 'undefined') return annotate;
        annotate = d;
        return chart;
    };

    /**
     * Get the markers state
     * @return {boolean}
     *//**
     * Set the markers state
     * @param {boolean} d - Turn markers on or off
     * @return {factory~chart}
     */
    chart.markers = (d) => {
        if (typeof d === 'undefined') return markers;
        markers = d;
        return chart;
    };

    /**
     * Get the line interpolator.
     * @return {D3Curve}
     *//**
     * Set the line interpolator.
     * @param {D3Curve} d - A D3 curve interpolator
     * @return {factory~chart}
     */
    chart.interpolation = (d) => {
        if (!d) return interpolation;
        interpolation = d;
        return chart;
    };

    /**
     * Get the colour palette.
     * @return {D3Scale}
     *//**
     * Set the colour palette.
     * @param {string} d - g-chartframe frame name
     * @return {factory~chart}
     */
    chart.colourPalette = (d) => {
        if (!d) return colourScale;
        if (highlightNames.length > 0) {
            if (d === 'social' || d === 'video') {
                colourScale.range(gChartcolour.mutedFirstLineSocial);
            } else if (d === 'webS' || d === 'webM' || d === 'webMDefault' || d === 'webL') {
                colourScale.range(gChartcolour.mutedFirstLineWeb);
            } else if (d === 'print') {
                colourScale.range(gChartcolour.mutedFirstLinePrint);
            }
            return chart;
        }
        if (d === 'social' || d === 'video') {
            colourScale.range(gChartcolour.lineSocial);
        } else if (d === 'webS' || d === 'webM' || d === 'webMDefault' || d === 'webL') {
            colourScale.range(gChartcolour.lineWeb);
        } else if (d === 'print') {
            colourScale.range(gChartcolour.linePrint);
        }
        return chart;
    };

    return chart;
}
