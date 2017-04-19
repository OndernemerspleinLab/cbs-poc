import React, { PureComponent } from 'react';
import axios from 'axios';
import {Stats} from './Stats';
import styled, {css} from 'styled-components';
import glamorous from 'glamorous';
import {css as glamorCss} from 'glamor';
import {parseCbsPeriod} from './cbsPeriod';

const datasetId = `82439NED`;

const datasetBaseUri = `https://opendata.cbs.nl/ODataApi/odata/${datasetId}/TypedDataSet`;
const datasetFilter = `$filter=((BedrijfstakkenBranches+eq+%27389105%27)+or+(BedrijfstakkenBranches+eq+%27389100%27)+or+(BedrijfstakkenBranches+eq+%27389300%27))+and+((substringof(%27KW%27,Perioden)))&$select=BedrijfstakkenBranches,Perioden,Waarde_1`;
 
const dataUri = `${datasetBaseUri}?${datasetFilter}`;

const infoBaseUri = `https://opendata.cbs.nl/ODataApi/odata/${datasetId}/TableInfos`;
const infoPropertyNames = `Title, Summary, ShortDescription`;
const infoUri = `${infoBaseUri}?$select=${infoPropertyNames}`;

const brancheInfoUri = `https://opendata.cbs.nl/ODataApi/odata/${datasetId}/BedrijfstakkenBranches`;

glamorCss.insert(`
  html {
    font-family: sans-serif;
    line-height: 1.6;
  }
`);

const sidePadding = css`
  padding-left: 2rem;
  padding-right: 2rem;
`;

const sidePaddingGlamorous = {
  paddingLeft: '2rem',
  paddingRight: '2rem',
};

const Title = styled.h1`
  font-weight: bold;
  font-size: 2em;
  text-align: center;
  margin-bottom: 0.5em;
  ${sidePadding}
`;

const Intro = styled.p`
  font-style: italic;
  text-align: center;
  ${sidePadding}  
`;

const ShortDescription = glamorous.p({
  maxWidth: '34rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  whiteSpace: 'pre-wrap',
}, sidePaddingGlamorous);

const Attribution = styled((props) => (
  <p {...props}>
    Data afkomstig van <a href="https://opendata.cbs.nl/">CBS</a> (<a href="https://creativecommons.org/licenses/by/3.0/nl/">Create Commons Naamsvermelding 3.0 Nederland</a>)
  </p>
))`
  font-size: 0.8rem;
  ${sidePadding}
  margin-top: 4rem;
  margin-bottom: 2rem;
  text-align: right;
`;

const groupBy = grouper => list => 
    list.reduce((memo, value) => {
        const groupName = grouper(value);

        if (!memo[groupName]) {
            memo[groupName] = [];
        }

        memo[groupName].push(value);

        return memo;
    }, {});

const processPeriods = (data) => data.map((entry) => Object.assign({}, entry, parseCbsPeriod(entry.Perioden)));
const processData = (data) => ({
  data: groupBy((item) => item.BedrijfstakkenBranches)(data)
});

export const App = class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    Promise.all([
      axios.get(dataUri).then(({data}) => processData(processPeriods(data.value))),
      axios.get(infoUri).then(({data: {value: [info]} = {}}) => info),
      axios.get(brancheInfoUri).then(({data: {value}}) => ({ bedrijfstakkenBranches: value.reduce((memo, {Key, Title}) => (memo[Key] = {Key, Title}, memo), {})})),
    ]).then((data) => this.setState((prevState) => Object.assign({}, prevState, ...data)));
  }
  render() {
    return (
      <div className="App">
        <Title>{this.state.Title}</Title>
        <Intro>{this.state.Summary}</Intro>
        <Stats data={this.state.data} bedrijfstakkenBranches={this.state.bedrijfstakkenBranches}/>
        <ShortDescription>{this.state.ShortDescription}</ShortDescription>
        <Attribution/>
      </div>
    );
  }
}
