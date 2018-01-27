import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter,Switch,HashRouter} from 'react-router-dom';
import App from './App';
import NewsContent from './commpent/index/NewsContent';
import HotList from './commpent/hotHome/HotList';
import HotContent from './commpent/hotHome/HotContent';
import HtListParent from './commpent/hotHome/HotListParent';
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
						<Route path="/hothome/:id/list/:id" component={HotContent}></Route>
						<Route path="/hothome/:id/list/" component={HotList}></Route>
						<Route path="/hothome/" component={HtListParent}></Route>
					</Switch>
				</HashRouter>
			</div>
		)
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
