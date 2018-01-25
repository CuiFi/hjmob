import React, { Component } from 'react';
import { List, Icon} from 'antd';
import { Row, Col,Card} from 'antd';


class ListBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {HotList:''};
	}

	componentWillMount() {
		var myList = {
			method:'GET'
		};
		fetch("http://www.hejianzhiyang.com/Api/getDataByType?type=daquan&limit=" ,myList).then(response => response.json()).then(json => this.setState({HotList:json}));
	};

	render() {
		const {HotList} = this.state;
		return (
			<div>
				<div className="HotList">
					<List
						itemLayout="vertical"
						dataSource={HotList}
						renderItem={item => (
							<List.Item>
								<Card
									hoverable
									style={{ width: '100%' }}
									cover={<img alt="example" src={"http://www.hejianzhiyang.com/Upload/"+item.imgName_239_174} />}
								>
									<Row align="middle" type="flex">
										<Col span={20}>
											<h3>{item.labelsName}</h3>
											<p>{item.desc.slice(0,18)+'...'}</p>
										</Col>
										<Col span={4}>
											<Icon type="eye-o" /> {item.viewNum}
										</Col>
									</Row>
								</Card>
							</List.Item>
						)}
					/>
				</div>
			</div>
		);
	};
}

export default ListBlock;
