import React from 'react';
import { Layout } from 'antd';
import Header from './layout/Header';
import Content from './layout/Content';

const { Sider } = Layout;


class AppContainer extends React.Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };



  render() {
    return (
      <Layout className="layout" style={{minHeight: '100vh'}}>
          <Header collapsed={this.state.collapsed} toggle={this.toggle.bind(this)} />
          <Content page={this.state.page} />
      </Layout>
    );
  }
}

export default AppContainer;