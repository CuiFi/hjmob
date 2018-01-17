import React, { Component } from 'react';
import { Form, Icon, Input, Button,notification} from 'antd';
const FormItem = Form.Item;
const openNotificationWithIcon = (type) => {
	notification[type]({
		message: '恭喜您报名成功!',
		description: '稍后我们会有销售人员联系您!谢谢您对合建的支持!',
	});
};

class NormalLoginForm extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				fetch('http://www.hejianzhiyang.com/Cc/doOrder', {
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				}).then((resp) => {
					console.log(resp);
					if (!resp.ok){
						console.log("报名成功");
						openNotificationWithIcon('success');
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
			<Form onSubmit={this.handleSubmit} className="submit-form">
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: '请输入您的姓名!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="您的姓名" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('userPhone', {
						rules: [{ required: true, message: '请输入您的联系电话!' },{ min:8, message: '至少要输入8位座机' },{ max:11, message: '手机号已经超过11位,请检查' },{ pattern: /^[0-9]*$/, message: '手机号必须为数字' }],
					})(
						<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="您的电话" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('userHouse')(
						<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="楼盘名称" />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" style={{width:'100%'}}>
						预约装修量房
					</Button>
				</FormItem>
			</Form>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;