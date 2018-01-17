import React, { Component } from 'react';
import {Row, Col} from 'antd';
import home from '../../img/home.png';
import anli from '../../img/anli.png';
import active from '../../img/active.png';
import deg from '../../img/deg.png';
import point from '../../img/point.png';
import three from '../../img/three.png';
import show from '../../img/show.png';
import hot from '../../img/hot.png';
import about from '../../img/about.png';

class PartBox extends Component {
	render(){
		return (
			<Col style={{textAlign:"center",padding:"10px 10px 0"}} span={6}>
				<img src={this.props.img} alt=""/>
				<p>{this.props.text}</p>
			</Col>
		);
	}
}

class NinePage extends Component {
	render() {
		return (
			<div className="NineIcon">
				<Row>
					<PartBox text="官网首页" img={home}/>
					<PartBox text="装修案例" img={anli}/>
					<PartBox text="活动优惠" img={active}/>
					<PartBox text="活动优惠" img={active}/>
				</Row>
				<Row>
					<PartBox text="设计师" img={deg}/>
					<PartBox text="装修指南" img={point}/>
					<PartBox text="3D全景" img={three}/>
					<PartBox text="3D全景" img={three}/>
				</Row>
				<Row>
					<PartBox text="工艺展示" img={show}/>
					<PartBox text="热装小区" img={hot}/>
					<PartBox text="关于合建" img={about}/>
					<PartBox text="关于合建" img={about}/>
				</Row>
			</div>
		);
	}
}

export default NinePage;
