import * as d3 from 'd3';
import * as gChartcolour from 'g-chartcolour';

export function draw() {
    let yScale = d3.scaleBand();
    let yDotScale = d3.scaleBand();
    let xDotScale = d3.scaleOrdinal();
    let seriesNames = [];
    let dotData = [];
    let colourProperty = 'name'; // eslint-disable-line
    const colourScale = d3.scaleOrdinal()
        .domain(seriesNames);
    let rem = 10;
    let numberOfRows = 0;
    let divisor = 1;
    const ranges = []; // eslint-disable-line no-unused-vars
    let showNumberLabels = false;// show numbers on end of groupedSymbols


    function groupedSymbols(parent) {
        if (showNumberLabels) {
            parent.attr('transform', d => `translate(0,${(yScale(d.name) + (rem / 1.5))})`);
        } else {
            parent.attr('transform', d => `translate(0,${(yScale(d.name) + (rem / 4))})`);
        }
        parent
                .selectAll('circle')
                    .data(d => d.circleCats)
                    .enter()
                    .append('circle')
                    .attr('r', yDotScale.bandwidth() / 2)
                    .attr('id', (d, i) => `${`circle${i}_${i}`}`)
                    .attr('cx', (d, i) => xDotScale(Math.floor(i / numberOfRows)))
                    .attr('cy', (d, i) => yDotScale(i % numberOfRows))
                    .attr('fill', (d) => {
                        let colourIndex = 0;
                        seriesNames.forEach((obj, k) => {
                            if (obj === d.name) {
                                colourIndex = colourScale.range()[k];
                            }
                        });
                        return colourIndex;
                    });

        if (showNumberLabels) {
            parent
                .append('text')
                .html(d => d.total)
                .attr('class', 'highlight-label')
                .style('text-anchor', 'end')
                .attr('y', () => (yScale.bandwidth() / 2) + (rem / 4))
                .attr('x', 0)
                .attr('dx', (-rem / 4))
                .attr('dy', () => (rem / 2))
                .attr('font-size', rem)
                .style('font-weight', 600);

            let labelWidth = 0;
            parent.selectAll('.label').each(function calcLabels() {
                labelWidth = Math.max(this.getBBox().width, labelWidth);
                // console.log(labelWidth);
                // positionText(this,labelWidth)
            });

            parent.selectAll('.label').each(function positionLabels() {
                positionText(this, labelWidth);
            });
        }

        function positionText(item, labelWidth) {
            const object = d3.select(item);
            object.attr('transform', () => `translate(${labelWidth + (rem / 2)},0)`);
        }
    }

    groupedSymbols.yScale = (d) => {
        yScale = d;
        return groupedSymbols;
    };
    groupedSymbols.yDomain = (d) => {
        yScale.domain(d);
        return groupedSymbols;
    };
    groupedSymbols.yRange = (d) => {
        yScale.rangeRound(d);
        return groupedSymbols;
    };
    groupedSymbols.yDotScale = (d) => {
        if (!d) return yDotScale;
        yDotScale = d;
        return groupedSymbols;
    };
    groupedSymbols.yDotDomain = (d) => {
        yDotScale.domain(d);
        return groupedSymbols;
    };
    groupedSymbols.yDotRange = (d) => {
        yDotScale.range(d);
        return groupedSymbols;
    };
    groupedSymbols.xDotScale = (d) => {
        if (!d) return xDotScale;
        xDotScale = d;
        return groupedSymbols;
    };
    groupedSymbols.xDomain = (d) => {
        xDotScale.domain(d);
        return groupedSymbols;
    };
    groupedSymbols.xRange = (d) => {
        xDotScale.range(d);
        return groupedSymbols;
    };
    groupedSymbols.colourProperty = (d) => {
        colourProperty = d;
        return groupedSymbols;
    };
    groupedSymbols.colourPalette = (d) => {
        if (d === 'social' || d === 'video') {
            colourScale.range(gChartcolour.lineSocial);
        } else if (d === 'webS' || d === 'webM' || d === 'webMDefault' || d === 'webL') {
            colourScale.range(gChartcolour.categorical_line);
        } else if (d === 'print') {
            colourScale.range(gChartcolour.linePrint);
        }
        return groupedSymbols;
    };
    groupedSymbols.seriesNames = (d) => {
        seriesNames = d;
        return groupedSymbols;
    };
    groupedSymbols.rem = (d) => {
        rem = d;
        return groupedSymbols;
    };
    groupedSymbols.showNumberLabels = (d) => {
        if (!d) return showNumberLabels;
        showNumberLabels = d;
        return groupedSymbols;
    };
    groupedSymbols.numberOfRows = (d) => {
        if (!d) return numberOfRows;
        numberOfRows = d;
        return groupedSymbols;
    };
    groupedSymbols.divisor = (d) => {
        if (!d) return divisor;
        divisor = d;
        return groupedSymbols;
    };
    groupedSymbols.dotData = (d) => {
        if (!d) return dotData;
        dotData = d;
        return groupedSymbols;
    };

    return groupedSymbols;
}
