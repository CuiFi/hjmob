import React, { Component } from 'react';
import {Divider} from 'antd';
import SliderBanner from './SliderBanner';
import NinePage from './NinePage';
import WrappedNormalLoginForm from './FromIn';
import FourPart from './FourPart';
import FivePart from './FivePart';
import SixPart from './SixPart';
import SevenPart from './SevenPart';
import EightPart from './EightPart';
import TenPart from './TenPart';
import ElevenPart from './ElevenPart';
import TwelvePart from './TwelvePart';

class IndexContainer extends Component {
	render() {
		return (
			<div>
				<SliderBanner />
				<NinePage/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<WrappedNormalLoginForm/>
				<FourPart/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<FivePart/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<SixPart/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<SevenPart/>
				<EightPart/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<TenPart/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<ElevenPart/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
				<TwelvePart/>
				<Divider style={{height:"10px",margin:"5px 0"}}/>
			</div>
		);
	}
}

export default IndexContainer;
