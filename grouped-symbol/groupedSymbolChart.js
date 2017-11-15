import * as d3 from 'd3';
import * as gChartcolour from 'g-chartcolour';

export function draw() {
    let yScale = d3.scaleBand();
    let yDotScale = d3.scaleBand();
    let xDotScale = d3.scaleOrdinal();
    let seriesNames = [];
    let colourProperty = 'name'; // eslint-disable-line
    const colourScale = d3.scaleOrdinal()
        .domain(seriesNames);
    let rem = 10;
    let numberOfRows = 0;
    let showNumberLabels = false;// show numbers on end of groupedSymbols


    function groupedSymbols(parent) {
        parent.attr('transform', d => `translate(0,${yScale(d.name)})`);

            parent
                .selectAll('circle')
                    .data(d => d3.range(d.total/0.25))
                    .enter()
                    .append('circle')
                    .attr('r',yDotScale.bandwidth()/2.5)
                    .attr('id',function(d, i){
                      return 'circle'+i+'_'+d;
                    })
                    .attr('cx',function(d,i){
                        console.log(Math.floor(d / numberOfRows));
                        return xDotScale(Math.floor(d / numberOfRows))
                    })
                    .attr('cy',function(d,i){
                        return yDotScale(d % numberOfRows)
                    })
                    .attr('fill','gray')

        // // parent.selectAll('rect')
        // //     .data(d => d.groups)
        // //     .enter()
        // //     .append('rect')
        // //     .attr('class', 'groupedSymbols')
        // //     .attr('y', d => yScale1(d.name))
        // //     .attr('height', () => yScale.bandwidth())
        // //     .attr('x', d => xScale(Math.min(0, d.value)))
        // //     .attr('width', d => Math.abs(xScale(d.value) - xScale(0)))
        // //     .attr('fill', d => colourScale(d.name));

        // // if (showNumberLabels) {
        // //     parent.selectAll('text')
        // //     .data(d => d.groups)
        // //     .enter()
        // //     .append('text')
        // //     .html(d => d.value)
        // //     .attr('class', 'highlight-label')
        // //     .style('text-anchor', 'end')
        // //     .attr('y', d => yScale1(d.name) + (yScale1.bandwidth() / 2) + (rem / 2.5))
        // //     .attr('x', () => xScale(0))
        // //     .attr('dx', (d) => { if (d.value < 0) { return rem / 4; } return -(rem / 4); })
        // //     .attr('font-size', rem)
        // //     .style('text-anchor', (d) => { if (d.value < 0) { return 'start'; } return 'end'; });

        // //     let labelWidth = 0;
        // //     parent.selectAll('.label').each(function calcLabels() {
        // //         labelWidth = Math.max(this.getBBox().width, labelWidth);
        // //         // console.log(labelWidth);
        // //         // positionText(this,labelWidth)
        // //     });

        // //     parent.selectAll('.label').each(function positionLabels() {
        // //         positionText(this, labelWidth);
        // //     });
        // }

        // function positionText(item, labelWidth) {
        //     const object = d3.select(item);
        //     object.attr('transform', () => `translate(${labelWidth + (rem / 2)},0)`);
        // }
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
            colourScale.range(gChartcolour.categorical_bar);
        } else if (d === 'print') {
            colourScale.range(gChartcolour.barPrint);
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

    return groupedSymbols;
}
