import { SUBSCRIPTIONS_LIST_REQUEST, SUBSCRIPTIONS_LIST_SUCCESS, SUBSCRIPTIONS_LIST_ERROR,
    SUBSCRIPTIONS_UNSUBSCRIBE_REQUEST, SUBSCRIPTIONS_UNSUBSCRIBE_SUCCESS, SUBSCRIPTIONS_UNSUBSCRIBE_ERROR,
    INVITATIONS_LIST_REQUEST, INVITATIONS_LIST_SUCCESS, INVITATIONS_LIST_ERROR,
    INVITATIONS_ACCEPT_REQUEST, INVITATIONS_ACCEPT_SUCCESS, INVITATIONS_ACCEPT_ERROR } from './communities.types';

const INITITAL_STATE = {
    subscriptions: [],
    invitations: [],
    error: false,
    errorText: ""
}

const communitiesReducer = (state = INITITAL_STATE, action) => {
    switch (action.type) {
        case SUBSCRIPTIONS_LIST_REQUEST:
            return {
                ...state,
            };
        case SUBSCRIPTIONS_LIST_SUCCESS:
            return {
                ...state,
                subscriptions: action.payload
            };
        case SUBSCRIPTIONS_LIST_ERROR:
            return {
                ...state,
                error: true,
                errorText: action.payload
            };
        case SUBSCRIPTIONS_UNSUBSCRIBE_REQUEST:
            return {
                ...state,
            };
        case SUBSCRIPTIONS_UNSUBSCRIBE_SUCCESS:
            return {
                ...state,
            };
        case SUBSCRIPTIONS_UNSUBSCRIBE_ERROR:
            return {
                ...state,
                error: true,
                errorText: action.payload
            };
        case INVITATIONS_LIST_REQUEST:
            return {
                ...state,
            };
        case INVITATIONS_LIST_SUCCESS:
            return {
                ...state,
                invitations: action.payload
            };
        case INVITATIONS_LIST_ERROR:
            return {
                ...state,
                error: true,
                errorText: action.payload
            };
        case INVITATIONS_ACCEPT_REQUEST:
            return {
                ...state,
            };
        case INVITATIONS_ACCEPT_SUCCESS:
            return {
                ...state,
            };
        case INVITATIONS_ACCEPT_ERROR:
            return {
                ...state,
                error: true,
                errorText: action.payload
            };
        default: return state;
    }
}

export default communitiesReducer;