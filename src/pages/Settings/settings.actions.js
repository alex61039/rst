import axios from 'axios';
import { config } from './../../config';
import { store } from 'react-notifications-component';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
    SETTINGS_PERSONAL_DETAILS_REQUEST, SETTINGS_PERSONAL_DETAILS_SUCCESS, SETTINGS_PERSONAL_DETAILS_ERROR,
    SETTINGS_CHILDREN_DETAILS_REQUEST, SETTINGS_CHILDREN_DETAILS_SUCCESS, SETTINGS_CHILDREN_DETAILS_ERROR,
    SETTINGS_PERSONAL_SUBMIT_REQUEST, SETTINGS_PERSONAL_SUBMIT_SUCCESS, SETTINGS_PERSONAL_SUBMIT_ERROR,
    SETTINGS_PERSONAL_ROLE_REQUEST, SETTINGS_PERSONAL_ROLE_SUCCESS, SETTINGS_PERSONAL_ROLE_ERROR,
    SETTINGS_UPDATE_ROLE_REQUEST, SETTINGS_UPDATE_ROLE_SUCCESS, SETTINGS_UPDATE_ROLE_ERROR,
    SETTINGS_CHANGE_DATA_FIELD, SETTINGS_CHANGE_ROLE_FIELD, SETTINGS_CHANGE_CHILD_FIELD,
    SETTINGS_ADD_CHILD_REQUEST, SETTINGS_ADD_CHILD_SUCCESS, SETTINGS_ADD_CHILD_ERROR
} from './settings.types';

export function SettingsEditGet() {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_PERSONAL_DETAILS_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.profileEditGet)
            .then(function (response) {
                dispatch({
                    type: SETTINGS_PERSONAL_DETAILS_SUCCESS,
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
                    type: SETTINGS_PERSONAL_DETAILS_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function SettingsListRoles() {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_PERSONAL_ROLE_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.settingsRoleList)
            .then(function (response) {
                dispatch({
                    type: SETTINGS_PERSONAL_ROLE_SUCCESS,
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
                    type: SETTINGS_PERSONAL_ROLE_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function SettingsEditSubmit(data) {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_PERSONAL_SUBMIT_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.profileEditPost, data)
            .then(function (response) {
                dispatch({
                    type: SETTINGS_PERSONAL_SUBMIT_SUCCESS,
                    payload: response.data
                })
                store.addNotification({
                    title: "Успешно",
                    message: 'Данные сохранены',
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
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
                    type: SETTINGS_PERSONAL_SUBMIT_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function SubmitAddChild(data) {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_ADD_CHILD_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.childrenAdd, data)
            .then(function (response) {
                dispatch({
                    type: SETTINGS_ADD_CHILD_SUCCESS,
                    payload: response.data
                })
                store.addNotification({
                    title: "Успешно",
                    message: 'Данные сохранены',
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
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
                    type: SETTINGS_ADD_CHILD_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function SettingsSubmitRole(data) {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_UPDATE_ROLE_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.settingsRoleUpdate, data)
            .then(function (response) {
                dispatch({
                    type: SETTINGS_UPDATE_ROLE_SUCCESS,
                    payload: response.data
                })
                store.addNotification({
                    title: "Успешно",
                    message: 'Данные сохранены',
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
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
                    type: SETTINGS_UPDATE_ROLE_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function SettingsChildrenGet() {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_CHILDREN_DETAILS_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.childrenList)
            .then(function (response) {
                dispatch({
                    type: SETTINGS_CHILDREN_DETAILS_SUCCESS,
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
                    type: SETTINGS_CHILDREN_DETAILS_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function SettingsChangeDataField(field, value) {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_CHANGE_DATA_FIELD,
            payload: {
                field,
                value
            }
        })
    }
}

export function SettingsChangeRoleField(field, value) {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_CHANGE_ROLE_FIELD,
            payload: {
                field,
                value
            }
        })
    }
}

export function SettingsChangeChildField(field, value) {
    return (dispatch) => {
        dispatch({
            type: SETTINGS_CHANGE_CHILD_FIELD,
            payload: {
                field,
                value
            }
        })
    }
}