import React, { Component } from 'react';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {bottomImg:''};
	}

	componentWillMount() {
		var myList = {
			method:'GET'
		};
		fetch("http://www.hejianzhiyang.com/Api/getDataByid?sheet=slider&id=5" ,myList).then(response => response.json()).then(json => this.setState({bottomImg:json}));
	};
	render() {
		const {bottomImg} = this.state;
		const bottomAd = bottomImg
			? (<img src={"http://www.hejianzhiyang.com/Upload/"+bottomImg.imgName_884_359} alt={bottomImg.title} />)
			: '没有加载到任何数据';
		return (
			<div className="footer" style={{textAlign:'center'}}>
				{bottomAd}
				{/*<img src={"http://www.hejianzhiyang.com/Upload/"+bottomImg.imgName_884_359} alt={bottomImg.title}/>*/}
				<h3>公司营业时间：09:00-21:00</h3>
				<h3>咨询热线：4009-010-958</h3>
				<h3>地址：北京市朝阳区北五环红军营东路6号（北五环汽配城）商务楼A座5层</h3>
			</div>
		);
	}
}

export default Footer;
