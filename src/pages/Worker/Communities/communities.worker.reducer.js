import { ACTIVECOMMUNITIES_LIST_REQUEST, ACTIVECOMMUNITIES_LIST_SUCCESS, ACTIVECOMMUNITIES_LIST_ERROR,
    ARCHIVECOMMUNITIES_LIST_REQUEST, ARCHIVECOMMUNITIES_LIST_SUCCESS, ARCHIVECOMMUNITIES_LIST_ERROR } from './communities.worker.types';

const INITITAL_STATE = {
    activeCommunities: [],
    archiveCommunities: [],
    error: false,
    errorText: ""
}
    
const communitiesWorkerReducer = (state = INITITAL_STATE, action) => {
    switch (action.type) {
        case ACTIVECOMMUNITIES_LIST_REQUEST:
            return {
                ...state,
            };
        case ACTIVECOMMUNITIES_LIST_SUCCESS:
            return {
                ...state,
                activeCommunities: action.payload
            };
        case ACTIVECOMMUNITIES_LIST_ERROR:
            return {
                ...state,
                error: true,
                errorText: action.payload
            };
        case ARCHIVECOMMUNITIES_LIST_REQUEST:
            return {
                ...state,
            };
        case ARCHIVECOMMUNITIES_LIST_SUCCESS:
            return {
                ...state,
                archiveCommunities: action.payload
            };
        case ARCHIVECOMMUNITIES_LIST_ERROR:
            return {
                ...state,
                error: true,
                errorText: action.payload
            };
        default:
            return state;
    }
}

export default communitiesWorkerReducer;