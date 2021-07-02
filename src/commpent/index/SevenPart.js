import React, { Component } from 'react';
import {Row, Col} from 'antd';
import {Modal} from 'antd';
import { Form, Icon, Input, Button,notification} from 'antd';
import artOne from '../../img/work_art_01.png';
import artTwo from '../../img/work_art_02.png';
import artThree from '../../img/work_art_03.png';
const FormItem = Form.Item;
const openNotificationWithIcon = (type) => {
	notification[type]({
		message: '恭喜您报名成功!',
		description: '稍后我们会有销售人员联系您!谢谢您对合建的支持!',
	});
};


class NormalLoginForm extends Component {
	// 初始化,设置模态框显示状态
	constructor(){
		super();
		this.state = { visible: false,cityID:localStorage.cityID}
	}

	// 设置模态框状态,让其显示
	showModal = () => {
		this.setState({
			visible: true,
		});
	}
	// 设置模态框状态,让其隐藏

	hideModal = () => {
		this.setState({
			visible: false,
		});
	}
	// 提交表单验证
	handleSubmit = (e) => {
		// 阻止默认事件
		e.preventDefault();
		// 表单验证提交
		this.props.form.validateFields((err, values) => {
			// 传输其他必要数据
			var otherData = {'cityID':this.state.cityID,'url':'/','orderTypeID':195};
			var obj = Object.assign(otherData,values);
			if (!err) {
				fetch('http://old.hejianzhiyang.com/Api/doOrder', {
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

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="FourAddTwoBtn">
				<Row>
					<Col>
						<h3>工艺展示</h3>
					</Col>
				</Row>
				<Row style={{marginBottom:'10px'}} gutter={10}>
					<Col span={8}>
						<img src={artOne} alt=""/>
					</Col>
					<Col span={8}>
						<img src={artTwo} alt=""/>
					</Col>
					<Col span={8}>
						<img src={artThree} alt=""/>
					</Col>
				</Row>
				<Row gutter={10}>
					<Col span={24}>
						<Button type="primary" style={{width:'100%'}} onClick={this.showModal}>点击免费申请装修报价</Button>
					</Col>
				</Row>
				<Row>
					<h4 style={{textAlign:"center"}}>科学施工  独创专利工艺</h4>
					<p>合建志洋装饰以精工工程服务享誉业界，并通过12年的实际经验合潜心研究，整合出在施工领域最新进的服务体系，引领装饰行业，帮助消费者实现家居梦想，成就至尚生活 。</p>
				</Row>
				{/*<Row gutter={10}>*/}
					{/*<Col span={24}>*/}
						{/*<Button style={{width:'100%'}}>查看详情>>></Button>*/}
					{/*</Col>*/}
				{/*</Row>*/}
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
	}
}

const SevenPart = Form.create()(NormalLoginForm);

export default SevenPart;
