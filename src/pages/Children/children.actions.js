import axios from 'axios';
import { config } from './../../config';
import { store } from 'react-notifications-component';
import {
    CHILDREN_ADD_REQUEST, CHILDREN_ADD_SUCCESS, CHILDREN_ADD_ERROR,
    CHILDREN_DELETE_REQUEST, CHILDREN_DELETE_SUCCESS, CHILDREN_DELETE_ERROR,
    CHILDREN_LIST_REQUEST, CHILDREN_LIST_SUCCESS, CHILDREN_LIST_ERROR, CHILDREN_CHANGE_DATA_FIELD,
    CHILDREN_EDIT_REQUEST, CHILDREN_EDIT_SUCCESS, CHILDREN_EDIT_ERROR,
    CHILDREN_GET_REQUEST, CHILDREN_GET_SUCCESS, CHILDREN_GET_ERROR, CHILDREN_RESET_DATA
} from './children.types';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function ListChildren() {
    return (dispatch) => {
        dispatch({
            type: CHILDREN_LIST_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.childrenList)
            .then(function (response) {
                dispatch({
                    type: CHILDREN_LIST_SUCCESS,
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
                    type: CHILDREN_LIST_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function GetChildren(id) {
    return (dispatch) => {
        dispatch({
            type: CHILDREN_GET_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.childrenGet, {
            params: {
                id: id
            }
        })
            .then(function (response) {
                dispatch({
                    type: CHILDREN_GET_SUCCESS,
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
                    type: CHILDREN_GET_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function AddChild(data) {
    return (dispatch) => {
        dispatch({
            type: CHILDREN_ADD_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.childrenAdd, data)
            .then(function (response) {
                dispatch({
                    type: CHILDREN_ADD_SUCCESS,
                    payload: response.data
                })
                store.addNotification({
                    title: "Успешно",
                    message: 'Данные добавлены',
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
                    type: CHILDREN_ADD_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function EditChild(data) {
    return (dispatch) => {
        dispatch({
            type: CHILDREN_EDIT_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.childrenEdit, data)
            .then(function (response) {
                dispatch({
                    type: CHILDREN_EDIT_SUCCESS,
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
                    type: CHILDREN_EDIT_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function DeleteChild(id) {
    return (dispatch) => {
        dispatch({
            type: CHILDREN_DELETE_REQUEST,
            payload: {}
        })

        axios.delete(config.apiUrl + config.methods.childrenDelete, {
            params: {
                id
            }
        })
            .then(function (response) {
                dispatch({
                    type: CHILDREN_DELETE_SUCCESS,
                    payload: id
                })
                store.addNotification({
                    title: "Успешно",
                    message: 'Данные удалены',
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
                    type: CHILDREN_DELETE_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function ChangeDataField(field, value) {
    return (dispatch) => {
        dispatch({
            type: CHILDREN_CHANGE_DATA_FIELD,
            payload: {
                field,
                value
            }
        })
    }
}

export function ResetChildData() {
    return (dispatch) => {
        dispatch({
            type: CHILDREN_RESET_DATA,
            payload: ''
        })
    }
}