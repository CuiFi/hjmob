import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Layout,  Icon, Row, Col} from 'antd';
import { slide as Menua } from 'react-burger-menu';
import createHistory from "history/createBrowserHistory";
const { Header } = Layout;
const history = createHistory();

class SecondHeaderPart extends Component {
	constructor(props){
		super(props);
		this.state = {
			menuOpen: false
		}
	}

	// 保持状态的同步,如果少了此方法,怎会造成弹出框,下拉加载,侧边栏完全混乱
	handleStateChange = (state) => {
		this.setState({menuOpen: state.isOpen})
	}

	// closeMenu () {
	// 	this.setState({menuOpen: false})
	// }

	openMenu = () => {
		this.setState({menuOpen: true})
	}


	render() {

		return(
      <div id="outer-container">
        <Menua onStateChange={this.handleStateChange} width={'60%'} right isOpen={this.state.menuOpen} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
	        <Link id="home" className="menu-item" to={`/`}>
		        首页
	        </Link>
	        <Link id="home" className="menu-item" to={`/hothome/`}>
		        热装小区
	        </Link>
	        <Link id="casehome" className="menu-item" to={`/casehome/`}>
		        装修案例
	        </Link>
	        <Link id="casehome" className="menu-item" to={`/deg/`}>
		        设计师
	        </Link>
	        <Link id="casehome" className="menu-item" to={`/threehome/`}>
		        3D全景
	        </Link>
	        <Link id="casehome" className="menu-item" to={`/details/`}>
		        装修指南
	        </Link>
	        <Link id="casehome" className="menu-item" to={`/about/`}>
		        关于我们
	        </Link>
        </Menua>

        <Layout id="page-wrap">
          <Header theme="dark" style={{ background: '#fff', padding: 0,overflow:'hidden',position: 'fixed', width: '100%',zIndex:1, boxShadow:'0 1px #c8c8c8'}}>
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
                  onClick={ this.openMenu }
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