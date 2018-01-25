import React, { Component } from 'react';
import { Layout,  Icon, Row, Col} from 'antd';
import { slide as Menua } from 'react-burger-menu';
import createHistory from "history/createBrowserHistory";
const { Header } = Layout;
const history = createHistory();

class SecondHeaderPart extends Component {
	constructor(props){
		super(props);
		this.state = {
			isOpen: false
		};
	}

	onOpenChange = () => {
		this.setState({
			isOpen: !this.props.isOpen
		});
	}


	render() {
		const isOpen = this.state.isOpen;

		return(
      <div id="outer-container">
        <Menua width={'60%'} right isOpen={isOpen} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
          <a id="home" className="menu-item" href="/">首页</a>
          <a id="about" className="menu-item" href="/about">案例</a>
          <a id="contact" className="menu-item" href="/contact">设计师</a>
        </Menua>

        <Layout id="page-wrap">
          <Header theme="dark" style={{ background: '#fff', padding: 0,overflow:'hidden',position: 'fixed', width: '100%',zIndex:30}}>
            <Row>
              <Col style={{paddingLeft: '24px'}} span={4} onClick={history.goBack}>
	              <Icon type="left" />
              </Col>
              <Col span={16}>
                <h4 style={{textAlign:'center'}}>{this.props.title}</h4>
              </Col>
              <Col span={4} style={{textAlign:'right',paddingRight: '24px',fontSize:'20px'}}>
                <Icon
                  className="trigger"
                  type={'bars'}
                  onClick={ this.onOpenChange }
                />
              </Col>
            </Row>
          </Header>
        </Layout>
      </div>
		);
	}
}

export default SecondHeaderPart;