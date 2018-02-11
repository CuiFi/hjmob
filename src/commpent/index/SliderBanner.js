import React, { Component } from 'react';
import { Carousel,Layout} from 'antd';
import { Spin } from 'antd';
const {Content } = Layout;


class SliderBanner extends Component {
	constructor(props) {
		super(props);
		this.state = {banner:''};
	}

	componentWillMount() {
		var myslider = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=slider&page=1&limit=10&recommendIndex=1&cityID=7',myslider).then(response => response.json()).then(json => this.setState({banner:json}));
	};


	render() {
		const {banner} = this.state;
		const bannerList = banner.length
			? banner.map((bannerItem, index) => (
        <div key={bannerItem.id}>
	        <a href={bannerItem.link}>
		        <img src={"http://www.hejianzhiyang.com/Upload/"+bannerItem.imgName_884_359} alt={bannerItem.title} />
	        </a>
        </div>
			))
			: <Spin />;
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
      <Content style={{paddingTop:'64px'}}>
	      {bannerInHtml}
      </Content>
		);
	}
}

export default SliderBanner;
