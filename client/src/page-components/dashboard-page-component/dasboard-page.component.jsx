import React,{useEffect} from 'react'
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {getCurrentProfile} from '../../redux/profile-reducer/profile.actions';

const DashboardPage = ({profile,auth, getCurrentProfile}) => {
    useEffect(()=>{
        getCurrentProfile();
    },[]);
    
    return (
        <div>
            Dashboard
        </div>
    )
}
DashboardPage.prototype={
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    profile: state.profile,
    auth: state.auth
});
const mapDispatchToProps = (dispatch) =>({
    getCurrentProfile: ()=> dispatch(getCurrentProfile()),
});

export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);
