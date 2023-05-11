import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Cookies from "cookies-js";
import { Switch } from 'react-router-dom';
import * as profileActions from './../Auth/auth.actions';
import Institution from './../Admin/Institution/institution';
import Profile from './../Profile/profile';
import Communities from './../Communities/communities';
import Settings from './../Settings/settings';
import Structure from './../Admin/Structure/structure';
import AppRouter from './../../AppRoute';
import PersonalLayout from './../../layouts/PersonalLayout';
import AdminLayout from './../../layouts/AdminLayout';
import InstitutionWorker from './../Worker/Institution/institution.worker';
import CommunitiesWorker from '../Worker/Communities/communities.worker';

class Main extends Component {
    constructor(props) {
        super(props);

        const { profileActions, auth } = props;

        let accessToken = Cookies.get("access_token");

        if (accessToken) {
            profileActions.AuthInit();
        } else {
            //profileActions.ProfileGoAuth("/auth");
            this.props.history.push("/auth");
        }

        console.log(window.location.pathname)
        console.log(auth)
    }

    render() {
        return (
            <>
                <Switch>
                    <AppRouter path="/profile" component={Profile} layout={PersonalLayout} />
                    <AppRouter path="/communities" component={Communities} layout={PersonalLayout} />
                    <AppRouter path="/settings" component={Settings} layout={PersonalLayout} />
                    <AppRouter path="/structure/institution/:id" component={Institution} layout={AdminLayout} />
                    <AppRouter path="/structure" component={Structure} layout={AdminLayout} />
                    <AppRouter path="/worker/institution/:id" component={InstitutionWorker} layout={PersonalLayout} />
                    <AppRouter path="/worker/communities" component={CommunitiesWorker} layout={AdminLayout} />
                    <AppRouter path="/worker" component={InstitutionWorker} layout={PersonalLayout} />
                </Switch>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispath) {
    return {
        profileActions: bindActionCreators(profileActions, dispath)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);