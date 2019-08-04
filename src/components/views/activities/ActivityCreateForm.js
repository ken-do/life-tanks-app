import React from 'react';
import { Form, Input, InputNumber, Select, Row, Col, Checkbox, Button, Radio } from 'antd';
import { updateActivity, createActivity } from '../../../actions/activity';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class TankCreateForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.props.activity !== undefined) {
                    dispatch(updateActivity(this.props.activity.id, values))
                        .then(response => {
                            this.props.history.push("/activities");
                        });
                } else {
                    dispatch(createActivity(values))
                        .then(response => {
                            this.props.history.push("/activities");
                        });
                }

            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

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
                        initialValue: (this.props.activity !== undefined) ? this.props.activity.name : '',
                        rules: [
                            {
                                required: true,
                                message: 'Please input the tank\'s name!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        { (!this.props.activity) ? 'Create' : 'Update'}
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedTankCreateForm = Form.create({ name: 'tank_create' })(withRouter(TankCreateForm));
export default connect()(WrappedTankCreateForm);