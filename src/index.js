import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter,Switch,HashRouter} from 'react-router-dom';
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
import DetailContent from './commpent/complete/DetailContent';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

export default class Root extends Component{
	render(){
		return(
			<div>
				<HashRouter>
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
					</Switch>
				</HashRouter>
			</div>
		)
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
