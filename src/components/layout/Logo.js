import React from 'react';
import logo from '../../logo.svg';
import { Icon } from 'antd';

export default (props) => {

    const styles = {
        logo: {
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            'justifyContent': 'center',
            'margin': '0 0.5rem',
        },
        logoLink: {
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            'justifyContent': 'center',
            'position': 'relative',
            'top': '5px',
        },
        logoIcon : {
            fontSize: '1.4rem', 
            color: '#08c' 
        },
        logoText: {
            color: 'white',
            fontSize: '10px',
            color: '#1890ff',
            lineHeight: '10px'
        }
    }

    return (
        <div className="logo" style={styles.logo}>
            <a href="/" style={styles.logoLink}>
                <Icon type="thunderbolt" style={styles.logoIcon} />
                <p style={styles.logoText}>LifeTanks</p>
            </a>
        </div>
    )
}