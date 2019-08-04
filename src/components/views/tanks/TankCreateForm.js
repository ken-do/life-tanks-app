import React from 'react';
import { Form, Input, InputNumber, Select, Row, Col, Checkbox, Button, Radio } from 'antd';
import { createTank, updateTank } from '../../../actions/tank';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Converter from '../../../helpers/Converter';

class TankCreateForm extends React.Component {
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.points = values.starting_points = Converter.statusToPoints(values.status);
                if (this.props.match.params.id) {
                    this.props.updateTank(this.props.match.params.id, values, this.goToTanksList);
                } else {
                    this.props.createTank(values, this.goToTanksList);
                }
            }
        });
    };

    goToTanksList = (response) => {
        this.props.history.push("/tanks");
    }

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
                <Form.Item {...tailFormItemLayout} style={{textAlign: 'center'}}>
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


const mapDispatchToProps = dispatch => {
    return {
        createTank: (data, callback) => dispatch(createTank(data)).then(callback),
        updateTank: (id, data, callback) => dispatch(updateTank(id, data)).then(callback),
    }
}

const WrappedTankCreateForm = Form.create({ name: 'tank_create' })(withRouter(TankCreateForm));
export default connect(
    null,
    mapDispatchToProps
)(WrappedTankCreateForm);