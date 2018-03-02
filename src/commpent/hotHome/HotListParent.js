import React, { Component } from 'react';
import SecondHeaderPart from '../index/SecondHeaderPart';
import {Link} from 'react-router-dom';
import { List, Icon} from 'antd';
import { Row, Col,Card} from 'antd';
import { message, Spin} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import RadioButton from "antd/es/radio/radioButton";
import RadioGroup from "antd/es/radio/group";

var page = 1;

class HotListParent extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			radiodata: [],
			loading: false,
			hasMore: true,
			quId:'',
			loadPage:1,
			cityID:localStorage.cityID
		};
	}
	componentWillMount() {
		page=1;
		//获取区域选项
		var myList = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=qu&page=1&limit=20&cityID=' + this.state.cityID,myList).then(response => response.json()).then(json => this.setState({radiodata:json}));

		// 获取第一页
		this.getData((res) => {
			this.setState({
				data: res,
			});
		});
		console.log(this.props.match.url);
	}

	// 获取区域筛选方法
	getQuData = (quid) => {
		var myList = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=build&limit=5&quID=' + quid +'&page='+ this.state.loadPage + '&cityID=' + this.state.cityID ,myList).then(response => response.json()).then(json => this.setState({data:json}));

	}

	//这是选择之后还可以继续判断下拉的重要步骤
	// 区域选择时执行的方法
	onChange = (e) => {
		console.log("选择当前的id:"+e.target.value);
		this.setState({
			quId:e.target.value,
			loadPage:1,
			hasMore:true
		},()=>{
			this.getQuData(this.state.quId);
			page = 1;
		});

	}

	// 滚动加载数据时所用的方法,对获取到的数据进行回调函数处理
	getData = (callback) => {
		var myList = {
			method:'GET'
		};

		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=build&cityID=' + this.state.cityID + '&limit=5&quID='+this.state.quId+'&page='+ this.state.loadPage ,myList).then(response => response.json()).then(res => callback(res));
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
			<Col span={6} key={radiodataItem.id}>
				<RadioButton value={radiodataItem.id} style={{width:'90%',textAlign:'center',marginBottom:'5px'}}>{radiodataItem.name}</RadioButton>
			</Col>
		));
		return (
			<div className="HotListParent">
				<SecondHeaderPart title="热装小区"/>
				<div className="HotList">
					<RadioGroup style={{paddingTop:'64px'}} onChange={this.onChange} defaultValue="a" size="small">
						<Row>
							<Col span={6} key=''>
								<RadioButton value='' style={{width:'90%',textAlign:'center',marginBottom:'5px'}}>全部</RadioButton>
							</Col>
							{radiodataList}
						</Row>
					</RadioGroup>
					<InfiniteScroll
						initialLoad={false}
						pageStart={0}
						loadMore={this.handleInfiniteOnLoad}
						hasMore={!this.state.loading && this.state.hasMore}
						useWindow={true}
					>
						<List
							itemLayout="vertical"
							dataSource={this.state.data}
							renderItem={item => (
								<List.Item key={item.id}>
									<Link to={{pathname:`/hothome/${item.id}/list/`}}>
										<Card
											hoverable
											style={{ width: '100%' }}
											cover={<img alt="example" src={"http://www.hejianzhiyang.com/Upload/"+item.imgName_348_238} />}
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

export default HotListParent;
