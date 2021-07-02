import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch,HashRouter,BrowserRouter } from 'react-router-dom';
import App from './App';
import NewsContent from './commpent/index/NewsContent';
import HotList from './commpent/hotHome/HotList';
import HotContent from './commpent/hotHome/HotContent';
import CaseContent from './commpent/case/CaseContent';
import ThreeList from './commpent/three/ThreeList';
import HotListParent from './commpent/hotHome/HotListParent';
import CaseList from './commpent/case/CaseList';
import AboutContent from './commpent/about/AboutContent';
import DetailsList from './commpent/complete/DetailsList';
import DegList from './commpent/deg/DegList';
import DegContent from './commpent/deg/DegContent';
import ComActiveList from './commpent/comactive/ComActiveList';
import ComActiveContent from './commpent/comactive/ComActiveContent';
import LifeAddIndex from './commpent/lifeadd/LifeAddIndex';
import VideoList from './commpent/video/VideoList';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class Root extends Component{
	render(){
		return(
			<div>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={App}></Route>
						<Route path="/details/:id" component={NewsContent}></Route>
						<Route path="/details/" component={DetailsList}></Route>

						<Route path="/hothome/:id/list/:id" component={HotContent}></Route>
						<Route path="/hothome/:id/list/" component={HotList}></Route>
						<Route path="/hothome/" component={HotListParent}></Route>

						<Route path="/casehome/:id" component={CaseContent}></Route>
						<Route path="/casehome/" component={CaseList}></Route>

						<Route path="/threehome/" component={ThreeList}></Route>

						<Route path="/about/" component={AboutContent}></Route>

						<Route path="/deg/:id" component={DegContent}></Route>
						<Route path="/deg/" component={DegList}></Route>

						<Route path="/comactivelist/:id" component={ComActiveContent}></Route>
						<Route path="/comactivelist/" component={ComActiveList}></Route>

						<Route path="/lifeadd/" component={LifeAddIndex}></Route>

						<Route path="/video/" component={VideoList}></Route>
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
