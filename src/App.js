import React, { Component } from 'react';
import axios from 'axios';
import {Stats} from './Stats';

const apiUrl = 'http://opendata.cbs.nl/ODataApi/odata/82242NED/TypedDataSet?$top=10&$filter=((TypeGefailleerde+eq+%27TG08%27))+and+((substringof(%27MM%27,Perioden)))';



export const App = class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    axios.get(apiUrl).then(({data}) => this.setState((prevState) => Object.assign({}, prevState, data)));
  }
  render() {
    return (
      <div className="App">
        <Stats data={this.state.value}/>
      </div>
    );
  }
}
