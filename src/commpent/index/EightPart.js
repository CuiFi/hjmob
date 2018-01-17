import React, { Component } from 'react';
import {Row, Col,Card,Button, Icon} from 'antd';

class EightPart extends Component {
	render() {
		return (
			<div className="FourAddTwoBtn EightPart">
				<Row>
					<Col>
						<h3>热装小区</h3>
					</Col>
				</Row>
				<Row gutter={10}>
					<Col span={12}>
						<Card
							style={{ width: '100%' }}
							cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
						>
							<Row>
								<Col style={{textAlign:'left'}} span={14}>
									<p>领秀慧谷</p>
								</Col>
								<Col style={{textAlign:'right'}} span={10}>
									<small>
										<Icon type="like" />
										88
									</small>
								</Col>
							</Row>
						</Card>
					</Col>
					<Col span={12}>
						<Card
							style={{ width: '100%' }}
							cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
						>
							<Row>
								<Col style={{textAlign:'left'}} span={14}>
									<p>领秀慧谷</p>
								</Col>
								<Col style={{textAlign:'right'}} span={10}>
									<small>
										<Icon type="like" />
										88
									</small>
								</Col>
							</Row>
						</Card>
					</Col>
					<Col span={12}>
						<Card
							style={{ width: '100%' }}
							cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
						>
							<Row>
								<Col style={{textAlign:'left'}} span={14}>
									<p>领秀慧谷</p>
								</Col>
								<Col style={{textAlign:'right'}} span={10}>
									<small>
										<Icon type="like" />
										88
									</small>
								</Col>
							</Row>
						</Card>
					</Col>
					<Col span={12}>
						<Card
							style={{ width: '100%' }}
							cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
						>
							<Row>
								<Col style={{textAlign:'left'}} span={14}>
									<p>领秀慧谷</p>
								</Col>
								<Col style={{textAlign:'right'}} span={10}>
									<small>
										<Icon type="like" />
										88
									</small>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
				<Row gutter={10}>
					<Col span={12}>
						<Button style={{width:'100%'}}>查看更多热装小区>>></Button>
					</Col>
					<Col span={12}>
						<Button style={{width:'100%'}}>预约看工地>>></Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default EightPart;
