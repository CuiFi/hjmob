//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
import HeaderPart from './commpent/index/HeaderPart';
import IndexContainer from './commpent/index/IndexContainer';
import Footer from './commpent/index/Footer';
import './App.css';

class App extends Component {
	componentWillMount(){
		console.log(this.props.match.url);
		// localStorage.cityID = 7;
		console.log("bendi:"+localStorage.cityID);
	}
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
