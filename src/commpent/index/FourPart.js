import React, { Component } from 'react';
import {Row, Col,Card,Button} from 'antd';
import anli_index from '../../img/anli_index.png';

class FourPart extends Component {
	render() {
		return (
			<div className="FourAddTwoBtn">
				<Row>
					<Col>
						<h3>装修案例</h3>
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
				<Row gutter={10}>
					<Col span={12}>
						<Button style={{width:'100%'}}>更多风格装修案例>>></Button>
					</Col>
					<Col span={12}>
						<Button style={{width:'100%'}}>申请户型规划>>></Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default FourPart;
