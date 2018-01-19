import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter,Switch,HashRouter} from 'react-router-dom';
import App from './App';
import TwelvePart from './commpent/index/TwelvePart';
import NewsContent from './commpent/index/NewsContent';
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
						<Route path="/user" component={TwelvePart}></Route>
					</Switch>
				</HashRouter>
			</div>
		)
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
