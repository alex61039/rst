import axios from 'axios';
import { config } from './../../config';
import { push } from "react-router-redux"
import {
    AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR, AUTH_INIT, AUTH_LOGOUT,
    AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_ERROR, AUTH_PROFILE_CHANGE,
    AUTH_FORGOT_PASSWORD_REQUEST, AUTH_FORGOT_PASSWORD_SUCCESS, AUTH_FORGOT_PASSWORD_ERROR,
    AUTH_RESET_PASSWORD_REQUEST, AUTH_RESET_PASSWORD_SUCCESS, AUTH_RESET_PASSWORD_ERROR,
    AUTH_CONFIRM_EMAIL_REQUEST, AUTH_CONFIRM_EMAIL_SUCCESS, AUTH_CONFIRM_EMAIL_ERROR,
    AUTH_CHANGE_PASSWORD_REQUEST, AUTH_CHANGE_PASSWORD_SUCCESS, AUTH_CHANGE_PASSWORD_ERROR
} from './auth.types';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { store } from 'react-notifications-component';

export function loginAction(email, password) {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGIN_REQUEST,
            payload: {}
        })

        //vladimir.rakhimov@gmail.com Summer2020!
        var data = JSON.stringify({ "username": email, "password": password });

        var configuration = {
            method: 'post',
            url: config.apiUrl + config.methods.login,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(configuration)
            .then(function (response) {

                dispatch({
                    type: AUTH_LOGIN_SUCCESS,
                    payload: response.data
                })

                window.location.href = '/profile'
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
                    type: AUTH_LOGIN_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function registerAction(email, password, confirmPassword, name, surname, phone, cityId, districtId, municipalUnionId) {
    return (dispatch) => {
        dispatch({
            type: AUTH_REGISTER_REQUEST,
            payload: {}
        })

        axios.post(config.apiUrl + config.methods.register, {
            Username: email,
            Password: password,
            ConfirmPassword: confirmPassword,
            Name: name,
            Surname: surname,
            Phone: phone,
            CityId: cityId,
            DistrictId: districtId,
            MunicipalUnionId: municipalUnionId,
            Email: email
        })
            .then(function (response) {
                dispatch({
                    type: AUTH_REGISTER_SUCCESS,
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
                    type: AUTH_REGISTER_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function ForgotPassword(email) {
    return (dispatch) => {
        dispatch({
            type: AUTH_FORGOT_PASSWORD_REQUEST
        });

        axios.post(config.apiUrl + config.methods.forgotPassword, { Email: email })
            .then(function (response) {
                dispatch({
                    type: AUTH_FORGOT_PASSWORD_SUCCESS,
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
                    type: AUTH_FORGOT_PASSWORD_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function ResetPassword(userId, code, password) {
    return (dispatch) => {
        dispatch({
            type: AUTH_RESET_PASSWORD_REQUEST
        });

        axios.post(config.apiUrl + config.methods.resetPassword, {
            UserId: userId,
            Password: password,
            Code: code
        }).then(function (response) {
            dispatch({
                type: AUTH_RESET_PASSWORD_SUCCESS,
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
                    type: AUTH_RESET_PASSWORD_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function ChangePassword(userId, oldPassword, password, confirmPassword) {
    return (dispatch) => {
        dispatch({
            type: AUTH_CHANGE_PASSWORD_REQUEST
        });

        axios.post(config.apiUrl + config.methods.changePassword, {
            UserId: userId,
            Password: password,
            OldPassword: oldPassword,
            ConfirmPassword: confirmPassword
        }).then(function (response) {
            dispatch({
                type: AUTH_CHANGE_PASSWORD_SUCCESS,
                payload: response.data
            })
            store.addNotification({
                title: "Успешно",
                message: 'Пароль изменен',
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
                    type: AUTH_CHANGE_PASSWORD_ERROR,
                    payload: errorMessage
                })
            });
    }
}

export function AuthInit() {
    return (dispatch) => {

        dispatch({
            type: AUTH_INIT
        });
    }
}

export function ProfileLogout(backUrl) {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGOUT,
            payload: { backUrl }
        });

        dispatch(push("/auth"));
    }
}

export function ProfileGoAuth(backUrl) {
    return (dispatch) => {
        if (backUrl === "/auth") backUrl = null;

        dispatch({
            type: AUTH_PROFILE_CHANGE,
            payload: {
                name: "backUrl",
                value: backUrl
            }
        });

        dispatch(push("/auth"));
    }
}

export function ConfirmEmail(userId, code) {
    return (dispatch) => {
        dispatch({
            type: AUTH_CONFIRM_EMAIL_REQUEST
        });

        axios.post(config.apiUrl + config.methods.confirmEmail, {
            UserId: userId,
            Code: code
        }).then(function (response) {
            dispatch({
                type: AUTH_CONFIRM_EMAIL_SUCCESS,
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
                    type: AUTH_CONFIRM_EMAIL_ERROR,
                    payload: errorMessage
                })
            });
    }
}