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

const fakeDataUrl = 'http://www.hejianzhiyang.com/Api/getDataByType?sheet=case&limit=';
var page = 5;

function handleChange(value) {
	console.log(`Selected: ${value}`);
}

class NormalLoginForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			area: [],
			visible: false,
			housetype: [],
			housestyle: [],
			loading: false,
			hasMore: true,
		};
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
			var otherData = {'cityID':8,'url':'/','orderTypeID':86};
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

	getData = (callback) => {
		var myList = {
			method:'GET'
		};

		fetch(fakeDataUrl+page ,myList).then(response => response.json()).then(res => callback(res));
		page++;
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
		const { getFieldDecorator } = this.props.form;
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
				<SecondHeaderPart title="装修案例"/>
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
				<div className="HotList" style={{height:'570px'}}>
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
									<Link to={`/casehome/${item.id}`}>
										<Card
											hoverable
											style={{ width: '100%' }}
											cover={<img alt="example" src={"http://www.hejianzhiyang.com/Upload/"+item.imgName_380_209} />}
										>
											<Row align="middle" type="flex">
												<Col span={4}>
													<Avatar style={{verticalAlign:'middle'}} size="large" icon="user" src={"http://www.hejianzhiyang.com/Upload/"+item.designer_img_50_50}/>
												</Col>
												<Col span={15}>
													<h3>{item.title.slice(0,11)+'...'}</h3>
													<p>{item.designerName + ' | ' + item.styleName + ' | ' + item.area + 'M²'}</p>
												</Col>
												<Col span={5} style={{textAlign:'center'}}>
													<Icon type="eye-o" /> {item.viewNum}
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
								<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="楼盘名称" />
							)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	};
}
const CaseList = Form.create()(NormalLoginForm);

export default CaseList;
