import React, { Component } from 'react';
import SecondHeaderPart from '../index/SecondHeaderPart';

class DegContent extends Component {
	constructor(props) {
		super(props);
		this.state = {listText:''};
	}

	componentWillMount() {
		var myList = {
			method:'GET'
		};
		fetch("http://www.hejianzhiyang.com/Api/getDataByid?sheet=designer&id=" + this.props.match.params.id ,myList).then(response => response.json()).then(json => this.setState({listText:json}));
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
				<SecondHeaderPart title={listText.name}/>
				<div style={{paddingLeft:'10px',paddingRight:'10px',paddingTop:'70px'}}>
					{/*<h3>{listText.name}</h3>*/}
					<img src={"http://www.hejianzhiyang.com/Upload/" + listText.imgName_500_500} alt={listText.name}/>
					<p>{listText.styleLike}</p>
					<div className="articleContainer" dangerouslySetInnerHTML={{ __html:this.state.listText.hangye }}></div>
				</div>
			</div>
		);
	};
}

export default DegContent;
