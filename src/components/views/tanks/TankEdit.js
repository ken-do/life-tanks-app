import React from 'react';
import { PageHeader } from 'antd';
import TankCreateForm from './TankCreateForm';
import { connect } from 'react-redux';
import { retrieveTank } from '../../../actions/tank';
import Converter from '../../../helpers/Converter';
import Randomizer from '../../../helpers/Randomizer';

class TankEdit extends React.Component {

    constructor(props){
        super(props)
        if(!props.tanks.length){
            props.retrieveTank(this.props.match.params.id)
        }
    }

    render() {
        let tank = (this.props.tanks.length) ? Object.assign({}, (this.props.tanks.filter(tank => {return tank.id == this.props.match.params.id}))[0]) : undefined;        
        return (
            <div className="tank-create">
                <PageHeader title="Tanks" subTitle="This is a tank edit form" />
                <TankCreateForm tank={tank} key={Randomizer.int(2)}/>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        tanks : state.tanks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        retrieveTank : (id) => {
            dispatch(retrieveTank(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TankEdit);