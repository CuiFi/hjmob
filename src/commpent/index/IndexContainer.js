import React, { Component } from 'react';
import {Divider} from 'antd';
import SliderBanner from './SliderBanner';
import NinePage from './NinePage';
import WrappedNormalLoginForm from './FromIn';
import FourPart from './FourPart';
// import FivePart from './FivePart';
import SixPart from './SixPart';
import SevenPart from './SevenPart';
import EightPart from './EightPart';
import TenPart from './TenPart';
// import ElevenPart from './ElevenPart';
import TwelvePart from './TwelvePart';
import ThirteenPart from './ThirteenPart';



class IndexContainer extends Component {
	render() {
		let eightPart = (<div><EightPart/>
			<Divider style={{height:"10px",margin:"5px 0"}}/></div>);
		if (localStorage.cityID === 8){
			eightPart = '';
		}
		return (
			<div>
				<SliderBanner />
				<NinePage/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<WrappedNormalLoginForm/>
				<FourPart/>
				{/*<Divider style={{height:"10px",margin:"5px 0"}}/>*/}
				{/*<FivePart/>*/}
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<SixPart/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<SevenPart/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				{eightPart}
				<TenPart/>
				{/*<Divider style={{height:"10px",margin:"5px 0"}}/>*/}
				{/*<ElevenPart/>*/}
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<TwelvePart limit="10"/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<ThirteenPart/>
			</div>
		);
	}
}

export default IndexContainer;
