import React, { Component } from 'react';

class NewsContent extends Component {
	constructor(props) {
		super(props);
		this.state = {listText:''};
	}

	componentWillMount() {
		var myList = {
			method:'GET'
		};
		fetch("http://www.hejianzhiyang.com/Api/getDataByid?type=daquan&id=" + this.props.match.params.id ,myList).then(response => response.json()).then(json => this.setState({listText:json}));
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
			<div style={{paddingLeft:'10px',paddingRight:'10px'}}>
				<h3>{listText.title}</h3>
				<div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
			</div>
		);
	};
}

export default NewsContent;
