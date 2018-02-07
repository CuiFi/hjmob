import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';
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
					<Link to={`/casehome/`}>
						<PartBox text="装修案例" img={anli}/>
					</Link>
					<PartBox text="活动优惠" img={active}/>
					<Link to={`/deg/`}>
						<PartBox text="设计师" img={deg}/>
					</Link>
					<Link to={`/details/`}>
						<PartBox text="装修指南" img={point}/>
					</Link>
				</Row>
				<Row>
					<Link to={`/threehome/`}>
						<PartBox text="3D全景" img={three}/>
					</Link>
					<PartBox text="工艺展示" img={show}/>
					<Link to={`/hothome/`}>
						<PartBox text="热装小区" img={hot}/>
					</Link>
					<Link to={`/about/`}>
						<PartBox text="关于合建" img={about}/>
					</Link>
				</Row>
			</div>
		);
	}
}

export default NinePage;
