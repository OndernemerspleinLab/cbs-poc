import React from 'react';
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory';

export const Stats = ({data}) => 
    <VictoryChart domainPadding={20}>
        <VictoryAxis dependentAxis fixLabelOverlap/>
        <VictoryAxis fixLabelOverlap />
        <VictoryBar data={data} x="Perioden" y="UitgesprokenFaillissementen_1"/>
    </VictoryChart>;