import {
    STRUCTURE_ADD_REQUEST, STRUCTURE_ADD_SUCCESS, STRUCTURE_ADD_ERROR,
    STRUCTURE_DELETE_REQUEST, STRUCTURE_DELETE_SUCCESS, STRUCTURE_DELETE_ERROR,
    STRUCTURE_EDIT_REQUEST, STRUCTURE_EDIT_SUCCESS, STRUCTURE_EDIT_ERROR,
    STRUCTURE_GET_REQUEST, STRUCTURE_GET_SUCCESS, STRUCTURE_GET_ERROR,
    STRUCTURE_LIST_REQUEST, STRUCTURE_LIST_SUCCESS, STRUCTURE_LIST_ERROR,
    STRUCTURE_CHANGE_FIELD, STRUCTURE_SELECT_PARENT, STRUCTURE_CHANGE_SELECTED,
    STRUCTURE_ADD_INSTITUTION_REQUEST, STRUCTURE_ADD_INSTITUTION_SUCCESS, STRUCTURE_ADD_INSTITUTION_ERROR, STRUCTURE_CHANGE_INSTITUTION
} from './structure.types';

const INITIAL_STATE = {
    selectedStructures: [],
    structures: [],
    structure: {
        parentId: 0,
        name: ""
    },
    institution: {
        id: 0,
        structureId: 0,
        name: "",
        description: "",
        cityId: 1,
        districtId: 0,
        municipalUnionId: 0,
        address: "",
        educationId: 0,
        email: "",
        adminUserId: ""
    },
    deleteFailed: false,
    fetching: false,
    error: false,
    errorText: "",
}

const structureReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STRUCTURE_ADD_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case STRUCTURE_ADD_SUCCESS:
            return {
                ...state,
                fetching: false,
                structures: action.payload
            };
        case STRUCTURE_ADD_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case STRUCTURE_DELETE_REQUEST:
            return {
                ...state,
                fetching: true,
                deleteFailed: false
            };
        case STRUCTURE_DELETE_SUCCESS:
            let data = state.structures;
            let indexOf = data.children.findIndex((f) => f.id === action.payload);

            if (indexOf !== -1) {
                data.children.splice(indexOf, 1)
            }

            return {
                ...state,
                structures: data
            }
        case STRUCTURE_DELETE_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload,
                deleteFailed: true
            };
        case STRUCTURE_EDIT_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case STRUCTURE_EDIT_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                fetching: false,
                structures: action.payload,
            };
        case STRUCTURE_EDIT_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case STRUCTURE_LIST_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case STRUCTURE_LIST_SUCCESS:
            return {
                ...state,
                fetching: false,
                structures: action.payload,
            };
        case STRUCTURE_LIST_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case STRUCTURE_CHANGE_FIELD:
            return {
                ...state,
                structure: {
                    ...state.structure,
                    [action.payload.field]: action.payload.value
                }
            }
        case STRUCTURE_CHANGE_SELECTED:
            console.log(action.payload.value)
            return {
                ...state,
                selectedStructures: action.payload.value
            }
        case STRUCTURE_CHANGE_INSTITUTION:
            return {
                ...state,
                institution: {
                    ...state.institution,
                    [action.payload.field]: action.payload.value
                }
            }
        case STRUCTURE_ADD_INSTITUTION_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case STRUCTURE_ADD_INSTITUTION_SUCCESS:
            return {
                ...state,
                fetching: false,
                structures: action.payload
            };
        case STRUCTURE_ADD_INSTITUTION_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        default: return state;
    }
}

export default structureReducer;