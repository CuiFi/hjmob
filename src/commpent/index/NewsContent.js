import React, { Component } from 'react';
import SecondHeaderPart from './SecondHeaderPart';

class NewsContent extends Component {
	constructor(props) {
		super(props);
		this.state = {listText:''};
	}

	componentWillMount() {
		var myList = {
			method:'GET'
		};
		fetch("http://www.hejianzhiyang.com/Api/getDataByid?sheet=daquan&id=" + this.props.match.params.id ,myList).then(response => response.json()).then(json => this.setState({listText:json}));
		console.log(this.props.match.url);
		// console.log(this.props.match.params);
		// console.log(this.props.match);
	};

	createMarkup() {
		return { __html:this.state.listText.content };
	};

	render() {
		const {listText} = this.state;
		// const newsList = listText.length
		// 	? listText.map((newsItem, index) => (
		// 		<li key={index}>
		// 			<div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
		// 		</li>
		// 	))
		// 	: '没有加载到任何新闻';
		return (
			<div>
				<SecondHeaderPart title={listText.labelsName}/>
				<div style={{paddingLeft:'10px',paddingRight:'10px',marginTop:'64px'}}>
					<h3>{listText.title}</h3>
					<div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
				</div>
			</div>
		);
	};
}

export default NewsContent;
