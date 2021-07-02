import React, { Component } from 'react';
import SecondHeaderPart from '../index/SecondHeaderPart';
import { List, Icon} from 'antd';
import { Row, Col,Card} from 'antd';
import { message, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

var page = 1;


class ThreeList extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			loading: false,
			hasMore: true,
			loadPage:1,
			cityID:localStorage.cityID
		};
	}

	componentWillMount() {
		this.getData((res) => {
			this.setState({
				data: res,
			});
		});
		console.log(this.props.match.url);
	}

	getData = (callback) => {
		var myList = {
			method:'GET'
		};
		fetch('http://old.hejianzhiyang.com/Api/getDataByType?sheet=quanjing&limit=5&page='+ this.state.loadPage + '&cityID=' + this.state.cityID ,myList).then(response => response.json()).then(res => callback(res));
	}

	handleInfiniteOnLoad = () => {
		let data = this.state.data;
		this.setState({
			loading: true,
			loadPage:++page
		});
		this.getData((res) => {
			if (!res.length) {
				message.warning('数据已全部加载完毕');
				this.setState({
					hasMore: false,
					loading: false,
				});
				return;
			}
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
				<SecondHeaderPart title="3D全景"/>
				<div className="HotList" style={{paddingTop:'70px'}}>
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
									{console.log(this.props.match.url)}
									<a href={item.link}>
										<Card
											hoverable
											style={{ width: '100%' }}
											cover={<img alt="example" src={"http://old.hejianzhiyang.com/Upload/"+item.imgName_380_209} />}
										>
											<Row align="middle" type="flex">
												<Col span={20}>
													<h3>{item.title}</h3>
													<p>{item.buildName.slice(0,18)+'...'}</p>
												</Col>
												<Col span={4}>
													<Icon type="eye-o" /> {item.viewNum}
												</Col>
											</Row>
										</Card>
									</a>
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

export default ThreeList;
