import React, { Component } from 'react';
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import SecondHeaderPart from '../index/SecondHeaderPart';
import { message, Spin} from 'antd';
import { Radio } from 'antd';
import { List, Icon} from 'antd';
import { Row, Col,Card} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

var page = 1;

class VideoList extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			radiodata: [],
			loading: false,
			hasMore: true,
      VideoId: '',
			loadPage:1
		};
	}

	componentWillMount() {
		//获取种类选项
		var myList = {
			method:'GET'
		};
		fetch('http://old.hejianzhiyang.com/Api/video_type',myList).then(response => response.json()).then(json => this.setState({radiodata:json}));

		// 获取第一页
		// console.log(this.props.location.query);
		// var parentId = this.props.location.query.id;
		this.getData((res) => {
			this.setState({
				data: res,
			});
		});
		// console.log(this.props.match.url);
	}

	// 筛选方法
	getQuData = (VideoId) => {
		var myList = {
			method:'GET'
		};
		fetch('http://old.hejianzhiyang.com/Api/getDataByType?sheet=video&typeID=' + VideoId + '&page=' + this.state.loadPage ,myList).then(response => response.json()).then(json => this.setState({data:json,hasMore:true}));
		// console.log(`当前请求页数:${this.state.loadPage}`);
	}

	// 区域选择时执行的方法
	onChange = (e) => {
		this.setState({
			VideoId:e.target.value,
			loadPage:1
		},()=>{
			this.getQuData(e.target.value);
		});
		page = 1;
	}

	// 获取第一页和滚动加载数据时所用的方法,对获取到的数据进行回调函数处理
	getData = (callback) => {
		var myList = {
			method:'GET'
		};
		fetch('http://old.hejianzhiyang.com/Api/getDataByType?sheet=video&typeID=' + this.state.VideoId + '&page=' + this.state.loadPage ,myList).then(response => response.json()).then(res => callback(res));
		// console.log(`当前请求页数:${this.state.loadPage}`);
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
				loading: false
			});
		});
	}

	render() {
		const {radiodata} = this.state;
		const radiodataList = radiodata.map((radiodataItem, index) => (
			<Col span={8} key={radiodataItem.id}>
				<RadioButton value={radiodataItem.id} style={{width:'90%',textAlign:'center',marginBottom:'5px'}}>{radiodataItem.dataName}</RadioButton>
			</Col>
		));
		return (
			<div className="HotListParent DetailsList">
				<SecondHeaderPart title="视频展示"/>
				<div className="HotList">
					<RadioGroup style={{width:'100%',paddingTop:'64px'}} onChange={this.onChange} defaultValue="a" size="small">
						<Row>
							<Col span={8}>
                <RadioButton value='' style={{width:'90%',textAlign:'center',marginBottom:'5px'}}>全部</RadioButton>
							</Col>
							{radiodataList}
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
                  <Card
                    hoverable
                    style={{ width: '100%' }}
                  >
										{item.way === "video_self" ? <div><Player playsInline poster={"http://old.hejianzhiyang.com/Upload/"+item.imgName_380_209}>
                      <source src={"http://old.hejianzhiyang.com/Upload/"+item.video_self} />
                    </Player></div> : <a href={item.video_path}><img src={"http://old.hejianzhiyang.com/Upload/" + item.imgName_380_209} alt=""/></a>}

                    <Row align="middle" type="flex">
                      <Col span={16}>
                        <h3>{item.title.length > 13 ? item.title.slice(0,12)+'...' : item.title}</h3>
                        <p><Icon type="eye-o" /> {item.viewNum}</p>
                      </Col>
                      <Col span={8} style={{textAlign:'center'}}>
                        <p>{item.updTime.slice(0,10)}</p>
                      </Col>
                    </Row>
                  </Card>
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

export default VideoList;
