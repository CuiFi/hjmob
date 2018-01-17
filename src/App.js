//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import {Divider} from 'antd';
import HeaderPart from './commpent/index/HeaderPart';
import SliderBanner from './commpent/index/SliderBanner';
import NinePage from './commpent/index/NinePage';
import WrappedNormalLoginForm from './commpent/index/FromIn';
import FourPart from './commpent/index/FourPart';
import FivePart from './commpent/index/FivePart';
import SixPart from './commpent/index/SixPart';
import SevenPart from './commpent/index/SevenPart';
import EightPart from './commpent/index/EightPart';
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
        <Divider style={{height:"10px",margin:"5px 0"}}/>
        <FivePart/>
        <Divider style={{height:"10px",margin:"5px 0"}}/>
        <SixPart/>
        <Divider style={{height:"10px",margin:"5px 0"}}/>
        <SevenPart/>
        <EightPart/>
      </div>
    );
  }
}

export default App;
