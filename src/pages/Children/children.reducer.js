import {
    CHILDREN_ADD_REQUEST, CHILDREN_ADD_SUCCESS, CHILDREN_ADD_ERROR,
    CHILDREN_DELETE_REQUEST, CHILDREN_DELETE_SUCCESS, CHILDREN_DELETE_ERROR,
    CHILDREN_LIST_REQUEST, CHILDREN_LIST_SUCCESS, CHILDREN_LIST_ERROR, CHILDREN_CHANGE_DATA_FIELD,
    CHILDREN_EDIT_REQUEST, CHILDREN_EDIT_SUCCESS, CHILDREN_EDIT_ERROR,
    CHILDREN_GET_REQUEST, CHILDREN_GET_SUCCESS, CHILDREN_GET_ERROR, CHILDREN_RESET_DATA
} from './children.types';

const INITIAL_STATE = {
    data: {
        id: 0,
        name: "",
        surname: "",
        secondName: "",
        birthDay: "",
        sex: 0,
        careers: [],
        personalNumber: ""
    },
    list: [],
    fetching: false,
    error: false,
    errorText: ""
}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHILDREN_ADD_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case CHILDREN_ADD_SUCCESS:
            return {
                ...state,
                fetching: false,
                list: action.payload,
            };
        case CHILDREN_ADD_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case CHILDREN_EDIT_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case CHILDREN_EDIT_SUCCESS:
            return {
                ...state,
                fetching: false,
                list: action.payload,
            };
        case CHILDREN_EDIT_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case CHILDREN_LIST_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case CHILDREN_LIST_SUCCESS:
            return {
                ...state,
                fetching: false,
                list: action.payload,
            };
        case CHILDREN_LIST_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case CHILDREN_GET_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case CHILDREN_GET_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload,
            };
        case CHILDREN_GET_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case CHILDREN_DELETE_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case CHILDREN_DELETE_SUCCESS:
            let data = state.list;
            let indexOf = data.findIndex((f) => f.id === action.payload);

            if (indexOf !== -1) {
                data.splice(indexOf, 1)
            }

            return {
                ...state,
                list: data
            }
        case CHILDREN_DELETE_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case CHILDREN_CHANGE_DATA_FIELD:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.field]: action.payload.value
                }
            }
        case CHILDREN_RESET_DATA:
            return {
                ...state,
                data: INITIAL_STATE.data
            }
        default: return state;
    }
}

export default profileReducer;