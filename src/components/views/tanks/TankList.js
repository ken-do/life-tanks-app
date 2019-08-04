import React from 'react';
import { Table, Divider, Tag, PageHeader, Button, Row, Col, Icon, Progress } from 'antd';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { listTanks, deleteTank, boostTank } from '../../../actions/tank';
import Converter from '../../../helpers/Converter';
import TankBoostModal from './TankBoostModal';

class TankList extends React.Component {

    state = {
        modalVisible: false,
        modalTitle: '',
        modalId: ''
    };

    openBoostModal = id => {
        const title = 'Boost My ' + Converter.toSentenceCase(this.props.tanks.filter(tank => tank.id === id)[0].name);
        this.setState({
            modalVisible: true,
            modalTitle: title,
            modalActivity: '',
            modalLevel: '',
            tankId: id,
        });
    }

    handleModalCancel = e => {
        this.setState({
            modalVisible: false,
        });
    };

    handleModalOk = (data) => {
        if (data.activity_name && data.level) {
            this.props.boostTank(data)
            this.setState({
                modalVisible: false,
            });
        }
    }

    deleteTank = (id) => {
        this.props.deleteTank(id);
    }

    getStatusTag = points => {
        const status = Converter.pointsToStatus(points);

        const colors = {
            excellent: 'green',
            good: 'geekblue',
            okay: 'orange',
            poor: 'volcano'
        };
        return (
            <Tag color={colors[status]}>
                {status}
            </Tag>
        );
    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <a onClick={() => this.props.history.push('/tanks/edit/' + record.id)}><strong>{Converter.toSentenceCase(text)}</strong></a>,
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
            className: 'hide visible-lg'
        },
        {
            title: 'Starting Points',
            dataIndex: 'starting_points',
            key: 'starting_points',
            className: 'hide visible-lg',
            render: text => <Progress percent={parseFloat(text)} size="small" />
        },
        {
            title: 'Current Points',
            dataIndex: 'points',
            key: 'points',
            render: text => <Progress percent={parseFloat(text)} size="small" />
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status, record) => {
                return this.getStatusTag(record.points)
            },
            className: 'hide visible-lg'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={this.openBoostModal.bind(this, record.id)}><Icon type="thunderbolt" theme="twoTone" twoToneColor="#ff4d4f" /></a>
                    <Divider type="vertical" />
                    <a onClick={() => this.props.history.push('/tanks/edit/' + record.id)}><Icon type="edit" theme="twoTone" twoToneColor="#1890ff" /></a>
                    <Divider type="vertical" />
                    <a onClick={this.deleteTank.bind(this, record.id)}><Icon type="delete" theme="twoTone" twoToneColor="grey" /></a>
                </span>
            ),
        },
    ];

    componentDidMount() {
        this.props.listTanks();
    }

    render() {
        const button = (this.props.tanks && this.props.tanks.length < 5) ? <NavLink to="/tanks/create"><Button type="primary" icon="plus">Add</Button></NavLink> : null;
        const modal = (this.state.modalVisible) ? <TankBoostModal tankId={this.state.tankId} title={this.state.modalTitle} handleOk={this.handleModalOk.bind(this)} handleCancel={this.handleModalCancel.bind(this)} /> : null;
        return (
            <div className="tank-list">
                <Row align="middle" type="flex" justify="space-between" >
                    <Col span={12}>
                        <PageHeader title="Tanks" subTitle="Your tanks" />
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        {button}
                    </Col>
                </Row>
                <Table columns={this.columns} dataSource={(this.props.tanks && this.props.tanks.length) ? this.props.tanks : []} pagination={false} rowKey='id' />
                {modal}
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        loading: state.loading,
        tanks: state.tanks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listTanks: () => {
            dispatch(listTanks())
        },
        deleteTank: (id) => {
            dispatch(deleteTank(id))
        },
        boostTank: (data) => {
            dispatch(boostTank(data))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TankList);