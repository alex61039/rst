import {
    PROFILE_DETAILS_REQUEST, PROFILE_DETAILS_SUCCESS, PROFILE_DETAILS_ERROR,
    PROFILE_UPLOAD_REQUEST, PROFILE_UPLOAD_SUCCESS, PROFILE_UPLOAD_ERROR, PROFILE_CLICK_HINT, PROFILE_CLICK_ROLE,
    PROFILE_CHANGE_DATA_FIELD
} from './profile.types';

const INITIAL_STATE = {
    data: {
        city: "",
        name: "",
        surname: "",
        mainPhoto: "",
        emailConfirmed: false,
        isFirstLogin: false,
        isDisplayHint: false,
        children: []
    },
    fetching: false,
    error: false,
    errorText: ""
}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROFILE_DETAILS_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case PROFILE_DETAILS_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload,
            };
        case PROFILE_DETAILS_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case PROFILE_UPLOAD_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case PROFILE_UPLOAD_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload,
            };
        case PROFILE_UPLOAD_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case PROFILE_CLICK_HINT:
            return {
                ...state,
                isDisplayHint: false
            };
        case PROFILE_CLICK_ROLE:
            return {
                ...state,
                isFirstLogin: false
            };
        case PROFILE_CHANGE_DATA_FIELD:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.field]: action.payload.value
                }
            }
        default: return state;
    }
}

export default profileReducer;