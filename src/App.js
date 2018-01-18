//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import HeaderPart from './commpent/index/HeaderPart';
import IndexContainer from './commpent/index/IndexContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderPart />
	      <IndexContainer/>
      </div>
    );
  }
}

export default App;
