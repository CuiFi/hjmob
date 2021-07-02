import React, { Component } from 'react';
import SecondHeaderPart from '../index/SecondHeaderPart';
import {Link} from 'react-router-dom';
import { List} from 'antd';
import { Row, Col} from 'antd';
import { message, Spin} from 'antd';
import { Radio } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

var page = 1;

class DetailsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			radiodata: [],
			loading: false,
			hasMore: true,
			quId: '',
			loadPage:1
		};
	}
	componentWillMount() {
		//获取种类选项
		var myList = {
			method:'GET'
		};
		fetch('http://old.hejianzhiyang.com/Api/selectDictionary?datatypeID=49',myList).then(response => response.json()).then(json => this.setState({radiodata:json}));

		// 获取第一页
		// console.log(this.props.location.query);
		var parentId = this.props.location.query.id;
		if (parentId){
			this.getParentData((res) => {
				this.setState({
					data: res,
				});
			},parentId);
		}else {
			this.getData((res) => {
				this.setState({
					data: res,
				});
			});
		}

		// console.log(this.props.match.url);
	}

	// 筛选方法
	getQuData = (quid) => {
		var myList = {
			method:'GET'
		};
		fetch('http://old.hejianzhiyang.com/Api/getDataByType?sheet=daquan&limit=5&typeID=' + quid +'&page='+ this.state.loadPage ,myList).then(response => response.json()).then(json => this.setState({data:json}));
		console.log(`当前请求页数:${this.state.loadPage}`);
	}

	// 区域选择时执行的方法
	onChange = (e) => {
		this.setState({
			quId:e.target.value,
			loadPage:1
		},()=>{
			this.getQuData(e.target.value);
			// console.log(e.target.value);
		});
	}

	// 获取第一页和滚动加载数据时所用的方法,对获取到的数据进行回调函数处理
	getParentData = (callback,parentPropsId) => {
		var myList = {
			method:'GET'
		};

		fetch('http://old.hejianzhiyang.com/Api/getDataByType?sheet=daquan&limit=5&typeID=' + parentPropsId + '&page=' + this.state.loadPage ,myList).then(response => response.json()).then(res => callback(res));
		console.log(`当前请求页数:${this.state.loadPage}`);
	}

	// 获取第一页和滚动加载数据时所用的方法,对获取到的数据进行回调函数处理
	getData = (callback) => {
		var myList = {
			method:'GET'
		};

		fetch('http://old.hejianzhiyang.com/Api/getDataByType?sheet=daquan&limit=5&typeID=' + this.state.quId + '&page=' + this.state.loadPage ,myList).then(response => response.json()).then(res => callback(res));
		console.log(`当前请求页数:${this.state.loadPage}`);
	}

	handleInfiniteOnLoad = () => {
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
		const {radiodata} = this.state;
		const radiodataList = radiodata.map((radiodataItem, index) => (
			<Col span={4} key={radiodataItem.id}>
				<RadioButton value={radiodataItem.id} style={{width:'90%',textAlign:'center',marginBottom:'5px'}}>{radiodataItem.dataName}</RadioButton>
			</Col>
		));
		return (
			<div className="HotListParent DetailsList">
				<SecondHeaderPart title="装修指南"/>
				<div className="HotList">
					<RadioGroup style={{paddingTop:'64px'}} onChange={this.onChange} defaultValue="a" size="small">
						<Row>
							{radiodataList.slice(2)}
						</Row>
						{/*{console.log(this.props.location.query)}*/}
						{/*{console.log(this.props.location.query.id)}*/}
					</RadioGroup>
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
									<Link to={`/details/${item.id}`}>
										<Row gutter={10}>
											<Col span={9}>
												<img src={"http://old.hejianzhiyang.com/Upload/"+item.imgName_239_174} alt="img"/>
											</Col>
											<Col span={15}>
												<h4>{item.title.length > 12 ? item.title.slice(0,12)+'...' : item.title}</h4>
												<p>{item.desc.slice(0,36)+'...'}</p>
											</Col>
										</Row>
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

export default DetailsList;
