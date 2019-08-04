import React from 'react';
import { PageHeader } from 'antd';
import TankCreateForm from './TankCreateForm';

export default class TankCreate extends React.Component {

    render() {
        return (
            <div className="tank-create">
                <PageHeader title="Tanks" subTitle="This is a tank create form" />
                <TankCreateForm />
            </div>
        )
    }
}