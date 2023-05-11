import {
    SETTINGS_PERSONAL_DETAILS_REQUEST, SETTINGS_PERSONAL_DETAILS_SUCCESS, SETTINGS_PERSONAL_DETAILS_ERROR,
    SETTINGS_CHILDREN_DETAILS_REQUEST, SETTINGS_CHILDREN_DETAILS_SUCCESS, SETTINGS_CHILDREN_DETAILS_ERROR,
    SETTINGS_PERSONAL_SUBMIT_REQUEST, SETTINGS_PERSONAL_SUBMIT_SUCCESS, SETTINGS_PERSONAL_SUBMIT_ERROR,
    SETTINGS_PERSONAL_ROLE_REQUEST, SETTINGS_PERSONAL_ROLE_SUCCESS, SETTINGS_PERSONAL_ROLE_ERROR,
    SETTINGS_UPDATE_ROLE_REQUEST, SETTINGS_UPDATE_ROLE_SUCCESS, SETTINGS_UPDATE_ROLE_ERROR,
    SETTINGS_CHANGE_DATA_FIELD, SETTINGS_CHANGE_ROLE_FIELD, SETTINGS_CHANGE_CHILD_FIELD,
    SETTINGS_ADD_CHILD_REQUEST, SETTINGS_ADD_CHILD_SUCCESS, SETTINGS_ADD_CHILD_ERROR
} from './settings.types';

const INITIAL_STATE = {
    data: {
        personalNumber: "",
        cityId: 0,
        districtId: 0,
        municipalUnionId: 0,
        name: "",
        surname: "",
        mainPhoto: "",
        email: "",
        phone: "",
    },
    child: {
        id: 0,
        name: "",
        surname: "",
        secondName: "",
        birthDay: "",
        sex: 0,
        careers: [],
        personalNumber: ""
    },
    children: [],
    role: {
        isParentRole: false,
        isEmployeeRole: false,
        isSelfEmployeeRole: false
    },
    fetching: false,
    error: false,
    errorText: ""
}

const settingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETTINGS_PERSONAL_DETAILS_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case SETTINGS_PERSONAL_DETAILS_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload,
            };
        case SETTINGS_PERSONAL_DETAILS_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case SETTINGS_PERSONAL_SUBMIT_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case SETTINGS_PERSONAL_SUBMIT_SUCCESS:
            return {
                ...state,
                fetching: false
            };
        case SETTINGS_PERSONAL_SUBMIT_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case SETTINGS_CHILDREN_DETAILS_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case SETTINGS_CHILDREN_DETAILS_SUCCESS:
            return {
                ...state,
                fetching: false,
                children: action.payload,
            };
        case SETTINGS_CHILDREN_DETAILS_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case SETTINGS_ADD_CHILD_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case SETTINGS_ADD_CHILD_SUCCESS:
            return {
                ...state,
                fetching: false,
                children: action.payload,
            };
        case SETTINGS_ADD_CHILD_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case SETTINGS_CHANGE_DATA_FIELD:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.field]: action.payload.value
                }
            }
        case SETTINGS_CHANGE_ROLE_FIELD:
            return {
                ...state,
                role: {
                    ...state.role,
                    [action.payload.field]: action.payload.value
                }
            }
        case SETTINGS_CHANGE_CHILD_FIELD:
            return {
                ...state,
                child: {
                    ...state.child,
                    [action.payload.field]: action.payload.value
                }
            }
        case SETTINGS_PERSONAL_ROLE_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case SETTINGS_PERSONAL_ROLE_SUCCESS:
            return {
                ...state,
                fetching: false,
                role: action.payload,
            };
        case SETTINGS_PERSONAL_ROLE_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case SETTINGS_UPDATE_ROLE_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case SETTINGS_UPDATE_ROLE_SUCCESS:
            return {
                ...state,
                fetching: false
            };
        case SETTINGS_UPDATE_ROLE_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        default: return state;
    }
}

export default settingsReducer;