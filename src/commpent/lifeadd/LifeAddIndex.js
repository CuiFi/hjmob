import React, { Component } from 'react';
import FromIn from '../index/FromIn';
import SecondHeaderPart from "../index/SecondHeaderPart";
import LifeAddFooter from "../index/LifeAddFooter";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {Player} from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import life_add_mob_01 from "../../img/lifeadd/life_add_mob_01.jpg";
import life_add_mob_02 from "../../img/lifeadd/life_add_mob_02.jpg";
import life_add_mob_03 from "../../img/lifeadd/life_add_mob_03.jpg";
import life_add_mob_04 from "../../img/lifeadd/life_add_mob_04.jpg";
import life_add_mob_05 from "../../img/lifeadd/life_add_mob_05.jpg";
import life_add_mob_06 from "../../img/lifeadd/life_add_mob_06.jpg";
import life_add_mob_08 from "../../img/lifeadd/life_add_mob_08.jpg";
import life_add_mob_10 from "../../img/lifeadd/life_add_mob_10.jpg";
import life_add_mob_12 from "../../img/lifeadd/life_add_mob_12.jpg";
import posterImg from "../../img/lifeadd/poster.jpg";

class ComActiveList extends Component {
	constructor(props) {
		super(props);
		this.state = {listText:'',loading: false};
	}

	componentWillMount() {
		var myList = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?sheet=daquan&typeID=50&limit=300',myList).then(response => response.json()).then(json => this.setState({listText:json}));
	};

	render() {
		const {listText} = this.state;
		return (
      <div>
        <SecondHeaderPart title="生活+" />
        <div style={{paddingTop:'64px'}} className="TwelvePart">
					<Row>
						<Col span={24}>
              <img src={life_add_mob_01} alt=""/>
              <img src={life_add_mob_02} alt=""/>
              <img src={life_add_mob_03} alt=""/>
              <img src={life_add_mob_04} alt=""/>
              <img src={life_add_mob_05} alt=""/>
              <img src={life_add_mob_06} alt=""/>
						</Col>
					</Row>
					<Row style={{margin:'10px 0 0'}}>
						<Col span={24}>
							<h4 style={{color:"#104c42",textAlign:'center'}}>申请成为业主须知</h4>
							<p style={{padding:'0 10px',fontSize:'0.8em',marginBottom:'5px'}}>1.业主可以选择两种录制方式一种是本人参与录制,需要有良好的语言表达能力.另一种只拍摄房屋改造过程人不入镜.
                </p>
							<p style={{padding:'0 10px',fontSize:'0.8em'}}>2.允许施工期间,拍摄素材的业主.允许在施工期间，拍摄素材并在北京电视台《生活+》栏目播出的业主</p>
						</Col>
					</Row>
        </div>
				<FromIn/>
        <Row>
          <Col span={24}>
            <img src={life_add_mob_08} alt=""/>
          </Col>
        </Row>
				<Row style={{padding:"0 10px"}}>
					<Col span={24}>
            <Player
              playsInline
              poster={posterImg}
              src="http://www.hejianzhiyang.com/Upload/Video/20180410/5acc8d6cf0a9b.mp4"
            />
					</Col>
				</Row>
				<Row style={{marginBottom:'10px'}}>
					<Col span={24}>
            <img src={life_add_mob_10} alt=""/>
					</Col>
				</Row>
        <FromIn/>
        <Row>
          <Col span={24}>
            <img src={life_add_mob_12} alt=""/>
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
