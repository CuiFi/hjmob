import React, { Component } from 'react';
import SecondHeaderPart from '../index/SecondHeaderPart';
import {Link} from 'react-router-dom';
import { List, Icon} from 'antd';
import { Row, Col,Card} from 'antd';
import { message, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'http://www.hejianzhiyang.com/Api/getDataByType?sheet=daquan&limit=';
var page = 5;


class HotList extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			loading: false,
			hasMore: true,
		};
	}
	getData = (callback) => {
		var myList = {
			method:'GET'
		};

		fetch(fakeDataUrl+page ,myList).then(response => response.json()).then(res => callback(res));
		page++;
	}
	componentWillMount() {
		this.getData((res) => {
			this.setState({
				data: res,
			});
		});
		console.log(this.props.match.url);
	}
	handleInfiniteOnLoad = () => {
		let data = this.state.data;
		this.setState({
			loading: true,
		});
		if (!data.length) {
			message.warning('数据已全部加载完毕');
			this.setState({
				hasMore: false,
				loading: false,
			});
			return;
		}
		this.getData((res) => {
			data = data.concat(res);
			this.setState({
				data,
				loading: false,
			});
		});
	}
	render() {
		return (
			<div>
				<SecondHeaderPart title="热装小区"/>
				<div className="HotList">
					<InfiniteScroll
						initialLoad={false}
						pageStart={0}
						loadMore={this.handleInfiniteOnLoad}
						hasMore={!this.state.loading && this.state.hasMore}
						useWindow={false}
					>
						<List
							itemLayout="vertical"
							dataSource={this.state.data}
							renderItem={item => (
								<List.Item key={item.id}>
									<Link to={`/hothome/hot/${item.id}`}>
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
									</Link>
								</List.Item>
							)}
						>
							{this.state.loading && this.state.hasMore && <Spin className="demo-loading" />}
						</List>
					</InfiniteScroll>
				</div>
			</div>
		);
	};
}

export default HotList;
