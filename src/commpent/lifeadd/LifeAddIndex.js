import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import FromIn from '../index/FromIn';
import SecondHeaderPart from "../index/SecondHeaderPart";
import LifeAddFooter from "../index/LifeAddFooter";
import {Row, Carousel, Col, Button} from 'antd';
import {Player} from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import "./lifeAdd.css";
import posterImg from "../../img/lifeadd/poster.jpg";

import life_add_mob_new_01 from '../../img/lifeadd/life_add_img_mob_01.jpg';
import life_add_mob_new_02 from '../../img/lifeadd/life_add_img_mob_02.jpg';
import life_add_mob_new_03 from '../../img/lifeadd/life_add_img_mob_03.jpg';
import life_add_mob_new_04 from '../../img/lifeadd/life_add_img_mob_04.jpg';
import life_add_mob_new_05 from '../../img/lifeadd/life_add_img_mob_05.jpg';

import lb_life_01 from '../../img/lifeadd/1_03.jpg';
import lb_life_02 from '../../img/lifeadd/2_03.jpg';
import lb_life_03 from '../../img/lifeadd/3_03.jpg';
import lb_life_04 from '../../img/lifeadd/4_03.jpg';
import lb_life_05 from '../../img/lifeadd/5_03.jpg';

const data = [
	{
		title: 'Ant Design Title 1',
		imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		videoUrl: 'http://old.hejianzhiyang.com/Upload/Video/20180410/5acc8d6cf0a9b1.mp4',
	},
	{
		title: 'Ant Design Title 2',
		imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		videoUrl: 'http://old.hejianzhiyang.com/Upload/Video/20180410/5acc8d6cf0a9b2.mp4',
	},
	{
		title: 'Ant Design Title 3',
		imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		videoUrl: 'http://old.hejianzhiyang.com/Upload/Video/20180410/5acc8d6cf0a9b3.mp4',
	},
	{
		title: 'Ant Design Title 4',
		imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		videoUrl: 'http://old.hejianzhiyang.com/Upload/Video/20180410/5acc8d6cf0a9b.mp4',
	},
];


class ComActiveList extends Component {
	constructor(props) {
		super(props);
		this.state = {listText:'',loading: false};
		// this.kankan = this.kankan.bind(this)
	}

	componentWillMount() {
		let myList = {
			method:'GET'
		};
		fetch('http://old.hejianzhiyang.com/Api/getDataByType?sheet=daquan&typeID=50&limit=300',myList).then(response => response.json()).then(json => this.setState({listText:json}));
	};


	kankan = item => {
		console.log(item)
	};

	render() {
		return (
      <div>
        <SecondHeaderPart title="生活+" />
        <div style={{paddingTop:'64px'}} className="TwelvePart">
					<Row>
						<Col span={24}>
							<img src={life_add_mob_new_01} alt=""/>
							<img src={life_add_mob_new_02} alt=""/>
						</Col>
					</Row>
        </div>
				<FromIn newClass="ok" submit_button="点击报名" />
				<Row>
					<Col span={24}>
						<img src={life_add_mob_new_03} alt=""/>
						<img src={life_add_mob_new_04} alt=""/>
					</Col>
				</Row>
				<Carousel autoplay dots={false}>
					<img src={lb_life_01} alt=""/>
					<img src={lb_life_02} alt=""/>
					<img src={lb_life_03} alt=""/>
					<img src={lb_life_04} alt=""/>
					<img src={lb_life_05} alt=""/>
				</Carousel>
				<Row>
					<h3 style={{textAlign:"center",margin: 0,padding: "10px 0",backgroundColor: "#fafafa",fontWeight: "bold"}}>《生活+》录制案例</h3>
				</Row>
				<Row>
					<Col span={24} style={{paddingLeft:'10px',paddingRight:'10px'}}>
            <Player
              playsInline
              poster={posterImg}
              src="http://old.hejianzhiyang.com/Upload/Video/20180410/5acc8d6cf0a9b.mp4"
            />
					</Col>
				</Row>
				<Row>
					<Col span={24} style={{padding:'10px'}}>
						<Link to={`/video/`}>
							<Button style={{width:'100%'}}>查看更多视频>>></Button>
						</Link>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<img src={life_add_mob_new_05} alt=""/>
					</Col>
				</Row>

        <FromIn/>
				<LifeAddFooter/>
				{/*<div style={{textAlign:'center',padding:'10px'}}>没有更多内容...</div>*/}
			</div>
		);
	}
}

export default ComActiveList;
