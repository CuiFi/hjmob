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
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=slider&page=1&limit=10&recommendIndex=1&cityID=7',myslider).then(response => response.json()).then(json => this.setState({banner:json}));
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
      <Content style={{marginTop:'64px'}}>
        <Carousel autoplay>
          <div>{bannerList}</div>
        </Carousel>
      </Content>
		);
	}
}

export default SliderBanner;
