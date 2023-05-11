import { validate } from "@babel/types";

export const ValidatePassword = (value) => {
    const regexSmall = new RegExp("^(?=.*[a-z])");
    const regexCapital = new RegExp("^(?=.*[A-Z])");
    const regexNumber = new RegExp("^(?=.*[0-9])");
    const regexSpecial = new RegExp("^(?=.*[!@#\$%\^&\*])");
    const regexLenght = new RegExp("^(?=.{8,})");

    let result = {
        isValid: false,
        message: ''
    };

    if (!value || value == '') {
        result.isValid = false;
        result.message = result.isValid ? '' : 'Не указан пароль';
    } else {
        if (!value.match(regexCapital)) {
            result.isValid = false;
            result.message = 'Должен содержать заглавную букву';
        } else if (!value.match(regexSmall)) {
            result.isValid = false;
            result.message = 'Должен содержать прописную букву';
        } else if (!value.match(regexSpecial)) {
            result.isValid = false;
            result.message = 'Должен содержать спец. символ';
        } else if (!value.match(regexNumber)) {
            result.isValid = false;
            result.message = 'Должен содержать цифры';
        } else if (!value.match(regexLenght)) {
            result.isValid = false;
            result.message = 'Должен быть не менее 8ми символов';
        } else {
            result.isValid = true;
            result.message = '';
        }
    }

    return result;
}

export const ValidateTextField = (value) => {
    const cyrillicRegexp = new RegExp("^[а-яА-ЯёЁ]+$");
    let result = {
        isValid: false,
        message: ''
    };

    if (!value || value == '') {
        result.message = 'Не указано значение';
    } else if (!value.match(cyrillicRegexp)) {
        result.message = 'Допускаются только русские буквы';
    } else {
        result.isValid = true;
        result.message = '';
    }

    return result;
}

export const ValidateTextWithSymbolsField = (value) => {
    const cyrillicRegexp = new RegExp("^[а-яА-ЯёЁa-zA-Z0-9 №.,\"]+$");
    let result = {
        isValid: false,
        message: ''
    };

    if (!value || value == '') {
        result.message = 'Не указано значение';
    } else if (!value.match(cyrillicRegexp)) {
        result.message = 'Допускаются русские буквы и цифры';
    } else {
        result.isValid = true;
        result.message = '';
    }

    return result;
}

export const ValidateEmailField = (value) => {
    var regEx = new RegExp("^([\a-z0-9.%+-]+)@([\a-z0-9а-яё-]+\.)+([\a-z0-9а-яё-]{2,4})$", "iu");
    let indexDog = value ? value.indexOf('@') : -1;
    let indexDot = value ? value.lastIndexOf('.') : -1;
    let registerEmailValid = value ? (value.match(regEx) && (indexDog < indexDot)) : false;
    let result = {
        isValid: registerEmailValid,
        message: ''
    };

    if (!value) {
        result.message = 'Введите email';
    } else {
        result.message = registerEmailValid ? '' : 'Не верный формат';
    }

    return result;
}

export const ValidatePhoneField = (value) => {
    let registerPhoneValid = value && value !== '' && value.lenght !== 18;
    let result = {
        isValid: registerPhoneValid,
        message: ''
    };

    if (!value) {
        result.message = 'Введите телефон';
    } else {
        result.message = registerPhoneValid ? '' : 'Введите телефон';
    }

    return result;
}