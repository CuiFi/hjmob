import React, { Component } from 'react';
import {Row, Col,Card} from 'antd';
import anli_index from '../img/anli_index.png';
const { Meta } = Card;

class FourPart extends Component {
	render() {
		return (
			<div style={{paddingLeft:'10px',paddingRight:'10px'}}>
				<Row gutter={10}>
					<Col span={12}>
						<Card
							hoverable
							style={{ width: '100%' }}
							cover={<img alt="example" src={anli_index} />}
						>
						</Card>
					</Col>
					<Col span={12}>
						<Card
							hoverable
							style={{ width: '100%' }}
							cover={<img alt="example" src={anli_index} />}
						>
						</Card>
					</Col>
				</Row>
				<Row gutter={10}>
					<Col span={12}>
						<Card
							hoverable
							style={{ width: '100%' }}
							cover={<img alt="example" src={anli_index} />}
						>
						</Card>
					</Col>
					<Col span={12}>
						<Card
							hoverable
							style={{ width: '100%' }}
							cover={<img alt="example" src={anli_index} />}
						>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default FourPart;
