//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import HeaderPart from './commpent/index/HeaderPart';
import IndexContainer from './commpent/index/IndexContainer';
import Footer from './commpent/index/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderPart />
	      <IndexContainer/>
	      <Footer/>
      </div>
    );
  }
}

export default App;
