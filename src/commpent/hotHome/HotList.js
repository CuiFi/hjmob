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

var page = 1;

class HotList extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: '',
			area: [],
			housetype: [],
			housestyle: [],
			loading: false,
			hasMore: true,
			styleMark:'',
			houseTypeMark:'',
			areaMark:'',
			loadPage:1
		};
	}
	getData = (callback) => {
		var myList = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=huxing&page=' + this.state.loadPage + '&limit=5&styleID='+this.state.styleMark + '&huxingID=' + this.state.houseTypeMark + '&areaID=' + this.state.areaMark +'&buildID=' + this.props.match.params.id ,myList).then(response => response.json()).then(res => callback(res));
	}
	componentWillMount() {
		console.log(this.props.match.params.id);
		page = 1;
		// 获取下拉选项风格数据
		var getoption = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/selectDictionary?datatypeID=15',getoption).then(response => response.json()).then(json => this.setState({housestyle:json}));

		// 获取下拉选项户型数据
		fetch('http://www.hejianzhiyang.com/Api/selectDictionary?datatypeID=16',getoption).then(response => response.json()).then(json => this.setState({housetype:json}));

		// 获取下拉选项面积数据
		fetch('http://www.hejianzhiyang.com/Api/selectDictionary?datatypeID=172',getoption).then(response => response.json()).then(json => this.setState({area:json}));


		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=huxing&page=1',getoption).then(response => response.json()).then(json => this.setState({area:json}));



		this.getData((res) => {
			this.setState({
				data: res,
			});
		});
		console.log(this.props.match.url);
	}

	// 风格选择数据
	getStyleData = (styleId) => {
		var getoption = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=huxing&page=1&buildID='+ this.props.match.params.id +'&limit=5&styleID='+styleId + '&huxingID=' + this.state.houseTypeMark + '&areaID=' + this.state.areaMark,getoption).then(
			response => response.json()
		).then(json => this.setState({
			data:json,
			styleMark:styleId,
			hasMore: true
		}));
	}
	// 户型选择数据
	getHouseData = (huxingId) => {
		var getoption = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=huxing&page=1&buildID='+ this.props.match.params.id +'&limit=5&styleID='+this.state.styleMark + '&huxingID=' + huxingId + '&areaID=' + this.state.areaMark,getoption).then(
			response => response.json()
		).then(json => this.setState({
			data:json,
			houseTypeMark:huxingId,
			hasMore:true
		}));
	}
	// 面积选择数据
	getAreaData = (areaId) => {
		var getoption = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=huxing&page=1&buildID='+ this.props.match.params.id +'&limit=5&styleID='+this.state.styleMark + '&huxingID=' + this.state.houseTypeMark + '&areaID=' + areaId,getoption).then(
			response => response.json()
		).then(json => this.setState({
			data:json,
			areaMark:areaId,
			hasMore:true
		}));
	}
	styleHandleChange = (value) => {
		// console.log(`风格: ${value}`);
		this.getStyleData(value);
		page=1;
		// console.log(this.state.styleMark);
		// console.log(this.state.houseTypeMark);
		// console.log(this.state.areaMark);
	}
	houseTypeHandleChange = (value) => {
		// console.log(`户型: ${value}`);
		this.getHouseData(value);
		page=1;
		// console.log(this.state.styleMark);
		// console.log(this.state.houseTypeMark);
		// console.log(this.state.areaMark);
	}
	areaHandleChange = (value) => {
		// console.log(`面积: ${value}`);
		this.getAreaData(value);
		page=1;
		// console.log(this.state.styleMark);
		// console.log(this.state.houseTypeMark);
		// console.log(this.state.areaMark);
	}

	handleInfiniteOnLoad = () => {
		console.log(this.state.loadPage);
		let data = this.state.data;
		this.setState({
			loading: true,
			loadPage: ++page
		});
		this.getData((res) => {
			if (!res.length) {
				message.warning('数据已全部加载完毕');
				this.setState({
					hasMore: false,
					loading: false,
					loadPage:1
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
				<SecondHeaderPart title="楼盘列表"/>
				<div className="DropdownBtn">
					<Row>
						<Col span={8}>
							<Select
								defaultValue="风格"
								onChange={this.styleHandleChange}
								style={{ width: '100%' }}
							>
								<Option value=''>全部</Option>
								{housestyleListData}
							</Select>
						</Col>
						<Col span={8}>
							<Select
								defaultValue="户型"
								onChange={this.houseTypeHandleChange}
								style={{ width: '100%' }}
							>
								<Option value=''>全部</Option>
								{housetypeListData}
							</Select>
						</Col>
						<Col span={8}>
							<Select
								defaultValue="面积"
								onChange={this.areaHandleChange}
								style={{ width: '100%' }}
							>
								<Option value=''>全部</Option>
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
													<h3>{item.buildName}</h3>
													{/*<p>{item.desc.slice(3,18)+'...'}</p>*/}
													<p>{item.styleName +' | '+ item.huxingName + ' | ' + item.area + 'M²'}</p>
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
