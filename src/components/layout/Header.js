import React from 'react';
import { Icon, Layout } from 'antd';
import Logo from './Logo';
import Navigation from './Navigation';

const { Header } = Layout;


export default (props) => {
  
        return(
          <Header>
            <Logo />
            <Navigation />
          </Header>
        )
}