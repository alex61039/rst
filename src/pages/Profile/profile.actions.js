import axios from 'axios';
import { config } from './../../config';
import { store } from 'react-notifications-component';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
    PROFILE_DETAILS_REQUEST, PROFILE_DETAILS_SUCCESS, PROFILE_DETAILS_ERROR,
    PROFILE_UPLOAD_SUCCESS, PROFILE_UPLOAD_REQUEST, PROFILE_UPLOAD_ERROR, PROFILE_CLICK_HINT, PROFILE_CLICK_ROLE,
    PROFILE_CHANGE_DATA_FIELD
} from './profile.types';

export function getProfileDetails() {
    return (dispatch) => {
        dispatch({
            type: PROFILE_DETAILS_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.profileDetails)
            .then(function (response) {
                dispatch({
                    type: PROFILE_DETAILS_SUCCESS,
                    payload: response.data
                })
            })
            .catch(function (error) {
                let errorMessage = error.response ? error.response.data.message : "Внутреняя ошибка"
                store.addNotification({
                    title: "Ошибка",
                    message: errorMessage,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
                dispatch(hideLoading())
                dispatch({
                    type: PROFILE_DETAILS_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function uploadPhoto(file) {
    return (dispatch) => {
        dispatch({
            type: PROFILE_UPLOAD_REQUEST
        });

        let form = new FormData();
        form.append('fileName', file.name)
        form.append('image', file)

        axios.post(config.apiUrl + config.methods.profileUpload, form)
            .then(function (response) {
                dispatch({
                    type: PROFILE_UPLOAD_SUCCESS,
                    payload: response.data
                })
                //window.location.href = '/forgotsuccess?email=' + email;
            })
            .catch(function (error) {
                let errorMessage = error.response ? error.response.data.message : "Внутреняя ошибка"
                store.addNotification({
                    title: "Ошибка",
                    message: errorMessage,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
                dispatch(hideLoading())

                dispatch({
                    type: PROFILE_UPLOAD_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function ProfileHintHide() {
    return (dispatch) => {
        dispatch({
            type: PROFILE_CLICK_HINT
        });

        axios.get(config.apiUrl + config.methods.profileHideHint);
    }
}

export function ProfileChoseRole() {
    return (dispatch) => {
        dispatch({
            type: PROFILE_CLICK_ROLE
        });

        axios.get(config.apiUrl + config.methods.profileRoleSelect);
    }
}

export function ChangeDataField(field, value) {
    return (dispatch) => {
        dispatch({
            type: PROFILE_CHANGE_DATA_FIELD,
            payload: {
                field,
                value
            }
        })
    }
}