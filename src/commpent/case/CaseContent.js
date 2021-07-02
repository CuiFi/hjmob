import React, { Component } from 'react';
import SecondHeaderPart from '../index/SecondHeaderPart';

class CaseContent extends Component {
	constructor(props) {
		super(props);
		this.state = {listText:'',cityID:localStorage.cityID};
	}

	componentWillMount() {
		var myList = {
			method:'GET'
		};
		fetch("http://old.hejianzhiyang.com/Api/getDataByid?sheet=case&id=" + this.props.match.params.id + "&cityID=" + this.state.cityID ,myList).then(response => response.json()).then(json => this.setState({listText:json}));
		console.log(this.props.match.url);
		console.log(this.props.match.params);
		console.log(this.props.match.params.id);
		console.log(this.props.match);
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
				<SecondHeaderPart title={listText.buildName}/>
				<div style={{paddingLeft:'10px',paddingRight:'10px',paddingTop:'70px'}}>
					{/*<h3>{listText.title}</h3>*/}
					<h3 style={{marginBottom:'.2em'}}>业主背景及要求：</h3>
					<div style={{textIndent:'2em'}} className="articleContainer" dangerouslySetInnerHTML={{ __html:this.state.listText.beijing }}></div>
					<h3 style={{marginBottom:'.2em'}}>设计思路说明：</h3>
					<div style={{textIndent:'2em'}} className="articleContainer" dangerouslySetInnerHTML={{ __html:this.state.listText.silu }}></div>
					<h3 style={{marginBottom:'.2em'}}>主要材料说明：</h3>
					<div className="articleContainer" dangerouslySetInnerHTML={{ __html:this.state.listText.cailiao }}></div>
					<div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
				</div>
			</div>
		);
	};
}

export default CaseContent;
