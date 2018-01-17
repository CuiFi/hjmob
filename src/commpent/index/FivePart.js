import React, { Component } from 'react';
import {Row, Col,Button,Carousel} from 'antd';

class FivePart extends Component {
	constructor(props) {
		super(props);
		this.state = {banner:''};
	}

	componentWillMount() {
		var myslider = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Common/json_slider',myslider).then(response => response.json()).then(json => this.setState({banner:json}));
	};


	render() {
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
						<Button style={{width:'100%'}}>查看更多设计师>>></Button>
					</Col>
					<Col span={12}>
						<Button style={{width:'100%'}}>立即预约设计师>>></Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default FivePart;
