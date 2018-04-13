import React, { Component } from 'react';

const BJaddr = (
	<div>
		<h3>公司营业时间：09:00-21:00</h3>
		<h3>咨询热线：4009-010-958</h3>
		<h3>地址：北京市朝阳区北五环红军营东路6号（北五环汽配城）商务楼A座5层</h3>
	</div>
);

const WHaddr = (
	<div>
		<h3>公司营业时间：09:00-21:00</h3>
		<h3>咨询热线：4008-602-728</h3>
		<h3>地址：武汉市武昌区建设大厦A座9楼整层</h3>
	</div>
);

const NJaddr = (
	<div>
		<h3>公司营业时间：09:00-21:00</h3>
		<h3>咨询热线：4006-178-900</h3>
		<h3>地址：南京市建邺区汉中门大街123号知海大厦7层（南京审计学院对面）</h3>
	</div>
);

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {cityID:localStorage.cityID};
	}

	render() {
		let addr = '';
		switch (parseInt(this.state.cityID,10)){
			case 7:
				addr = BJaddr;
				break;
			case 8:
				addr = WHaddr;
				break;
			case 9:
				addr = NJaddr;
				break;
			default:
				addr = BJaddr;
				break;

		}
		return (
			<div className="footer" style={{textAlign:'center'}}>
				{addr}
			</div>
		);
	}
}

export default Footer;
