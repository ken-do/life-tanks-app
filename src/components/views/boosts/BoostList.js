import React from 'react';
import { Table, Divider, PageHeader, Button, Row, Col, Icon, Tag } from 'antd';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { listBoosts, deleteBoost } from '../../../actions/boost';
import Converter from '../../../helpers/Converter';

class BoostsList extends React.Component {

    deleteBoost = (id) => {
        this.props.deleteBoost(id);
    }

    
    getLevelTag = record => {

        const colors = ['volcano', 'orange', 'geekblue','green' ];
        return (
            <Tag color={colors[record.level - 1]}>
                {record.level_name}
            </Tag>
        );
    }

    columns = [
        {
            title: 'Activity',
            key: 'activity_name',
            dataIndex: 'activity_name',
            render: (text, record) => <a onClick={() => this.props.history.push('/activities')}><strong>{Converter.toSentenceCase(text)}</strong></a>,
        },
        {
            title: 'Tank',
            dataIndex: 'tank_name',
            key: 'tank_name',
            className: 'hide visible-lg',
            render: (text, record) => <a onClick={() => this.props.history.push('/tanks')}>{Converter.toSentenceCase(text)}</a>,

        },
        {
            title: 'Level',
            dataIndex: 'level_name',
            key: 'level_name',
            render: (text, record) => this.getLevelTag(record)
        },
        {
            title: 'Boosted At',
            dataIndex: 'created_at',
            key: 'created_at',
            className: 'hide visible-lg'
        },        
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.props.history.push('/boosts/details/' + record.id)}><Icon type="eye" /></a>
                    <Divider type="vertical" />
                    <a onClick={this.deleteBoost.bind(this, record.id)}><Icon type="delete" /></a>
                </span>
            ),
        },
    ];

    componentDidMount() {
        this.props.listBoosts();
    }

    render() {
        return (
            <div className="tank-list">
                <Row align="middle" type="flex" justify="space-between" >
                    <Col span={18}>
                        <PageHeader title="Boosts" subTitle="Your boosts history" />
                    </Col>
                </Row>
                <Table columns={this.columns} dataSource={(this.props.boosts && this.props.boosts.length) ? this.props.boosts : []} pagination={false} rowKey='id' />
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        loading: state.loading,
        boosts: state.boosts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listBoosts: () => {
            dispatch(listBoosts())
        },
        deleteBoost: (id) => {
            dispatch(deleteBoost(id))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoostsList);