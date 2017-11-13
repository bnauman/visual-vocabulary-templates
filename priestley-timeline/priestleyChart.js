import * as d3 from 'd3';
import * as gChartcolour from 'g-chartcolour';

export function draw() {
    let yScale = d3.scaleBand();
    let xScale = d3.scaleTime();
    let seriesNames = [];
    let colourProperty = 'name'; // eslint-disable-line
    const colourScale = d3.scaleOrdinal()
        .domain(seriesNames);
    let rem = 10;
    let showRects = false;// show numbers on end of bars
    let showMarkers = false;// show numbers on end of bars
    let showLines = false;// show numbers on end of bars


    function bars(parent) {
        parent.attr('transform', d => `translate(0,${yScale(d.name)})`);

        if(showRects === true) {    
            for(let k = 0; k < seriesNames.length -1; k++) {
                    parent.append('rect')
                    .attr('class', 'bars')
                    .attr('y', 0)
                    .attr('height', () => yScale.bandwidth())
                    .attr('x', d => xScale(d.groups[k].value))
                    .attr('width', d => xScale(d.groups[k + 1].value) - xScale(d.groups[k].value))
                    .attr('fill', d => colourScale(k));
            };
        }   


         //connecting lines
        if (showLines === true){
                parent
                    .append('line')
                    .attr('x1', d => xScale(d.groups[0].value))
                    .attr('x2', d => xScale(d.groups[seriesNames.length - 1].value))
                    .attr('y1', d => yScale.bandwidth() / 2)
                    .attr('y2', d => yScale.bandwidth() / 2)
                    .attr('class', 'connector')
            }
       
        //circles
        if(showMarkers === true) {
            parent.selectAll('circle')
                .data(d => d.groups)
                .enter()
                .append('circle')
                .attr('r', rem / 2)
                .attr('cy', d =>  yScale.bandwidth() / 2)
                .attr('cx', d => xScale(d.value))
                .attr('fill', d => colourScale(d.name));
        }
    }

    bars.yScale = (d) => {
        yScale = d;
        return bars;
    };
    bars.yDomain0 = (d) => {
        yScale.domain(d);
        return bars;
    };
    bars.yRange0 = (d) => {
        yScale.rangeRound(d);
        return bars;
    };
    bars.yScale1 = (d) => {
        if (!d) return yScale1;
        yScale1 = d;
        return bars;
    };
    bars.yDomain1 = (d) => {
        yScale1.domain(d);
        return bars;
    };
    bars.yRange1 = (d) => {
        yScale1.rangeRound(d);
        return bars;
    };
    bars.xScale = (d) => {
        if (!d) return xScale;
        xScale = d;
        return bars;
    };
    bars.xDomain = (d) => {
        xScale.domain(d);
        return bars;
    };

    bars.xRange = (d) => {
        xScale.range(d);
        return bars;
    };
    bars.colourProperty = (d) => {
        colourProperty = d;
        return bars;
    };
    bars.colourPalette = (d) => {
        if (d === 'social' || d === 'video') {
            colourScale.range(gChartcolour.lineSocial);
        } else if (d === 'webS' || d === 'webM' || d === 'webMDefault' || d === 'webL') {
            colourScale.range(gChartcolour.categorical_bar);
        } else if (d === 'print') {
            colourScale.range(gChartcolour.barPrint);
        }
        return bars;
    };
    bars.seriesNames = (d) => {
        seriesNames = d;
        return bars;
    };
    bars.rem = (d) => {
        rem = d;
        return bars;
    };
    bars.showMarkers = (d) => {
        if (typeof d === 'undefined') return showMarkers;
        showMarkers = d;
        return bars;
    };
    bars.showLines = (d) => {
        if (typeof d === 'undefined') return showLines;
        showLines = d;
        return bars;
    };
    bars.showRects = (d) => {
        if (typeof d === 'undefined') return showRects;
        showRects = d;
        return bars;
    };

    return bars;
}
