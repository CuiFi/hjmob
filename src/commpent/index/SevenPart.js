import React, { Component } from 'react';
import {Row, Col,Button} from 'antd';
import artOne from '../../img/work_art_01.png';
import artTwo from '../../img/work_art_02.png';
import artThree from '../../img/work_art_03.png';

class SevenPart extends Component {
	render() {
		return (
			<div className="FourAddTwoBtn">
				<Row>
					<Col>
						<h3>工艺展示</h3>
					</Col>
				</Row>
				<Row style={{marginBottom:'10px'}} gutter={10}>
					<Col span={8}>
						<img src={artOne} alt=""/>
					</Col>
					<Col span={8}>
						<img src={artTwo} alt=""/>
					</Col>
					<Col span={8}>
						<img src={artThree} alt=""/>
					</Col>
				</Row>
				<Row gutter={10}>
					<Col span={24}>
						<Button type="primary" style={{width:'100%'}}>点击免费申请装修报价</Button>
					</Col>
				</Row>
				<Row>
					<h4 style={{textAlign:"center"}}>科学施工  独创专利工艺</h4>
					<p>合建志洋装饰以精工工程服务享誉业界，并通过15年的实际经验合潜心研究，整合出在施工领域最新进的服务体系，引领装饰行业，帮助消费者实现家居梦想，成就至尚生活 。</p>
				</Row>
				<Row gutter={10}>
					<Col span={24}>
						<Button style={{width:'100%'}}>查看详情>>></Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default SevenPart;
