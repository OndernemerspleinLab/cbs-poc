import React from 'react';
import {VictoryChart, VictoryGroup, VictoryLine, VictoryBar, VictoryAxis, VictoryTheme, VictoryLegend} from 'victory';
import styled, {keyframes} from 'styled-components';

const hasData = ({data}) => data !== null && data !== undefined;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const StatsContainer = styled.div`
    animation: ${fadeIn} 0.3s ease-in;
`;

const lineColors = [
    'red',
    'purple',
    'blue'
];

const StatsLegend = ({data, bedrijfstakkenBranches}) => (
    <VictoryLegend
        colorScale={lineColors}
        data={Object.keys(data).map((key, index) => ({name: bedrijfstakkenBranches[key].Title, symbol: {type: 'square', fill: lineColors[index]}}))}
        symbolSpacer={2}
        gutter={4}
        x={4}
        style={{
            data: {opacity: 0.5},
            labels: { fontSize: 5 },
        }}
        padding={0}
        orientation="horizontal"
    />
);

const RenderStats = ({data, limit = 10, bedrijfstakkenBranches}) => (
    <div>
        <StatsContainer>
            <VictoryChart width={350} height={200} domainPadding={15} style={{parent:{maxHeight: '100vh'}}} theme={VictoryTheme.material}>
                <VictoryAxis
                    dependentAxis
                    fixLabelOverlap
                        
                    style={{
                        tickLabels: {
                            fontSize: '7px',
                        }
                    }}
                />
                <VictoryAxis
                    fixLabelOverlap
                    
                    style={{
                        tickLabels: {
                            fontSize: '7px',
                        }
                    }}
                    tickValues={Object.values(data)[0].slice(-limit).map(({format}) => format())}
                />
                <VictoryGroup colorScale={lineColors}>
                    {Object.values(data).map((dataGroup, index) => (
                        <VictoryBar
                            data={dataGroup.slice(-limit)}
                            x={({format}) => format()}
                            y="Waarde_1"
                            key={index}
                            interpolation="cardinal"
                            style={{
                                data: {
                                    opacity: 0.5,
                                    width: 5,
                                    transform: `translateX(${6 * (index - 1)}px)`,
                                }
                            }}
                        />
                    ))}
                </VictoryGroup>
                {StatsLegend({data, bedrijfstakkenBranches})}
            </VictoryChart>
        </StatsContainer>
        <StatsContainer>
            <VictoryChart width={350} height={200} domainPadding={0} style={{parent:{maxHeight: '100vh'}}} theme={VictoryTheme.material}>
                <VictoryAxis
                    dependentAxis
                    fixLabelOverlap
                        
                    style={{
                        tickLabels: {
                            fontSize: '7px',
                        }
                    }}
                />
                <VictoryAxis
                    fixLabelOverlap
                    
                    style={{
                        tickLabels: {
                            fontSize: '7px',
                        }
                    }}
                    tickValues={Object.values(data)[0].map(({format}) => format())}
                />
                <VictoryGroup colorScale={lineColors}>
                    {Object.values(data).map((dataGroup, index) => (
                        <VictoryLine
                            data={dataGroup}
                            x={({format}) => format()}
                            y="Waarde_1"
                            key={index}
                            interpolation="cardinal"
                            style={{
                                data: {
                                    strokeWidth: 1,
                                    opacity: 0.5,
                                }
                            }}
                        />
                    ))}
                </VictoryGroup>
                {StatsLegend({data, bedrijfstakkenBranches})}
            </VictoryChart>
        </StatsContainer>
    </div>
);

const Message = styled.p`
    opacity: 0;
    animation: ${fadeIn} 0.2s ease-in 0.2s forwards;
`;

const RenderLoadingStats = () => (
    <Message>
        {`Een moment gedult AUB`}
    </Message>
);

export const Stats = (props) => hasData(props) ? RenderStats(props) : RenderLoadingStats(props);