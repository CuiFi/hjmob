import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button,notification} from 'antd';
const FormItem = Form.Item;
const openNotificationWithIcon = (type) => {
	notification[type]({
		message: '恭喜您报名成功!',
		description: '稍后我们会有销售人员联系您!谢谢您对合建的支持!',
	});
};

class NormalLoginForm extends Component {

	constructor(props){
		super(props);
		this.state = {cityID:localStorage.cityID};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			// 传输其他必要数据
			var otherData = {'cityID':this.state.cityID,'url':'/','orderTypeID':195};
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
						openNotificationWithIcon('success');
						this.props.form.resetFields();
					}
				}).catch((error) =>{
					console.log('request failed', error)
				});
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className={"submit-form " + this.props.newClass}>
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
				<FormItem>
					<Button type="primary" htmlType="submit" style={{width:'100%'}}>
						{this.props.submit_button}
					</Button>
				</FormItem>
			</Form>
		);
	}
}

NormalLoginForm.defaultProps = {
	submit_button: '预约装修量房'
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);



export default WrappedNormalLoginForm;