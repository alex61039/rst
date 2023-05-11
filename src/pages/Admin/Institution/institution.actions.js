import axios from 'axios';
import { push } from "react-router-redux"
import { config } from './../../../config';
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
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { store } from 'react-notifications-component';

export function GetInstitution(id) {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_GET_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.institutionGet, {
            params: {
                id: id
            }
        })
            .then(function (response) {
                dispatch({
                    type: INSTITUTION_GET_SUCCESS,
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
                    type: INSTITUTION_GET_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function ListEmployees(id) {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_LIST_EMPLOYEES_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.employeeList, {
            params: {
                structureId: id
            }
        })
            .then(function (response) {
                dispatch({
                    type: INSTITUTION_LIST_EMPLOYEES_SUCCESS,
                    payload: response.data
                })
            })
            .catch(function (error) {

                let errorMessage = error.response ? error.response.data.message : "Внутреняя ошибка"

                dispatch(hideLoading())

                dispatch({
                    type: INSTITUTION_LIST_EMPLOYEES_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function ListInstitutions(id) {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_LIST_REQUEST,
            payload: {}
        })

        axios.get(config.apiUrl + config.methods.institutionList, {
            params: {
                structureId: id
            }
        })
            .then(function (response) {
                dispatch({
                    type: INSTITUTION_LIST_SUCCESS,
                    payload: response.data
                })
            })
            .catch(function (error) {

                let errorMessage = error.response ? error.response.data.message : "Внутреняя ошибка"

                dispatch(hideLoading())

                dispatch({
                    type: INSTITUTION_LIST_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function AddInstitution(data) {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_ADD_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.institutionAdd, data)
            .then(function (response) {
                dispatch({
                    type: INSTITUTION_ADD_SUCCESS,
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
                let errorMessage = error.response && error.response.data.message ? error.response.data.message : "Внутреняя ошибка"
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
                    type: INSTITUTION_ADD_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function AddAdmin(id, user, employeeRole, position = "") {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_ADD_ADMIN_REQUEST,
            payload: {}
        })

        let data = {
            InstitutionId: id,
            User: user,
            Position: position,
            EmployeeRole: employeeRole
        }

        axios.post(config.apiUrl + config.methods.employeeAdd, data)
            .then(function (response) {
                dispatch({
                    type: INSTITUTION_ADD_ADMIN_SUCCESS,
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
                let errorMessage = error.response && error.response.data.message ? error.response.data.message : "Внутреняя ошибка"
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
                    type: INSTITUTION_ADD_ADMIN_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function AddEmployee(id, user, employeeRole, position = "") {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_ADD_EMPLOYEE_REQUEST,
            payload: {}
        })

        let data = {
            InstitutionId: id,
            User: user,
            Position: position,
            EmployeeRole: employeeRole
        }

        axios.post(config.apiUrl + config.methods.employeeAdd, data)
            .then(function (response) {
                dispatch({
                    type: INSTITUTION_ADD_EMPLOYEE_SUCCESS,
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
                let errorMessage = error.response && error.response.data.message ? error.response.data.message : "Внутреняя ошибка"
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
                    type: INSTITUTION_ADD_EMPLOYEE_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function UpdateEmployee(id, user, employeeRole, position = "") {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_UPDATE_EMPLOYEE_REQUEST,
            payload: {}
        })

        let data = {
            InstitutionId: id,
            User: user,
            Position: position,
            EmployeeRole: employeeRole
        }

        axios.post(config.apiUrl + config.methods.employeeUpdate, data)
            .then(function (response) {
                dispatch({
                    type: INSTITUTION_UPDATE_EMPLOYEE_SUCCESS,
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
                let errorMessage = error.response && error.response.data.message ? error.response.data.message : "Внутреняя ошибка"
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
                    type: INSTITUTION_UPDATE_EMPLOYEE_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function DeleteInstitution(id) {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_DELETE_REQUEST,
            payload: {}
        })

        axios.delete(config.apiUrl + config.methods.institutionDelete, {
            params: {
                id
            }
        })
            .then(function (response) {
                dispatch({
                    type: INSTITUTION_DELETE_SUCCESS,
                    payload: id
                })
                store.addNotification({
                    title: "Успешно",
                    message: 'Учреждениие удалено',
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
                window.location.href = '/structure'
            })
            .catch(function (error) {
                let errorMessage = error.response && error.response.data.message ? error.response.data.message : "Внутреняя ошибка"
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
                    type: INSTITUTION_DELETE_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function DeleteEmployee(id, user) {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_DELETE_EMPLOYEE_REQUEST,
            payload: {}
        })

        let data = {
            InstitutionId: id,
            User: user
        }

        axios.post(config.apiUrl + config.methods.employeeDelete, data)
            .then(function (response) {
                dispatch({
                    type: INSTITUTION_DELETE_EMPLOYEE_SUCCESS,
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
                let errorMessage = error.response && error.response.data.message ? error.response.data.message : "Внутреняя ошибка"
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
                    type: INSTITUTION_DELETE_EMPLOYEE_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function EditInstitution(data) {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_EDIT_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.institutionEdit, data)
            .then(function (response) {
                dispatch({
                    type: INSTITUTION_EDIT_SUCCESS,
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
                let errorMessage = error.response && error.response.data.message ? error.response.data.message : "Внутреняя ошибка"
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
                    type: INSTITUTION_EDIT_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function ChangeDataField(field, value) {
    return (dispatch) => {
        dispatch({
            type: INSTITUTION_CHANGE_FIELD,
            payload: {
                field,
                value
            }
        })
    }
}