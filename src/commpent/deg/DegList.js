import React, { Component } from 'react';
import SecondHeaderPart from '../index/SecondHeaderPart';
import {Link} from 'react-router-dom';
import { List, Icon} from 'antd';
import { Row, Col,Card} from 'antd';
import { message, Spin,Avatar,Button,Modal,notification} from 'antd';
import { Form, Input} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const openNotificationWithIcon = (type) => {
	notification[type]({
		message: '恭喜您报名成功!',
		description: '稍后我们会有销售人员联系您!谢谢您对合建的支持!',
	});
};

var page = 1;

class NormalLoginForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			visible: false,
			goodstyle: [],
			level: [],
			department: [],
			loading: false,
			hasMore: true,
			deptMark:'',
			levelMark:'',
			goodstyleMark:'',
			loadPage:1,
			cityID:localStorage.cityID
		};
	}

	componentWillMount() {
		// 获取下拉选项风格数据
		page=1;
		var getoption = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=dept&cityID='+ this.state.cityID,getoption).then(response => response.json()).then(json => this.setState({department:json}));

		// 获取下拉选项户型数据
		fetch('http://www.hejianzhiyang.com/Api/selectDictionary?datatypeID=10',getoption).then(response => response.json()).then(json => this.setState({level:json}));

		// 获取下拉选项面积数据
		fetch('http://www.hejianzhiyang.com/Api/selectDictionary?datatypeID=15',getoption).then(response => response.json()).then(json => this.setState({goodstyle:json}));


		this.getData((res) => {
			this.setState({
				data: res,
			});
		});
		console.log(this.props.match.url);
	}

	// 设置模态框状态,让其显示
	showModal = (e) => {
		e.preventDefault();
		this.setState({
			visible: true
		});
	}
	// 设置模态框状态,让其隐藏
	hideModal = (e) => {
		e.preventDefault();
		this.setState({
			visible: false
		});
	}
	// 提交表单验证
	handleSubmit = (e) => {
		// 阻止默认事件
		e.preventDefault();
		// 表单验证提交
		this.props.form.validateFields((err, values) => {
			// 传输其他必要数据
			var otherData = {'cityID':this.state.cityID,'url':this.props.match.url,'orderTypeID':101};
			var obj = Object.assign(otherData,values);
			if (!err) {
				fetch('http://www.hejianzhiyang.com/Api/doOrder', {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: JSON.stringify(obj)
				}).then((resp) => {
					if (resp.ok){
						/**
						 * 报名成功之后要做的事情
						 * 1.清空表单
						 * 2.模态框隐藏
						 * 3.显示报名成功信息
						 */
						this.props.form.resetFields();
						this.setState({
							visible: false,
						});
						openNotificationWithIcon('success');
					}
				}).catch((error) =>{
					// 报名失败显示信息
					console.log('request failed', error)
				});
			}
		});
	}

	// 所属部门选择数据
	getDeptData = (deptId) => {
		var getoption = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=designer&page=1&limit=10&deptID='+deptId + '&levelID=' + this.state.levelMark + '&styleID=' + this.state.goodstyleMark + '&cityID=' + this.state.cityID,getoption).then(
			response => response.json()
		).then(json => this.setState({
			data:json,
			deptMark:deptId,
			hasMore:true
		}));
	}
	// 设计师级别选择数据
	getLevelData = (levelId) => {
		var getoption = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=designer&page=1&limit=10&deptID='+this.state.deptMark + '&levelID=' + levelId + '&styleID=' + this.state.goodstyleMark + '&cityID=' + this.state.cityID,getoption).then(
			response => response.json()
		).then(json => this.setState({
			data:json,
			levelMark:levelId,
			hasMore:true
		}));
	}
	// 擅长风格选择数据
	getGoodStyleData = (goodstyleId) => {
		var getoption = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=designer&page=1&limit=10&deptID='+this.state.deptMark + '&levelID=' + this.state.levelMark + '&styleID=' + goodstyleId + '&cityID=' + this.state.cityID,getoption).then(
			response => response.json()
		).then(json => this.setState({
			data:json,
			goodstyleMark:goodstyleId,
			hasMore:true
		}));
	}
	deptHandleChange = (value) => {
		console.log(`风格: ${value}`);
		this.getDeptData(value);
		page=1;
		console.log(this.state.styleMark);
		console.log(this.state.houseTypeMark);
		console.log(this.state.areaMark);
	}
	levelTypeHandleChange = (value) => {
		console.log(`户型: ${value}`);
		this.getLevelData(value);
		page=1;
		console.log(this.state.styleMark);
		console.log(this.state.houseTypeMark);
		console.log(this.state.areaMark);
	}
	styleHandleChange = (value) => {
		console.log(`面积: ${value}`);
		this.getGoodStyleData(value);
		page=1;
		console.log(this.state.styleMark);
		console.log(this.state.houseTypeMark);
		console.log(this.state.areaMark);
	}

	// 滚动数据
	getData = (callback) => {
		var myList = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=designer&page='+ this.state.loadPage +'&limit=10&deptID='+this.state.deptMark + '&levelID=' + this.state.levelMark + '&styleID=' + this.state.goodstyleMark + '&cityID=' + this.state.cityID ,myList).then(response => response.json()).then(res => callback(res));
		console.log(`当前请求页数:${this.state.loadPage}`);
	}
	handleInfiniteOnLoad = () => {
		let data = this.state.data;
		this.setState({
			loading: true,
			loadPage: ++page
		});
		this.getData((res) => {
			console.log(`返回的数据:${res.length}`);
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
			console.log(`第几页:${page}`);
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const {department} = this.state;
		const {level} = this.state;
		const {goodstyle} = this.state;
		const departmentListData = department.map((departmentItem, index) => (
			<Option key={departmentItem.id}>{departmentItem.name}</Option>
		));
		const levelListData = level.map((levelItem, index) => (
			<Option key={levelItem.id}>{levelItem.dataName}</Option>
		));
		const goodstyleListData = goodstyle.map((goodstyleItem, index) => (
			<Option key={goodstyleItem.id}>{goodstyleItem.dataName}</Option>
		));
		return (
			<div>
				<SecondHeaderPart title="设计师"/>
				<div className="DropdownBtn">
					<Row>
						<Col span={8}>
							<Select
								defaultValue="所属部门"
								onChange={this.deptHandleChange}
								style={{ width: '100%' }}
							>
								<Option value=''>全部</Option>
								{departmentListData}
							</Select>
						</Col>
						<Col span={8}>
							<Select
								defaultValue="设计师级别"
								onChange={this.levelTypeHandleChange}
								style={{ width: '100%' }}
							>
								<Option value=''>全部</Option>
								{levelListData}
							</Select>
						</Col>
						<Col span={8}>
							<Select
								defaultValue="擅长风格"
								onChange={this.styleHandleChange}
								style={{ width: '100%' }}
							>
								<Option value=''>全部</Option>
								{goodstyleListData}
							</Select>
						</Col>
					</Row>
				</div>
				<div className="HotList DegList" style={{height:'570px'}}>
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
									{/*{console.log(this.props.match.url)}*/}
									<Link to={`/deg/${item.id}`}>
										<Card
											hoverable
											style={{ width: '100%' }}
										>
											<Row align="middle" type="flex">
												<Col span={4}>
													<Avatar shape="square" style={{verticalAlign:'middle'}} size="large" icon="user" src={"http://www.hejianzhiyang.com/Upload/"+item.imgName_50_50}/>
												</Col>
												<Col span={15}>
													<h3>{item.name}</h3>
													<p>{item.deptName+' | ' + item.levelName + ' | '+ item.years+'年'}</p>
												</Col>
												<Col span={5} style={{textAlign:'center'}}>
													<Icon type="user" /> {item.people}
													<Button onClick={this.showModal} type="primary" size='small'>预约TA</Button>
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
				{/*当前模态框组件*/}
				<Modal
					title="请输入您的报名信息"
					visible={this.state.visible}
					onOk={this.handleSubmit}
					onCancel={this.hideModal}
					okText="确认"
					cancelText="取消"
				>
					<Form className="submit-form">
						<FormItem>
							{getFieldDecorator('reName', {
								rules: [{ required: true, message: '请输入您的姓名!' }],
							})(
								<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="您的姓名" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('telPhone', {
								rules: [{ required: true, message: '请输入您的联系电话!' },{ min:8, message: '至少要输入8位座机' },{ max:11, message: '手机号已经超过11位,请检查' },{ pattern: /^[0-9]*$/, message: '手机号必须为数字' }],
							})(
								<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="您的电话" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('community')(
								<Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="楼盘名称" />
							)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	};
}
const DegList = Form.create()(NormalLoginForm);

export default DegList;
