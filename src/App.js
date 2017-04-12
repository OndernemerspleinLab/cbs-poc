import React, { PureComponent } from 'react';
import axios from 'axios';
import {Stats} from './Stats';
import {injectGlobal} from 'styled-components';

const datasetUri = `http://opendata.cbs.nl/ODataApi/odata/82242NED/TypedDataSet`;
const datasetFilter = `$filter=((TypeGefailleerde+eq+%27TG08%27))+and+((substringof(%27MM%27,Perioden)))`;
const limit = 1000;

const apiUri = `${datasetUri}?$top=${limit}&${datasetFilter}`;

injectGlobal`
  html {
    font-family: sans-serif;
  }
`;

export const App = class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    axios.get(apiUri).then(({data}) => this.setState((prevState) => Object.assign({}, prevState, data)));
  }
  render() {
    return (
      <div className="App">
        <Stats data={this.state.value}/>
      </div>
    );
  }
}
