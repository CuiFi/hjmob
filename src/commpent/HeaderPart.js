import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown,Row, Col} from 'antd';
import { slide as Menua } from 'react-burger-menu';
import logo from '../img/logo.png';
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
	state = {
		isOpen: false,
	};

	onOpenChange = () => {
		this.setState({
			isOpen: !this.props.isOpen
		});
	}

	render() {
		return(
      <div id="outer-container">
        <Menua width={ '60%' } right isOpen={this.state.isOpen} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="/about">About</a>
          <a id="contact" className="menu-item" href="/contact">Contact</a>
          <a className="menu-item--small" href="">Settings</a>
        </Menua>

        <Layout id="page-wrap">
          <Header theme="dark" style={{ background: '#fff', padding: 0,overflow:'hidden',position: 'fixed', width: '100%',top:0}}>
            <Row>
              <Col style={{paddingLeft: '24px' }} span={12}>
                <img style={{width:'120px'}} src={logo} alt=""/>
              </Col>
              <Col span={4}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    北京<Icon type="environment" />
                  </a>
                </Dropdown>
              </Col>
              <Col span={8} style={{textAlign:'right',paddingRight: '24px',fontSize:'20px'}}>
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

export default HeaderPart;