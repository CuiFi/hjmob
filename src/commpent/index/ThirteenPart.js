import React, { Component } from 'react';
import {Row, Col,Card,Avatar } from 'antd';
import telIcon from '../../img/tel_icon.png';
import workWatch from '../../img/work_watch_icon.png';
import server from '../../img/service.png';
import goBack from '../../img/go_back_talk.png';

class ColInCard extends Component{
	render(){
		return(
			<Col span={this.props.line}>
				<Card style={{ width: '100%' }}>
					<Avatar style={{ backgroundColor: '#fff' }} shape="square" src={this.props.img} />
					<h2 style={{fontSize:'1em'}}>{this.props.text}</h2>
				</Card>
			</Col>
		);
	}
}

class ThirteenPart extends Component {
	render() {
		return (
			<div className="FourAddTwoBtn TenPart ThirteenPart">
				<Row style={{marginBottom:'10px',textAlign:'center'}}>
					<ColInCard line={6} img={telIcon} text="电话预约"/>
					<ColInCard line={6} img={workWatch} text="上门勘察"/>
					<ColInCard line={6} img={server} text="维修保养"/>
					<ColInCard line={6} img={goBack} text="回访"/>
				</Row>
			</div>
		);
	}
}

export default ThirteenPart;
