import React, { Component } from 'react';
import { Carousel,Layout} from 'antd';
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
      <Content style={{paddingTop:'64px'}}>
        <Carousel autoplay>
          <div>{bannerList[0]}</div>
          <div>{bannerList[1]}</div>
          <div>{bannerList[2]}</div>
        </Carousel>
      </Content>
		);
	}
}

export default SliderBanner;
