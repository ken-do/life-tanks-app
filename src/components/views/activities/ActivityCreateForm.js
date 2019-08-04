import React from 'react';
import { Form, Input, InputNumber, Select, Row, Col, Checkbox, Button, Radio } from 'antd';
import { updateActivity, createActivity } from '../../../actions/activity';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class ActivityCreateForm extends React.Component {
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.props.match.params.id) {
                    this.props.updateActivity(this.props.match.params.id, values, this.goToActivitiesList);
                } else {
                    this.props.createActivity(values, this.goToActivitiesList);
                }
            }
        });
    };

    goToActivitiesList = response => {
        this.props.history.push("/activities");
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 24,
                    offset: 0,
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
                <Form.Item {...tailFormItemLayout} style={{textAlign:   'center'}}>
                    <Button type="primary" htmlType="submit">
                        { (!this.props.activity) ? 'Create' : 'Update'}
                    </Button>
                    <Button type="secondary" htmlType="button" onClick={() => this.props.history.push('/activities')} style={{marginLeft:'5px'}}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createActivity: (data, callback) => dispatch(createActivity(data)).then(callback),
        updateActivity: (id, data, callback) => dispatch(updateActivity(id, data)).then(callback),
    }
}

const WrappedActivityCreateForm = Form.create({ name: 'tank_create' })(withRouter(ActivityCreateForm));
export default connect(
    null,
    mapDispatchToProps
)(WrappedActivityCreateForm);