import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,List} from 'antd';

class TwelvePart extends Component {
	constructor(props) {
		super(props);
		this.state = {listText:''};
	}

	componentWillMount() {
		var myList = {
			method:'GET'
		};
		fetch('http://www.hejianzhiyang.com/Api/getDataByType?type=daquan&limit=' + this.props.limit,myList).then(response => response.json()).then(json => this.setState({listText:json}));
	};

	render() {
		const {listText} = this.state;
		return (
			<div className="FourAddTwoBtn TwelvePart">
				<Row>
					<Col>
						<h3>装修问答</h3>
					</Col>
				</Row>
				<List
					size="small"
					bordered
					dataSource={listText}
					renderItem={item => (<List.Item><Link to={`details/${item.id}`}>{item.title}</Link></List.Item>)}
				/>
				{/*<div className="articleContainer" dangerouslySetInnerHTML={{__html:'<h1>haha</h1>'}}></div>*/}
				{/*<PCNewsBlock id="3"/>*/}
			</div>
		);
	}
}

export default TwelvePart;
