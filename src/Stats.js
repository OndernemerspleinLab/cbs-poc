import React from 'react';
import {VictoryChart, VictoryLine, VictoryTooltip, VictoryAxis} from 'victory';
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

const RenderStats = ({data}) => (
    <StatsContainer>
        <VictoryChart domainPadding={0} animate={{}}>
            <VictoryAxis dependentAxis fixLabelOverlap/>
            <VictoryAxis
                fixLabelOverlap
                style={{
                    ticks: {stroke: "black", strokeWidth: 2, size: 2},
                    grid: {stroke: "grey"},
                }}
            />
            <VictoryLine
                data={data}
                x="Perioden"
                y="UitgesprokenFaillissementen_1"
                labels={({UitgesprokenFaillissementen_1, Perioden}) => `${UitgesprokenFaillissementen_1} in ${Perioden}`}
                labelComponent={<VictoryTooltip/>}
                interpolation="linear"
                style={{
                    data: {
                        strokeWidth: 1,
                    }
                }}
            />
        </VictoryChart>
    </StatsContainer>
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