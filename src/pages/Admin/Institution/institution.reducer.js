import {
    INSTITUTION_ADD_REQUEST, INSTITUTION_ADD_SUCCESS, INSTITUTION_ADD_ERROR,
    INSTITUTION_ADD_ADMIN_REQUEST, INSTITUTION_ADD_ADMIN_SUCCESS, INSTITUTION_ADD_ADMIN_ERROR,
    INSTITUTION_ADD_EMPLOYEE_REQUEST, INSTITUTION_ADD_EMPLOYEE_SUCCESS, INSTITUTION_ADD_EMPLOYEE_ERROR,
    INSTITUTION_DELETE_REQUEST, INSTITUTION_DELETE_SUCCESS, INSTITUTION_DELETE_ERROR,
    INSTITUTION_EDIT_REQUEST, INSTITUTION_EDIT_SUCCESS, INSTITUTION_EDIT_ERROR,
    INSTITUTION_GET_REQUEST, INSTITUTION_GET_SUCCESS, INSTITUTION_GET_ERROR,
    INSTITUTION_LIST_REQUEST, INSTITUTION_LIST_SUCCESS, INSTITUTION_LIST_ERROR,
    INSTITUTION_LIST_EMPLOYEES_REQUEST, INSTITUTION_LIST_EMPLOYEES_SUCCESS, INSTITUTION_LIST_EMPLOYEES_ERROR,
    INSTITUTION_DELETE_EMPLOYEE_REQUEST, INSTITUTION_DELETE_EMPLOYEE_SUCCESS, INSTITUTION_DELETE_EMPLOYEE_ERROR,
    INSTITUTION_UPDATE_EMPLOYEE_REQUEST, INSTITUTION_UPDATE_EMPLOYEE_SUCCESS, INSTITUTION_UPDATE_EMPLOYEE_ERROR,
    INSTITUTION_CHANGE_FIELD
} from './institution.types';

const INITIAL_STATE = {
    data: {
        id: 0,
        structureId: 0,
        name: "",
        description: "",
        cityId: 0,
        districtId: 0,
        municipalUnionId: 0,
        address: "",
        educationId: 0,
        email: "",
        adminUserId: ""
    },
    employees: [],
    institutions: [],
    fetching: false,
    error: false,
    errorText: "",
}

const institutionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INSTITUTION_ADD_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case INSTITUTION_ADD_SUCCESS:
            return {
                ...state,
                fetching: false,
                institutions: action.payload
            };
        case INSTITUTION_ADD_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case INSTITUTION_GET_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case INSTITUTION_GET_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload
            };
        case INSTITUTION_GET_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case INSTITUTION_ADD_ADMIN_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case INSTITUTION_ADD_ADMIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload
            };
        case INSTITUTION_ADD_ADMIN_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case INSTITUTION_ADD_EMPLOYEE_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case INSTITUTION_ADD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                fetching: false,
                employees: action.payload
            };
        case INSTITUTION_ADD_EMPLOYEE_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case INSTITUTION_UPDATE_EMPLOYEE_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case INSTITUTION_UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload
            };
        case INSTITUTION_UPDATE_EMPLOYEE_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case INSTITUTION_DELETE_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case INSTITUTION_DELETE_SUCCESS:
            let data = state.institutions;
            let indexOf = data.findIndex((f) => f.id === action.payload);

            if (indexOf !== -1) {
                data.children.splice(indexOf, 1)
            }

            return {
                ...state,
                institutions: data
            }
        case INSTITUTION_DELETE_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case INSTITUTION_DELETE_EMPLOYEE_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case INSTITUTION_DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                fetching: false,
                employees: action.payload
            };
        case INSTITUTION_DELETE_EMPLOYEE_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case INSTITUTION_EDIT_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case INSTITUTION_EDIT_SUCCESS:
            return {
                ...state,
                fetching: false
            };
        case INSTITUTION_EDIT_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case INSTITUTION_LIST_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case INSTITUTION_LIST_SUCCESS:
            return {
                ...state,
                fetching: false,
                institutions: action.payload,
            };
        case INSTITUTION_LIST_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case INSTITUTION_LIST_EMPLOYEES_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case INSTITUTION_LIST_EMPLOYEES_SUCCESS:
            return {
                ...state,
                fetching: false,
                employees: action.payload,
            };
        case INSTITUTION_LIST_EMPLOYEES_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case INSTITUTION_CHANGE_FIELD:
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

export default institutionReducer;