import React from 'react';
import { Form, Input, AutoComplete, Radio } from 'antd';
const { Option } = AutoComplete;
const { TextArea } = Input;

class TankBoostForm extends React.Component {

     
    handleSearch = value => {
        this.setState({
            activities: !value ? [] : this.props.activities,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const activities = this.props.activities.sort((a,b) => {return (a.name > b.name) ? 1: -1});
        const autoCompleteOptions = activities.map(activity => <Option key={activity.id}>{activity.name}</Option>);
        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Form {...formItemLayout} >
                <Form.Item label="Activity">
                    {getFieldDecorator('activity_id', {
                        rules: [
                            {
                                required: true,
                                message: 'Please select an activity',
                            },
                        ],
                    })(
                        <AutoComplete
                            onChange={this.props.onChange}
                            onSearch={this.handleSearch.bind(this)}
                            placeholder="Enter or select an activity (.e.g read a book)"
                        >
                        {autoCompleteOptions}
                        </AutoComplete>
                    )}
                </Form.Item>
                <Form.Item label="Boost Level" >
                    {getFieldDecorator('status', {
                        rules: [
                            { required: true, message: 'Please input your tank\'s status!' }
                        ],
                    })(
                        <div>
                            <div>
                                <Radio.Group buttonStyle="solid" defaultValue='good' onChange={this.props.onChange}>
                                    <Radio.Button value="1">Okay</Radio.Button>
                                    <Radio.Button value="2">Good</Radio.Button>
                                    <Radio.Button value="3">Awesome</Radio.Button>
                                    <Radio.Button value="4">Perfect</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                    )}
                </Form.Item>
                <Form.Item label="Notes (Optional)" >
                    {getFieldDecorator('notes', {
                        rules: [
                            {
                                required: false, message: 'Please input your notes!', whitespace: true
                            }
                        ],
                    })(<TextArea rows={4} onChange={this.props.onChange} />)}
                </Form.Item>
            </Form>
        );
    }


}

const WrappedTankBoostForm = Form.create({ name: 'tank_create' })(TankBoostForm);

export default WrappedTankBoostForm;