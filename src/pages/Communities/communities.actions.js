import axios from 'axios';
import { config } from '../../config';

import { SUBSCRIPTIONS_LIST_REQUEST, SUBSCRIPTIONS_LIST_SUCCESS, SUBSCRIPTIONS_LIST_ERROR,
         SUBSCRIPTIONS_UNSUBSCRIBE_REQUEST, SUBSCRIPTIONS_UNSUBSCRIBE_SUCCESS, SUBSCRIPTIONS_UNSUBSCRIBE_ERROR,
         INVITATIONS_LIST_REQUEST, INVITATIONS_LIST_SUCCESS, INVITATIONS_LIST_ERROR,
         INVITATIONS_ACCEPT_REQUEST, INVITATIONS_ACCEPT_SUCCESS, INVITATIONS_ACCEPT_ERROR } from './communities.types';

export function ListSubscriptions(childId) {

    const queryParams = { status: 2 }
    if (childId) {
        queryParams.children = childId;
    }
    
    return (dispatch) => {
        dispatch({
            type: SUBSCRIPTIONS_LIST_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.subscriptionsList, { params: queryParams })
            .then(function (response) {

                dispatch({
                    type: SUBSCRIPTIONS_LIST_SUCCESS,
                    payload: response.data
                })  
            })
            .catch(function (error) {
                const errorMessage = error.response ? error.response.data.message : "Внутреняя ошибка";

                dispatch({
                    type: SUBSCRIPTIONS_LIST_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function Unsubscribe(communityId) {
    return (dispatch) => {
        dispatch({
            type: SUBSCRIPTIONS_UNSUBSCRIBE_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.subscriptionsUnsubscribe, { id: communityId })
            .then(function (response) {

                dispatch({
                    type: SUBSCRIPTIONS_UNSUBSCRIBE_SUCCESS,
                    payload: { }
                })  
            })
            .catch(function (error) {
                const errorMessage = error.response ? error.response.data.message : "Внутреняя ошибка";

                dispatch({
                    type: SUBSCRIPTIONS_UNSUBSCRIBE_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function ListInvitations() {

    return (dispatch) => {
        dispatch({
            type: INVITATIONS_LIST_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.invitationList)
            .then(function (response) {

                dispatch({
                    type: INVITATIONS_LIST_SUCCESS,
                    payload: response.data
                })  
            })
            .catch(function (error) {
                const errorMessage = error.response ? error.response.data.message : "Внутреняя ошибка";

                dispatch({
                    type: INVITATIONS_LIST_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function AcceptInvitation(data) {
    return (dispatch) => {
        dispatch({
            type: INVITATIONS_ACCEPT_REQUEST,
            payload: { }
        })

        axios.post(config.apiUrl + config.methods.invitationAccept, data)
            .then(function (response) {

                dispatch({
                    type: INVITATIONS_ACCEPT_SUCCESS,
                    payload: { }
                });

                ListSubscriptions();
                ListInvitations();
            })
            .catch(function (error) {
                const errorMessage = error.response ? error.response.data.message : "Внутреняя ошибка";

                dispatch({
                    type: INVITATIONS_ACCEPT_ERROR,
                    payload: errorMessage
                })
            });
    }
}