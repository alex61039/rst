import React, { useState } from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';
import "react-image-crop/dist/ReactCrop.css";
import { ValidatePassword } from './../utils/validation';
import InputPrivate from './../components/inputPrivate';

const ModalPasswordChange = (props) => {
    const { isDisplay } = props;
    const [oldPassword, setOldPassword] = useState("");
    const [oldPasswordValid, setOldPasswordValid] = useState(true);
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleOnClose = () => {
        const { onClosePasswordModal } = props;
        resetForm();
        onClosePasswordModal();
    }

    const resetForm = () => {
        setOldPassword("");
        setOldPasswordValid(true);
        setOldPasswordError("");
        setPassword("");
        setPasswordValid(true);
        setPasswordError("");
        setConfirmPassword("");
        setConfirmPasswordValid(true);
        setConfirmPasswordError("");
    }

    const handleSubmit = () => {
        let validationResult = validateForm();
        if (validationResult === true) {
            const { submitPasswordChange } = props;
            submitPasswordChange(oldPassword, password, confirmPassword)
            handleOnClose();
        }
    }

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let validation = ValidatePassword(value);
        switch (name) {
            case "oldPassword":
                setOldPassword(value);
                setOldPasswordValid(validation.isValid);
                setOldPasswordError(validation.message);
                break;
            case "password":
                setPassword(value);
                setPasswordValid(validation.isValid);
                setPasswordError(validation.message);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                setConfirmPasswordValid(validation.isValid);
                setConfirmPasswordError(validation.message);
                break;
            default:
                break;
        }

        //comparePasswords()
    }

    function validateForm() {
        let emptyFields = false;
        if (!oldPassword) {
            setOldPasswordValid(false);
            setOldPasswordError("Не указан пароль");
            emptyFields = true;
        }
        if (!password) {
            setPasswordValid(false);
            setPasswordError("Не указан пароль");
            emptyFields = true;
        }
        if (!confirmPassword) {
            setConfirmPasswordValid(false);
            setConfirmPasswordError("Не указан пароль");
            emptyFields = true;
        }

        if (oldPasswordValid && passwordValid && confirmPasswordValid && !emptyFields && comparePasswords()) {
            return true;
        }

        return false;
    }

    const comparePasswords = () => {
        let passwordsEqual = false;
        if (password !== confirmPassword) {
            setPasswordValid(false);
            setPasswordError('Пароли не совпадают');
            setConfirmPasswordValid(false);
            setConfirmPasswordError('Пароли не совпадают');
        } else {
            setPasswordValid(true);
            setPasswordError('');
            setConfirmPasswordValid(true);
            setConfirmPasswordError('');
            passwordsEqual = true;
        }

        return passwordsEqual;
    }

    return (
        <div id="modal-change-pass" tabIndex="-1" role="dialog" aria-labelledby="modal-add-news" aria-hidden="true" className={`c-modal-change-pass modal fade ${isDisplay ? 'show' : ''}`} style={{ display: isDisplay ? 'block' : 'none' }}>
            <div role="document" className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => handleOnClose()}>
                        <svg width="1em" height="1em" className="icon icon-close ">
                            <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                        </svg>
                    </button>
                    <div className="modal-body">
                        <div className="c-modal-change-pass__wrapper">
                            <h2 className="modal__title">Сменить пароль</h2>
                            <form className="c-modal-change-pass__form">
                                <InputPrivate
                                    title={'Старый пароль'}
                                    name={'oldPassword'}
                                    type={'password'}
                                    error={!oldPasswordValid}
                                    errorText={oldPasswordError}
                                    onChange={(e) => handleInputChange(e)}
                                    value={oldPassword}
                                />
                                <InputPrivate
                                    title={'Новый пароль'}
                                    name={'password'}
                                    type={'password'}
                                    error={!passwordValid}
                                    errorText={passwordError}
                                    onChange={(e) => handleInputChange(e)}
                                    value={password}
                                />
                                <InputPrivate
                                    title={'Повторите пароль'}
                                    name={'confirmPassword'}
                                    type={'password'}
                                    error={!confirmPasswordValid}
                                    errorText={confirmPasswordError}
                                    onChange={(e) => handleInputChange(e)}
                                    value={confirmPassword}
                                />
                                <button type="button" className="e-btn e-btn--filled e-btn--md" onClick={() => handleSubmit()}>Сохранить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ModalPasswordChange;