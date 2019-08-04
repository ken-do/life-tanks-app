import React from 'react';
import { PageHeader } from 'antd';
import ActivityCreateForm from './ActivityCreateForm';

export default class ActivityCreate extends React.Component {

    render() {
        return (
            <div className="activity-create">
                <PageHeader title="Activities" subTitle="This is a activity create form" />
                <ActivityCreateForm />
            </div>
        )
    }
}