import {
    DICTIONARY_CITY_REQUEST, DICTIONARY_CITY_SUCCESS, DICTIONARY_CITY_ERROR,
    DICTIONARY_DISTRICT_REQUEST, DICTIONARY_DISTRICT_SUCCESS, DICTIONARY_DISTRICT_ERROR,
    DICTIONARY_MUNICIPAL_REQUEST, DICTIONARY_MUNICIPAL_SUCCESS, DICTIONARY_MUNICIPAL_ERROR,
    DICTIONARY_CAREER_DIRECTION_REQUEST, DICTIONARY_CAREER_DIRECTION_SUCCESS, DICTIONARY_CAREER_DIRECTION_ERROR
} from './dictionary.types';

const INITIAL_STATE = {
    cities: [],
    dictionaries: [],
    districts: [],
    careerDirections: [],
    fetchingCities: false,
    fetching: false,
    error: false,
    errorText: "",
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DICTIONARY_CITY_REQUEST:
            return {
                ...state,
                fetchingCities: true
            };
        case DICTIONARY_CITY_SUCCESS:
            return {
                ...state,
                fetchingCities: false,
                cities: action.payload
            };
        case DICTIONARY_CITY_ERROR:
            return {
                ...state,
                fetchingCities: false,
                error: true,
                errorText: action.payload
            };
        case DICTIONARY_DISTRICT_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case DICTIONARY_DISTRICT_SUCCESS:
            return {
                ...state,
                fetching: false,
                dictionaries: action.payload
            };
        case DICTIONARY_DISTRICT_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case DICTIONARY_MUNICIPAL_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case DICTIONARY_MUNICIPAL_SUCCESS:
            return {
                ...state,
                fetching: false,
                districts: action.payload
            };
        case DICTIONARY_MUNICIPAL_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case DICTIONARY_CAREER_DIRECTION_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case DICTIONARY_CAREER_DIRECTION_SUCCESS:
            return {
                ...state,
                fetching: false,
                careerDirections: action.payload
            };
        case DICTIONARY_CAREER_DIRECTION_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        default:
            return state;
    }
}

export default reducer;