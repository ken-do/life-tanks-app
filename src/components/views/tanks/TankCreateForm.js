import React from 'react';
import { Form, Input, InputNumber, Select, Row, Col, Checkbox, Button, Radio } from 'antd';
import { createTank, updateTank } from '../../../actions/tank';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class TankCreateForm extends React.Component {
    
    handleSubmit = e => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                switch (values.status) {
                    case 'poor':
                        values.points = values.starting_points = 25;
                        break;
                    case 'okay':
                        values.points = values.starting_points = 40;
                        break;
                    case 'excellent':
                        values.points = values.starting_points = 75;
                        break;
                    default:
                        values.points = values.starting_points = 60;
                        break;
                }
                if (this.props.tank !== undefined) {
                    dispatch(updateTank(this.props.tank.id, values))
                        .then(response => {
                            this.props.history.push("/tanks");
                        });
                } else {
                    dispatch(createTank(values))
                        .then(response => {
                            this.props.history.push("/tanks");
                        });
                }

            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        let statusField;
        if (!this.props.tank) {
            statusField = (<Form.Item label="Current Status" >
                {getFieldDecorator('status', {
                    rules: [
                        { required: true, message: 'Please input your tank\'s status!' }
                    ],
                })(
                    <div>
                        <div>
                            <Radio.Group buttonStyle="solid" defaultValue='good'>
                                <Radio.Button value="poor">Poor</Radio.Button>
                                <Radio.Button value="okay">Okay</Radio.Button>
                                <Radio.Button value="good">Good</Radio.Button>
                                <Radio.Button value="excellent">Excellent</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                )}
            </Form.Item>)
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}  >
                <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        initialValue: (this.props.tank !== undefined) ? this.props.tank.name : '',
                        rules: [
                            {
                                required: true,
                                message: 'Please input the tank\'s name!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Description" >
                    {getFieldDecorator('description', {
                        initialValue: (this.props.tank !== undefined) ? this.props.tank.description : '',
                        rules: [
                            {
                                required: true, message: 'Please input your description!', whitespace: true
                            }
                        ],
                    })(<Input />)}
                </Form.Item>
                {statusField}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        { (!this.props.tank) ? 'Create' : 'Update'}
                    </Button>
                    <Button type="secondary" htmlType="button" onClick={() => this.props.history.push('/tanks')} style={{marginLeft:'5px'}}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedTankCreateForm = Form.create({ name: 'tank_create' })(withRouter(TankCreateForm));
export default connect()(WrappedTankCreateForm);