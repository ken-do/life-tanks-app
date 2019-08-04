import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink, withRouter } from "react-router-dom";

export default withRouter((props) => {
  const activeRoute = props.location.pathname.split('/')[1];
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[activeRoute]} style={{ lineHeight: '64px' }}>
      <Menu.Item key="tanks">
        <NavLink to="/tanks">
          <span>Tanks</span>
        </NavLink >
      </Menu.Item>
      <Menu.Item key="activities">
        <NavLink to="/activities">
          <span>Activities</span>
        </NavLink >
      </Menu.Item>
      <Menu.Item key="boosts">
        <NavLink to="/boosts">
          <span>Boosts</span>
        </NavLink >
      </Menu.Item>
    </Menu>
  );
})

