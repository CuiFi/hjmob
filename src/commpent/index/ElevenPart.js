import React, { Component } from 'react';
import {Row, Col,Card,Button} from 'antd';
import anli_index from '../../img/anli_index.png';

class ElevenPart extends Component {
	render() {
		return (
			<div className="FourAddTwoBtn">
				<Row>
					<Col>
						<h3>优惠活动</h3>
					</Col>
				</Row>
				<Row gutter={10}>
					<Col span={12}>
						<Card
							hoverable
							cover={<img alt="example" src={anli_index} />}
						>
						</Card>
					</Col>
					<Col span={12}>
						<Card
							hoverable
							cover={<img alt="example" src={anli_index} />}
						>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Button style={{width:'100%'}}>查看更多活动>>></Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ElevenPart;
