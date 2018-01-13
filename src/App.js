//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import HeaderPart from './commpent/HeaderPart';
import SliderBanner from './commpent/SliderBanner';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderPart />
	      <SliderBanner />
      </div>
    );
  }
}

export default App;
