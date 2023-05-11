import axios from 'axios';
import { config } from './../../config';
import {
    DICTIONARY_CITY_REQUEST, DICTIONARY_CITY_SUCCESS, DICTIONARY_CITY_ERROR,
    DICTIONARY_DISTRICT_REQUEST, DICTIONARY_DISTRICT_SUCCESS, DICTIONARY_DISTRICT_ERROR,
    DICTIONARY_MUNICIPAL_REQUEST, DICTIONARY_MUNICIPAL_SUCCESS, DICTIONARY_MUNICIPAL_ERROR,
    DICTIONARY_CAREER_DIRECTION_REQUEST, DICTIONARY_CAREER_DIRECTION_SUCCESS, DICTIONARY_CAREER_DIRECTION_ERROR
} from './dictionary.types';

export function ListCities() {
    return (dispatch) => {
        dispatch({
            type: DICTIONARY_CITY_REQUEST,
            payload: {}
        })

        axios
            .get(config.apiUrl + config.methods.cityList)
            .then(response => {
                dispatch({
                    type: DICTIONARY_CITY_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error, errorText) => {
                dispatch({
                    type: DICTIONARY_CITY_ERROR,
                    payload: errorText
                });
            });
    }
}

export function ListDistricts(id) {
    return (dispatch) => {
        dispatch({
            type: DICTIONARY_DISTRICT_REQUEST,
            payload: {}
        })

        axios
            .get(config.apiUrl + config.methods.districtList, {
                params: {
                    id
                }
            })
            .then(response => {
                dispatch({
                    type: DICTIONARY_DISTRICT_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error, errorText) => {
                dispatch({
                    type: DICTIONARY_DISTRICT_ERROR,
                    payload: errorText
                });
            });
    }
}

export function ListMunicipalUnions(id) {
    return (dispatch) => {
        dispatch({
            type: DICTIONARY_MUNICIPAL_REQUEST,
            payload: {}
        })
        axios
            .get(config.apiUrl + config.methods.municipalUnionList, {
                params: {
                    id
                }
            })
            .then(response => {
                dispatch({
                    type: DICTIONARY_MUNICIPAL_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error, errorText) => {
                dispatch({
                    type: DICTIONARY_MUNICIPAL_ERROR,
                    payload: errorText
                });
            });
    }
}

export function ListCareerDirections() {
    return (dispatch) => {
        dispatch({
            type: DICTIONARY_CAREER_DIRECTION_REQUEST,
            payload: {}
        })
        console.log(config.methods.careerDirectionList)
        axios
            .get(config.apiUrl + config.methods.careerDirectionList)
            .then(response => {
                dispatch({
                    type: DICTIONARY_CAREER_DIRECTION_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error, errorText) => {
                console.log(error)
                dispatch({
                    type: DICTIONARY_CAREER_DIRECTION_ERROR,
                    payload: errorText
                });
            });
    }
}