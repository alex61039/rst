import Cookies from 'cookies-js';
import axios from 'axios';
import {
    AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR, AUTH_INIT, AUTH_LOGOUT, AUTH_PROFILE_CHANGE,
    AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_ERROR,
    AUTH_FORGOT_PASSWORD_REQUEST, AUTH_FORGOT_PASSWORD_SUCCESS, AUTH_FORGOT_PASSWORD_ERROR,
    AUTH_RESET_PASSWORD_REQUEST, AUTH_RESET_PASSWORD_SUCCESS, AUTH_RESET_PASSWORD_ERROR,
    AUTH_CHANGE_PASSWORD_REQUEST, AUTH_CHANGE_PASSWORD_SUCCESS, AUTH_CHANGE_PASSWORD_ERROR
} from './auth.types';


const INITIAL_STATE = {
    user: null,
    fetching: false,
    error: false,
    errorText: "",
    accessToken: "",
    userName: "",
    backUrl: "/",
    recoverEmailSent: false,
    confirmEmailSent: false,
    isSuperAdminRole: false,
    isParentRole: false,
    isEmployeeRole: false,
    isSelfEmployeeRole: false,
    employeeRoleType: ""
}

const access_token = "access_token";
const userName = "userName";
const isSuperAdminRole = "isSuperAdminRole";
const isParentRole = "isParentRole";
const isEmployeeRole = "isEmployeeRole";
const isSelfEmployeeRole = "isSelfEmployeeRole";
const employeeRoleType = "employeeRoleType";

const reducer = (state = INITIAL_STATE, action) => {
    let response = action.payload;
    let cookieUserName = Cookies.get(userName);
    let accessToken = Cookies.get(access_token);
    let cookieSuperAdminRole = Cookies.get(isSuperAdminRole);
    let cookieParentRole = Cookies.get(isParentRole);
    let cookieEmployeeRole = Cookies.get(isEmployeeRole);
    let cookieSelfEmployeeRole = Cookies.get(isSelfEmployeeRole);
    let cookieEmployeeRoleType = Cookies.get(employeeRoleType);
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case AUTH_LOGIN_SUCCESS:
            Cookies.set(access_token, response.token, { path: "/", expires: response.expiration });
            Cookies.set(userName, response.userName, { path: "/", expires: response.expiration });
            Cookies.set(isSuperAdminRole, response.isSuperAdminRole, { path: "/", expires: response.expiration });
            Cookies.set(isParentRole, response.isParentRole, { path: "/", expires: response.expiration });
            Cookies.set(isEmployeeRole, response.isEmployeeRole, { path: "/", expires: response.expiration });
            Cookies.set(isSelfEmployeeRole, response.isSelfEmployeeRole, { path: "/", expires: response.expiration });
            Cookies.set(employeeRoleType, response.employeeRole, { path: "/", expires: response.expiration });
            return {
                ...state,
                fetching: false,
                accessToken: response.token,
                isParentRole: response.isParentRole,
                isEmployeeRole: response.isEmployeeRole,
                isSelfEmployeeRole: response.isSelfEmployeeRole,
                isSuperAdminRole: response.isSuperAdminRole,
                employeeRoleType: response.employeeRole
            };
        case AUTH_LOGIN_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case AUTH_REGISTER_REQUEST:
            return {
                ...state,
                fetching: true
            };
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                fetching: false,
                confirmEmailSent: true
            };
        case AUTH_REGISTER_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
                errorText: action.payload
            };
        case AUTH_INIT:
            axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
            return {
                ...state,
                userName: cookieUserName ? cookieUserName : state.username,
                isSuperAdminRole: cookieSuperAdminRole === "true",
                isParentRole: cookieParentRole === "true",
                isEmployeeRole: cookieEmployeeRole === "true",
                isSelfEmployeeRole: cookieSelfEmployeeRole === "true",
                employeeRoleType: cookieEmployeeRoleType,
                isAuth: true
            };
        case AUTH_LOGOUT:
            Cookies.set(access_token);
            Cookies.set(userName);
            Cookies.set(isSuperAdminRole);
            Cookies.set(isParentRole);
            Cookies.set(isEmployeeRole);
            Cookies.set(isSelfEmployeeRole);
            Cookies.set(employeeRoleType);
            return {
                ...state,
                backUrl: action.payload.backUrl ? action.payload.backUrl : state.backUrl
            };
        case AUTH_PROFILE_CHANGE:
            return { ...state, [action.payload.name]: action.payload.value }
        case AUTH_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                recoverEmailSent: true
            }
        case AUTH_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                recoverEmailSent: true
            }
        default: return state;
    }
}

export default reducer;