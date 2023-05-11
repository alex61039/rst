import axios from 'axios';
import { config } from './../../../config';
import {
    STRUCTURE_ADD_REQUEST, STRUCTURE_ADD_SUCCESS, STRUCTURE_ADD_ERROR,
    STRUCTURE_DELETE_REQUEST, STRUCTURE_DELETE_SUCCESS, STRUCTURE_DELETE_ERROR,
    STRUCTURE_EDIT_REQUEST, STRUCTURE_EDIT_SUCCESS, STRUCTURE_EDIT_ERROR,
    STRUCTURE_GET_REQUEST, STRUCTURE_GET_SUCCESS, STRUCTURE_GET_ERROR,
    STRUCTURE_LIST_REQUEST, STRUCTURE_LIST_SUCCESS, STRUCTURE_LIST_ERROR,
    STRUCTURE_CHANGE_FIELD, STRUCTURE_SELECT_PARENT, STRUCTURE_CHANGE_SELECTED,
    STRUCTURE_ADD_INSTITUTION_REQUEST, STRUCTURE_ADD_INSTITUTION_SUCCESS, STRUCTURE_ADD_INSTITUTION_ERROR, STRUCTURE_CHANGE_INSTITUTION
} from './structure.types';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { store } from 'react-notifications-component';

export function ListStuctures(id) {
    return (dispatch) => {
        dispatch({
            type: STRUCTURE_LIST_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.structureList, {
            params: {
                structureId: id
            }
        })
            .then(function (response) {
                dispatch({
                    type: STRUCTURE_LIST_SUCCESS,
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
                    type: STRUCTURE_LIST_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function AddStructure(data) {
    return (dispatch) => {
        dispatch({
            type: STRUCTURE_ADD_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.structureAdd, data)
            .then(function (response) {
                dispatch({
                    type: STRUCTURE_ADD_SUCCESS,
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
                    type: STRUCTURE_ADD_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function AddInstitution(data) {
    return (dispatch) => {
        dispatch({
            type: STRUCTURE_ADD_INSTITUTION_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.institutionAdd, data)
            .then(function (response) {
                dispatch({
                    type: STRUCTURE_ADD_INSTITUTION_SUCCESS,
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
                    type: STRUCTURE_ADD_INSTITUTION_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function DeleteStructure(id) {
    return (dispatch) => {
        dispatch({
            type: STRUCTURE_DELETE_REQUEST,
            payload: {}
        })

        axios.delete(config.apiUrl + config.methods.structureDelete, {
            params: {
                id
            }
        })
            .then(function (response) {
                dispatch({
                    type: STRUCTURE_DELETE_SUCCESS,
                    payload: id
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
                    type: STRUCTURE_DELETE_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function EditStructure(id, name) {
    return (dispatch) => {
        dispatch({
            type: STRUCTURE_EDIT_REQUEST,
            payload: {}
        })

        let data = {
            Id: id,
            Name: name
        }

        axios.post(config.apiUrl + config.methods.structureEdit, data)
            .then(function (response) {
                dispatch({
                    type: STRUCTURE_EDIT_SUCCESS,
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
                    type: STRUCTURE_EDIT_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function ChangeDataField(field, value) {
    return (dispatch) => {
        dispatch({
            type: STRUCTURE_CHANGE_FIELD,
            payload: {
                field,
                value
            }
        })
    }
}

export function SelectParent(field, value) {
    return (dispatch) => {
        dispatch({
            type: STRUCTURE_SELECT_PARENT,
            payload: {
                field,
                value
            }
        })
    }
}

export function ChangeSelectedField(field, value) {
    return (dispatch) => {
        dispatch({
            type: STRUCTURE_CHANGE_SELECTED,
            payload: {
                field,
                value
            }
        })
    }
}

export function ChangeInstitutionField(field, value) {
    return (dispatch) => {
        dispatch({
            type: STRUCTURE_CHANGE_INSTITUTION,
            payload: {
                field,
                value
            }
        })
    }
}