import React, { useState } from 'react';
import InputPublic from './../../components/inputPublic';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';
import { ValidateTextWithSymbolsField } from './../../utils/validation';

const ModalVerifyUser = (props) => {
    const { isDisplay, onClose, onSubmit } = props;
    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(true);
    const [nameError, setNameError] = useState("");
    const [position, setPosition] = useState("");
    const [positionValid, setPositionValid] = useState(true);
    const [positionError, setPositionError] = useState("");


    const handleOnClose = () => {
        resetForm();
        onClose();
    }

    const resetForm = () => {
        setName("");
        setPosition("")
    }

    const handleOnChange = (e) => {

        switch (e.target.name) {
            case "name":
                setName(e.target.value);
                break;
            case "position":
                setPosition(e.target.value);
                break;
            default:
                break;
        }
        validate(e.target.name, e.target.value);
    }

    const handleOnSubmit = () => {
        if (validate("name", name) && validate("position", position)) {
            onSubmit(name, position);
            resetForm();
        }
    }

    const validate = (field, value) => {
        let isValid = false;
        switch (field) {
            case "name":
                if (!value) {
                    setNameValid(false);
                    setNameError("Поле обязательно для заполения")
                    isValid = false;
                } else {
                    isValid = true;
                }
                break;
            case "position":
                if (value) {
                    let result = ValidateTextWithSymbolsField(value);
                    setPositionValid(result.isValid);
                    setPositionError(result.message);
                    isValid = result.isValid;
                } else {
                    setPositionValid(true);
                    setPositionError("");
                    isValid = true;
                }
                break;
            default:
                isValid = true;
                break;
        }
        console.log(isValid)
        return isValid;
    }

    return (
        <div id="modal-inst-adm" tabIndex="-1" role="dialog" aria-labelledby="modal-inst-adm" aria-hidden="true" className={`c-modal-send-invite modal fade  ${isDisplay ? 'show' : ''}`} style={{ display: isDisplay ? 'block' : 'none' }}>
            <div role="document" class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => handleOnClose()}>
                        <svg width="1em" height="1em" className="icon icon-close ">
                            <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                        </svg>
                    </button>
                    <div class="modal-body">
                        <div class="c-modal-send-invite__wrapper">
                            <h2 class="modal__title">Верифицировать сотрудника</h2>
                            <form class="c-modal-send-invite__form">
                                <InputPublic
                                    title={'Email или ID'}
                                    name={'name'}
                                    type={'text'}
                                    placeholder={''}
                                    onChange={(e) => handleOnChange(e)}
                                    data={name}
                                    error={!nameValid}
                                    errorText={nameError}
                                />
                                <InputPublic
                                    title={'Введите должность'}
                                    name={'position'}
                                    type={'text'}
                                    placeholder={''}
                                    onChange={(e) => handleOnChange(e)}
                                    data={position}
                                    error={!positionValid}
                                    errorText={positionError}
                                />
                                <button type="button" class="e-btn e-btn--filled" onClick={() => handleOnSubmit()}>Привязать к учреждению</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ModalVerifyUser;

