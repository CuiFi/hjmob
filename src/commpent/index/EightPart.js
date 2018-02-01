import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Row, Col,Card,Button, Icon} from 'antd';

class EightPart extends Component {
	constructor(){
		super();
		this.state = { hotdata:''}
	}

	componentWillMount() {
		var mylist = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=build&recommendIndex=1&limit=4',mylist).then(response => response.json()).then(json => this.setState({hotdata:json}));
	};

	render() {
		const {hotdata} = this.state;
		const HotList = hotdata.length
			? hotdata.map((imgItem, index) => (
				<Col span={12} key={imgItem.id}>
					<Link to={`/casehome/${imgItem.id}`}>
						<Card
							style={{ width: '100%' }}
							cover={<img alt={imgItem.name} src={"http://www.hejianzhiyang.com/Upload/"+imgItem.imgName_348_238} />}
						>
							<Row>
								<Col style={{textAlign:'left'}} span={18}>
									<p>{imgItem.name.length > 6 ? imgItem.name.slice(0,6)+'...' : imgItem.name}</p>
									{console.log(imgItem.name.length)}
								</Col>
								<Col style={{textAlign:'right'}} span={6}>
									<small>
										<Icon type="like" />
										{imgItem.zixunInt}
									</small>
								</Col>
							</Row>
						</Card>
					</Link>
				</Col>
			))
			: '没有加载到任何数据';
		return (
			<div className="FourAddTwoBtn EightPart">
				<Row>
					<Col>
						<h3>热装小区</h3>
					</Col>
				</Row>
				<Row gutter={10}>
					{HotList}
				</Row>
				<Row gutter={10}>
					<Col span={12}>
						<Link to={`/hothome/`}>
							<Button style={{width:'100%'}}>查看热装小区>>></Button>
						</Link>
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
