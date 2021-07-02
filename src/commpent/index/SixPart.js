import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Row, Col,Button,Carousel} from 'antd';

class SixPart extends Component {
	constructor(props) {
		super(props);
		this.state = {banner:'',cityID:localStorage.cityID};
	}

	componentWillMount() {
		var myslider = {
			method:'GET'
		};
		fetch('http://old.hejianzhiyang.com/Api/getDataByType?sheet=quanjing&recommendIndex=1&limit=3&cityID=' + this.state.cityID,myslider).then(response => response.json()).then(json => this.setState({banner:json}));
	};


	render() {
		const {banner} = this.state;
		const bannerList = banner.length
			? banner.map((bannerItem, index) => (
				<div key={bannerItem.id}>
					<a href={bannerItem.link}>
						<img src={"http://old.hejianzhiyang.com/Upload/"+bannerItem.imgName_380_209} alt={bannerItem.title} />
					</a>
				</div>
			))
			: '没有加载到任何数据';

		let bannerInHtml = '';
		switch (banner.length){
			case 1:
				bannerInHtml = <Carousel autoplay><div>{bannerList[0]}</div></Carousel>;
				break;
			case 2:
				bannerInHtml = <Carousel autoplay><div>{bannerList[0]}</div><div>{bannerList[1]}</div></Carousel>;
				break;
			case 3:
				bannerInHtml = <Carousel autoplay><div>{bannerList[0]}</div><div>{bannerList[1]}</div><div>{bannerList[2]}</div></Carousel>;
				break;
			default:
				bannerInHtml = <Carousel autoplay><div>{bannerList[0]}</div></Carousel>;
				break;
		}

		return (
			<div className="FourAddTwoBtn">
				<Row>
					<Col>
						<h3 style={{textAlign:'center'}}>3D实景图  带给你最真切的装修体验</h3>
					</Col>
				</Row>
				<Row style={{marginBottom:'10px'}} gutter={10}>
					<Col span={24}>
						{bannerInHtml}
					</Col>
				</Row>
				<Row gutter={10}>
					<Col span={24}>
						<Link to={`/threehome/`}>
							<Button style={{width:'100%'}}>查看更多3D实景图>>></Button>
						</Link>
					</Col>
				</Row>
			</div>
		);
	}
}

export default SixPart;
