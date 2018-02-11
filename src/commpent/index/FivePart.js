import React, { Component } from 'react';
import {Row, Col,Carousel} from 'antd';
import {Link} from 'react-router-dom';
import {Modal} from 'antd';
import { Form, Icon, Input, Button,notification} from 'antd';
const FormItem = Form.Item;
const openNotificationWithIcon = (type) => {
	notification[type]({
		message: '恭喜您报名成功!',
		description: '稍后我们会有销售人员联系您!谢谢您对合建的支持!',
	});
};

class NormalLoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {banner:'',visible: false};
	}

	componentWillMount() {
		var myslider = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=slider&limit=3',myslider).then(response => response.json()).then(json => this.setState({banner:json}));
	};

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
			var otherData = {'cityID':7,'url':'/','orderTypeID':86};
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


	render() {
		const { getFieldDecorator } = this.props.form;
		const {banner} = this.state;
		const bannerList = banner.length
			? banner.map((bannerItem, index) => (
				<div key={bannerItem.id}>
					<img src={"http://www.hejianzhiyang.com/Upload/"+bannerItem.imgName_884_359} alt={bannerItem.title} />
				</div>
			))
			: '没有加载到任何数据';
		return (
			<div className="FourAddTwoBtn">
				<Row>
					<Col>
						<h3 style={{textAlign:'center'}}>精英设计团队</h3>
					</Col>
				</Row>
				<Row style={{marginBottom:'10px'}} gutter={10}>
					<Col span={24}>
						<Carousel autoplay>
							<div>{bannerList[0]}</div>
							<div>{bannerList[1]}</div>
							<div>{bannerList[2]}</div>
						</Carousel>
					</Col>
				</Row>
				<Row gutter={10}>
					<Col span={12}>
						<Link to={`/designer/`}>
							<Button style={{width:'100%'}}>查看更多设计师>>></Button>
						</Link>
					</Col>
					<Col span={12}>
						<Button style={{width:'100%'}} onClick={this.showModal}>立即预约设计师>>></Button>
					</Col>
				</Row>
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
	}
}

const FivePart = Form.create()(NormalLoginForm);

export default FivePart;
