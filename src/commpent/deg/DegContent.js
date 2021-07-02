import React, { Component } from 'react';
import SecondHeaderPart from '../index/SecondHeaderPart';
import {Card, Col, Row, Spin} from "antd";
import {Link} from "react-router-dom";

class DegContent extends Component {
	constructor(props) {
		super(props);
		this.state = {listText:'',itemImg:'',cityID:localStorage.cityID};
	}

	componentWillMount() {
		var myList = {
			method:'GET'
		};
		fetch("http://old.hejianzhiyang.com/Api/getDataByid?sheet=designer&id=" + this.props.match.params.id ,myList).then(response => response.json()).then(json => this.setState({listText:json}));
		// console.log(this.props.match.url);
		// console.log(this.props.match.params);
		// console.log(this.props.match.params.id);
		// console.log(this.props.match);
		fetch('http://old.hejianzhiyang.com/Api/getDataByType?sheet=case&cityID=' + this.state.cityID + '&page=1&limit=100&designerID=' + this.props.match.params.id,myList).then(response => response.json()).then(json => this.setState({itemImg:json}));
	};

	createMarkup() {
		return { __html:this.state.listText.content };
	};

	render() {
		const {listText} = this.state;
		const {itemImg} = this.state;
		const itemList = itemImg.length
			? itemImg.map((imgItem, index) => (
				<Col span={12} key={imgItem.id}>
					<Link to={`/casehome/${imgItem.id}`}>
						<Card
							hoverable
							cover={<img alt={imgItem.title} src={"http://old.hejianzhiyang.com/Upload/"+imgItem.imgName_438_348_m} />}
						>
							<h5>{imgItem.buildName+" | "+imgItem.styleName}</h5>
						</Card>
					</Link>
				</Col>
			))
			: <Spin className="demo-loading" />;
		return (
			<div>
				<SecondHeaderPart title={listText.name}/>
				<div style={{paddingLeft:'10px',paddingRight:'10px',paddingTop:'70px'}}>
					<img src={"http://old.hejianzhiyang.com/Upload/" + listText.imgName_500_500} alt={listText.name}/>
					<h2 style={{textAlign:'center',marginBottom:'5px',marginTop:'5px'}}>{listText.name}</h2>
					<h3 style={{textAlign:'center'}}>{listText.deptName} 从业{listText.years}年</h3>
					<h3>擅长风格:</h3>
					<p>{listText.styleLike}</p>
					<h3>代表作品:</h3>
					<p>{listText.zuopin}</p>
					<h3>教育背景:</h3>
					<div className="articleContainer" dangerouslySetInnerHTML={{ __html:this.state.listText.edu }}></div>
					<h3>从业经历:</h3>
					<div className="articleContainer" dangerouslySetInnerHTML={{ __html:this.state.listText.hangye }}></div>
					<h3>荣誉奖项:</h3>
					<div className="articleContainer" dangerouslySetInnerHTML={{ __html:this.state.listText.honour }}></div>
					<h3>设计理念:</h3>
					<div className="articleContainer" dangerouslySetInnerHTML={{ __html:this.state.listText.idea }}></div>
					<h3>相关案例:</h3>
				</div>
				<div className="FourAddTwoBtn Interfix">
					<Row gutter={10}>
						{itemList}
					</Row>
				</div>

			</div>
		);
	};
}

export default DegContent;
