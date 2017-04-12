import React, { PureComponent } from 'react';
import axios from 'axios';
import {Stats} from './Stats';
import styled, {css, injectGlobal} from 'styled-components';

const datasetId = `82242NED`;
const limit = 100;

const datasetBaseUri = `http://opendata.cbs.nl/ODataApi/odata/${datasetId}/TypedDataSet`;
const datasetFilter = `$filter=((TypeGefailleerde+eq+%27TG08%27))+and+((substringof(%27MM%27,Perioden)))`;
 
const dataUri = `${datasetBaseUri}?$top=${limit}&${datasetFilter}`;

const infoBaseUri = `http://opendata.cbs.nl/ODataApi/odata/${datasetId}/TableInfos`;
const infoPropertyNames = `Title, Summary, ShortDescription`;
const infoUri = `${infoBaseUri}?$select=${infoPropertyNames}`;

injectGlobal`
  html {
    font-family: sans-serif;
    line-height: 1.6;
  }
`;

const sidePadding = css`
  padding-left: 2rem;
  padding-right: 2rem;
`;

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
const ShortDescription = styled.p`
  ${sidePadding}
  max-width: 34rem;
  margin-left: auto;
  margin-right: auto;
  white-space: pre-wrap;
`;

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

export const App = class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    axios.get(dataUri).then(({data}) => this.setState((prevState) => Object.assign({}, prevState, data)));
    axios.get(infoUri).then(({data: {value: [info]} = {}}) => this.setState((prevState) => Object.assign({}, prevState, info)));
  }
  render() {
    return (
      <div className="App">
        <Title>{this.state.Title}</Title>
        <Intro>{this.state.Summary}</Intro>
        <Stats data={this.state.value}/>
        <ShortDescription>{this.state.ShortDescription}</ShortDescription>
        <Attribution/>
      </div>
    );
  }
}
