import React from 'react';
import { Table, Divider, Tag, PageHeader, Button, Row, Col, Icon } from 'antd';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { listActivities } from '../../../actions/activity';
import Converter from '../../../helpers/Converter';

class ActivityList extends React.Component {

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
            render: (text, record) => <a onClick={() => this.props.history.push('/activities/edit/' + record.id)}><strong>{Converter.toSentenceCase(text)}</strong></a>,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            className: 'hide visible-lg'
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.props.history.push('/activities/edit/' + record.id)}><Icon type="edit" theme="twoTone" twoToneColor="#1890ff" /></a>
                </span>
            ),
        },
    ];

    componentDidMount() {
        this.props.listActivities();
    }

    render() {
        const button = <NavLink to="/activities/create"><Button type="primary" icon="plus">Add</Button></NavLink>;
        return (
            <div className="activities-list">
                <Row align="middle" type="flex" justify="space-between" >
                    <Col span={12}>
                        <PageHeader title="Activities" subTitle="Your activities" />
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        {button}
                    </Col>
                </Row>
                <Table columns={this.columns} dataSource={(this.props.activities && this.props.activities.length) ? this.props.activities : []} pagination={false} rowKey='id' />
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        loading: state.loading,
        activities: state.activities
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listActivities: () => {
            dispatch(listActivities())
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityList);