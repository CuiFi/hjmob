import React, { Component } from 'react';
import SecondHeaderPart from '../index/SecondHeaderPart';
import {Link} from 'react-router-dom';
import { List, Icon} from 'antd';
import { Row, Col,Card} from 'antd';
import { message, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { Select} from 'antd';
const Option = Select.Option;


//buildID=2从父级获取props

function handleChange(value) {
	console.log(`Selected: ${value}`);
}

class HotList extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			area: [],
			housetype: [],
			housestyle: [],
			loading: false,
			hasMore: true,
		};
	}
	getData = (callback) => {
		var myList = {
			method:'GET'
		};

		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=huxing&page=1&buildID=' + this.props.match.params.id ,myList).then(response => response.json()).then(res => callback(res));
	}
	componentWillMount() {
		// 获取下拉选项风格数据
		var getoption = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/selectDictionary?datatypeID=15',getoption).then(response => response.json()).then(json => this.setState({housestyle:json}));

		// 获取下拉选项户型数据
		fetch('http://www.hejianzhiyang.com/Api/selectDictionary?datatypeID=16',getoption).then(response => response.json()).then(json => this.setState({housetype:json}));

		// 获取下拉选项面积数据
		fetch('http://www.hejianzhiyang.com/Api/selectDictionary?datatypeID=172',getoption).then(response => response.json()).then(json => this.setState({area:json}));


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
		const {housestyle} = this.state;
		const {housetype} = this.state;
		const {area} = this.state;
		const housestyleListData = housestyle.map((housestyleItem, index) => (
			<Option key={housestyleItem.id}>{housestyleItem.dataName}</Option>
		));
		const housetypeListData = housetype.map((housetypeItem, index) => (
			<Option key={housetypeItem.id}>{housetypeItem.dataName}</Option>
		));
		const areaListData = area.map((areaItem, index) => (
			<Option key={areaItem.id}>{areaItem.dataName}</Option>
		));
		return (
			<div>
				<SecondHeaderPart title="热装小区"/>
				<div className="DropdownBtn">
					<Row>
						<Col span={8}>
							<Select
								defaultValue="风格"
								onChange={handleChange}
								style={{ width: '100%' }}
							>
								{housestyleListData}
							</Select>
						</Col>
						<Col span={8}>
							<Select
								defaultValue="户型"
								onChange={handleChange}
								style={{ width: '100%' }}
							>
								{housetypeListData}
							</Select>
						</Col>
						<Col span={8}>
							<Select
								defaultValue="面积"
								onChange={handleChange}
								style={{ width: '100%' }}
							>
								{areaListData}
							</Select>
						</Col>
					</Row>
				</div>
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
									{console.log(this.props.match.url)}
									<Link to={`${this.props.match.url}${item.id}`}>
										<Card
											hoverable
											style={{ width: '100%' }}
											cover={<img alt="example" src={"http://www.hejianzhiyang.com/Upload/"+item.imgName_380_209} />}
										>
											<Row align="middle" type="flex">
												<Col span={20}>
													<h3>{item.name}</h3>
													<p>{item.desc.slice(3,18)+'...'}</p>
												</Col>
												<Col span={4}>
													<Icon type="eye-o" /> {item.zixunInt}
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
