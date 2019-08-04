import React from 'react';
import { Modal } from 'antd';
import TankBoostForm from './TankBoostForm';
import { listActivities } from '../../../actions/activity';
import { connect } from 'react-redux';

class TankBoostModal extends React.Component {

    state = {
        activity_id: '',
        activity_name : '',
        level: '',
        notes: ''
    }

    handleFormChange = e => {
        if(e.target){
            if(e.target.id === 'tank_create_notes'){
                this.setState({
                    'notes' : e.target.value
                })
            } else if(e.target.type === 'radio') {
                this.setState({
                    level: e.target.value
                });
            }
        } else {
            const activityId = parseInt(e);
            if(activityId) {
                const activity =  (this.props.activities) ?  this.props.activities.filter(activity => activity.id === activityId)[0] : null;
                this.setState({
                    activity_id: e,
                    activity_name: (activity) ? activity.name : ''
                });
            } else {
                this.setState({
                    activity_id: '',
                    activity_name: e
                });           
            }
        }

    }
    

    handleOk() {
        console.log(this.state)
        this.props.handleOk({tank_id:this.props.tankId, ...this.state});
    }

    componentDidMount(){
        this.props.listActivities();
    }

    render() {
        return (
            <Modal
                title={this.props.title}
                visible={true}
                onOk={this.handleOk.bind(this)}
                onCancel={this.props.handleCancel}
                okText='Boost'
            >
                <TankBoostForm activities={this.props.activities} onChange={this.handleFormChange.bind(this)} />
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        activities: state.activities,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listActivities: () => dispatch(listActivities())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TankBoostModal);