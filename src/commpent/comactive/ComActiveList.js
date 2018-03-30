import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,List} from 'antd';
import SecondHeaderPart from "../index/SecondHeaderPart";
import Spin from "antd/es/spin/index";

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
        <SecondHeaderPart title="公司动态" />
        <div style={{paddingTop:'70px'}} className="FourAddTwoBtn TwelvePart">
          <List
            size="small"
            bordered
            dataSource={listText}
            renderItem={item => (<List.Item><Link to={`/comactivelist/${item.id}`}>{item.title}</Link></List.Item>)}
					>
            <div style={{textAlign:'center',padding:'5px 0'}}>
              {!listText && <Spin />}
						</div>
					</List>
        </div>

				{/*<div style={{textAlign:'center',padding:'10px'}}>没有更多内容...</div>*/}
			</div>
		);
	}
}

export default ComActiveList;
