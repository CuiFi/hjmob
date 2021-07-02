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
		fetch('http://old.hejianzhiyang.com/Api/getDataByType?sheet=daquan&typeID=50&limit=' + this.props.limit,myList).then(response => response.json()).then(json => this.setState({listText:json}));
	};

	render() {
		const {listText} = this.state;
		return (
			<div className="FourAddTwoBtn TwelvePart">
				<Row>
					<Col span={12}>
						<h3>公司动态</h3>
					</Col>
          <Col span={12} style={{textAlign:'right'}}>
						<Link to={`/comactivelist/`}>
              <h3>查看更多</h3>
						</Link>
          </Col>
				</Row>
				<List
					size="small"
					bordered
					dataSource={listText}
					renderItem={item => (<List.Item><Link to={`details/${item.id}`}>{item.title}</Link></List.Item>)}
				/>
			</div>
		);
	}
}

export default TwelvePart;
