import React from 'react';
import { Layout } from 'antd';
import AppRoutes from '../AppRoutes';

const { Content } = Layout;

export default (props) => {
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
            }}
        >
        <AppRoutes />
        </Content>
    )
}