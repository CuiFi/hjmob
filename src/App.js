//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import {Divider} from 'antd';
import HeaderPart from './commpent/HeaderPart';
import SliderBanner from './commpent/SliderBanner';
import NinePage from './commpent/NinePage';
import WrappedNormalLoginForm from './commpent/FromIn';
import FourPart from './commpent/FourPart';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderPart />
	      <SliderBanner />
        <NinePage/>
        <Divider style={{height:"10px",margin:"5px 0"}}/>
        <WrappedNormalLoginForm/>
        <FourPart/>
      </div>
    );
  }
}

export default App;
