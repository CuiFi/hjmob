import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown,Row, Col} from 'antd';
import { slide as Menua } from 'react-burger-menu';
import logo from '../../img/logo.png';
const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">南京</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">武汉</a>
    </Menu.Item>
  </Menu>
);

class HeaderPart extends Component {
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
	        <Link id="hothome" className="menu-item" to={`/hothome/`}>
		        热装小区
	        </Link>
	        <Link id="casehome" className="menu-item" to={`/casehome/`}>
		        装修案例
	        </Link>
        </Menua>

        <Layout id="page-wrap">
          <Header theme="dark" style={{ background: '#fff', padding: 0,overflow:'hidden',position: 'fixed', width: '100%',zIndex:30}}>
            <Row>
              <Col style={{paddingLeft: '24px'}} span={12}>
                <img style={{width:'120px'}} src={logo} alt=""/>
              </Col>
              <Col span={4}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="/">
                    北京<Icon type="environment" />
                  </a>
                </Dropdown>
              </Col>
              <Col span={8} style={{textAlign:'right',paddingRight: '24px',fontSize:'20px'}}>
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

export default HeaderPart;