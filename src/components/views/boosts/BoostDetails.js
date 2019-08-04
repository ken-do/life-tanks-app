import React from 'react';
import { Descriptions } from 'antd';
import { connect } from 'react-redux';
import  { retrieveBoost } from '../../../actions/boost';

class BoostDetails extends React.Component {

 
    componentDidMount(){
        if(!this.props.boosts.length){
            this.props.retrieveBoost(this.props.match.params.id)
        }
    }

    render() {
        const boost = ( this.props.boosts.length ) ? (this.props.boosts.filter(boost => boost.id == this.props.match.params.id))[0] : {};
        return (
            <Descriptions title="Boost Details">
                <Descriptions.Item label="Boosted Tank">{boost.tank_name}</Descriptions.Item>
                <Descriptions.Item label="Activity">{boost.activity_name}</Descriptions.Item>
                <Descriptions.Item label="Boosted At">{boost.created_at}</Descriptions.Item>
                <Descriptions.Item label="Notes">{boost.notes}</Descriptions.Item>
            </Descriptions>
        )
    }
}

const mapStateToProps = state => {
    return {
        boosts : state.boosts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        retrieveBoost : (id) => {
            dispatch(retrieveBoost(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoostDetails);