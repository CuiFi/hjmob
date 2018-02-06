import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Row, Col,Button,Card,Avatar } from 'antd';
import point01 from '../../img/point_01.png';
import point02 from '../../img/point_02.png';
import point03 from '../../img/point_03.png';
import point04 from '../../img/point_04.png';
import point05 from '../../img/point_05.png';
import point06 from '../../img/point_06.png';
import point07 from '../../img/point_07.png';
import point08 from '../../img/point_08.png';
import point09 from '../../img/point_09.png';
import point10 from '../../img/point_10.png';
import point11 from '../../img/point_11.png';
import point12 from '../../img/point_12.png';
import point13 from '../../img/point_13.png';
import point14 from '../../img/point_14.png';

class ColInCard extends Component{
	render(){

		return(
			<Col span={this.props.line}>
				<Link to={`/details/`}>
					<Card style={{ width: '100%' }}>
						<Avatar style={{ backgroundColor: '#fff' }} shape="square" src={this.props.img} />
						<h2>{this.props.text}</h2>
					</Card>
				</Link>
			</Col>
		);
	}
}

class TenPart extends Component {
	render() {
		return (
			<div className="FourAddTwoBtn TenPart">
				<Row>
					<Col>
						<h3 style={{textAlign:'center'}}>装修指南</h3>
					</Col>
				</Row>
				<Row style={{marginBottom:'10px',textAlign:'center'}}>
					<ColInCard line={6} img={point01} text="量房"/>
					<ColInCard line={6} img={point02} text="设计"/>
					<ColInCard line={6} img={point03} text="预算"/>
					<ColInCard line={6} img={point04} text="合同"/>
				</Row>
				<Row style={{textAlign:'center'}}>
					<ColInCard line={6} img={point05} text="材料"/>
					<ColInCard line={6} img={point06} text="拆改"/>
					<ColInCard line={6} img={point07} text="水电"/>
					<ColInCard line={6} img={point08} text="防水"/>
				</Row>
				<Row style={{marginBottom:'10px',textAlign:'center'}}>
					<ColInCard line={6} img={point09} text="泥瓦"/>
					<ColInCard line={6} img={point10} text="木工"/>
					<ColInCard line={6} img={point11} text="油漆"/>
					<ColInCard line={6} img={point12} text="竣工"/>
				</Row>
				<Row style={{textAlign:'center'}}>
					<ColInCard line={12} img={point13} text="泥瓦"/>
					<ColInCard line={12} img={point14} text="木工"/>
				</Row>
				<Row gutter={10}>
					<Col span={24}>
						<Link to={`/details/`}>
							<Button type="primary" style={{width:'100%'}}>查看更多装修指南>>></Button>
						</Link>
					</Col>
				</Row>
			</div>
		);
	}
}

export default TenPart;
