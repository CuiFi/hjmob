import React, { Component } from 'react';
import SecondHeaderPart from "../index/SecondHeaderPart";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Link from "react-router-dom/es/Link";

class ComActiveContent extends Component {
	constructor(props) {
		super(props);
		this.state = {listText:'',PropNextText:''};
	}

	componentWillMount() {
		var myList = {
			method:'GET'
		};
		fetch("http://old.hejianzhiyang.com/Api/getDataByid?sheet=daquan&id=" + this.props.match.params.id ,myList)
			.then(response => response.json())
			.then(json => this.setState({listText:json}));

    fetch("http://old.hejianzhiyang.com/Api/prevnext?sheet=daquan&id=" + this.props.match.params.id ,myList)
      .then(response => response.json())
      .then(json => this.setState({PropNextText:json}));

		console.log(this.props.match.url);
		// console.log(this.props.match.params);
		// console.log(this.props.match);
	};

	getNextData(nextID){
    var myList = {
      method:'GET'
    };
    // 请求下一页
    fetch("http://old.hejianzhiyang.com/Api/getDataByid?sheet=daquan&id=" + nextID ,myList)
      .then(response => response.json())
      .then(json => this.setState({listText:json}));
    // 请求下一页的上下页
    fetch("http://old.hejianzhiyang.com/Api/prevnext?sheet=daquan&id=" + nextID ,myList)
      .then(response => response.json())
      .then(json => this.setState({PropNextText:json}));
	}

  getPrevData(prevID){
    var myList = {
      method:'GET'
    };
    fetch("http://old.hejianzhiyang.com/Api/getDataByid?sheet=daquan&id=" + prevID ,myList)
      .then(response => response.json())
      .then(json => this.setState({listText:json}));
    fetch("http://old.hejianzhiyang.com/Api/prevnext?sheet=daquan&id=" + prevID ,myList)
      .then(response => response.json())
      .then(json => this.setState({PropNextText:json}));

  }

	createMarkup() {
		return { __html:this.state.listText.content };
	};

	render() {
		const {listText,PropNextText} = this.state;
		const NewPropNextText = PropNextText
			? <Row style={{textAlign:'center'}}>
          <Col style={{padding:'5px'}} span={12}>
            <Link to={`/comactivelist/${PropNextText.prev.id}`} onClick={this.getPrevData.bind(this,PropNextText.prev.id)}>
              <span>[上一篇]</span>
              {PropNextText.prev.title.slice(0,6)+'...'}
            </Link>
          </Col>
          <Col style={{padding:'5px'}} span={12}>
            <Link to={`/comactivelist/${PropNextText.next.id}`} onClick={this.getNextData.bind(this,PropNextText.next.id)}>
              <span>[下一篇]</span>
              {PropNextText.next.title.slice(0,6)+'...'}
            </Link>
          </Col>
        </Row>
			: '没有加载到任何新闻';
		return (
			<div>
				<SecondHeaderPart title={listText.labelsName} />
				<div style={{paddingLeft:'10px',paddingRight:'10px',paddingTop:'70px'}}>
					<h3>{listText.title}</h3>
					<div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
				</div>
        {NewPropNextText}
			</div>
		);
	};
}

export default ComActiveContent;
