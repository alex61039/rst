import * as actionType from './../constants/actionType';
import * as roleType from './../constants/roleType';

export const ActionIsAllowed = (user, action) => {
    let result = false;
    switch (action) {
        case actionType.IS_ALLOW_CHANGE_ROLE:
            if (user.isSuperAdminRole) result = true;
            if (user.isEmployeeRole && user.employeeRoleType === roleType.ROLE_EMPLOYEE_GLOBAL_ADMIN) result = true;
            break;
        case actionType.IS_ALLOW_SET_GLOBAL_ADMIN:
            if (user.isSuperAdminRole) result = true;
            break;
        case actionType.IS_ALLOW_DELETE_USER:
            if (user.isSuperAdminRole) result = true;
            if (user.isEmployeeRole && user.employeeRoleType === roleType.ROLE_EMPLOYEE_GLOBAL_ADMIN) result = true;
            if (user.isEmployeeRole && user.employeeRoleType === roleType.ROLE_EMPLOYEE_ADMIN) result = true;
            break;
        case actionType.IS_ALLOW_VERIFY_USER:
            if (user.isSuperAdminRole) result = true;
            if (user.isEmployeeRole && user.employeeRoleType === roleType.ROLE_EMPLOYEE_GLOBAL_ADMIN) result = true;
            if (user.isEmployeeRole && user.employeeRoleType === roleType.ROLE_EMPLOYEE_ADMIN) result = true;
            break;
        default:
            break;
    }

    return result;
}

const isSuperAdminRole = "isSuperAdminRole";
const isParentRole = "isParentRole";
const isEmployeeRole = "isEmployeeRole";
const isSelfEmployeeRole = "isSelfEmployeeRole";
const employeeRoleType = "employeeRoleType";