import React from 'react';
import { PageHeader } from 'antd';
import ActivityCreateForm from './ActivityCreateForm';
import { connect } from 'react-redux';
import { retrieveActivity } from '../../../actions/activity';
import Converter from '../../../helpers/Converter';
import Randomizer from '../../../helpers/Randomizer';

class ActivityEdit extends React.Component {

    constructor(props){
        super(props)
        if(!props.activities.length){
            props.retrieveActivity(this.props.match.params.id)
        }
    }

    render() {
        let activity = (this.props.activities.length) ? Object.assign({}, (this.props.activities.filter(activity => {return activity.id == this.props.match.params.id}))[0]) : undefined;        
        return (
            <div className="activity-create">
                <PageHeader title="Activities" subTitle="This is a activity edit form" />
                <ActivityCreateForm activity={activity} key={Randomizer.int(2)}/>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        activities : state.activities
    }
}

const mapDispatchToProps = dispatch => {
    return {
        retrieveActivity : (id) => {
            dispatch(retrieveActivity(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityEdit);