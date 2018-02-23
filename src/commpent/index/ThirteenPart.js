import React, { Component } from 'react';
import {Row, Col,Card,Avatar } from 'antd';
import telIcon from '../../img/tel_icon.png';
import workWatch from '../../img/work_watch_icon.png';
import server from '../../img/service.png';
import goBack from '../../img/go_back_talk.png';

const BJtel = "tel:4009-010-958";
const WHtel = "tel:4008-602-728";
const NJtel = "tel:4006-178-900";

class ColInCard extends Component{
	render(){
		return(
			<a href={this.props.tel}>
				<Col span={this.props.line}>
					<Card style={{ width: '100%' }}>
						<Avatar style={{ backgroundColor: '#fff' }} shape="square" src={this.props.img} />
						<h2 style={{fontSize:'1em'}}>{this.props.text}</h2>
					</Card>
				</Col>
			</a>
		);
	}
}

class ThirteenPart extends Component {
	render() {
		let whichTel = '';
		switch (parseInt(localStorage.cityID)){
			case 7:
				whichTel = BJtel;
				break;
			case 8:
				whichTel = WHtel;
				break;
			case 9:
				whichTel = NJtel;
				break;
			default:
				whichTel = BJtel;
				break;
		}
		return (
			<div className="FourAddTwoBtn TenPart ThirteenPart">
				<Row style={{marginBottom:'10px',textAlign:'center'}}>
					<ColInCard tel={whichTel} line={6} img={telIcon} text="电话预约"/>
					<ColInCard tel={whichTel} line={6} img={workWatch} text="上门勘察"/>
					<ColInCard tel={whichTel} line={6} img={server} text="维修保养"/>
					<ColInCard tel={whichTel} line={6} img={goBack} text="回访"/>
				</Row>
			</div>
		);
	}
}

export default ThirteenPart;
