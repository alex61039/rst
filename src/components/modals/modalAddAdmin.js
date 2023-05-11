import React, { useState, useEffect } from 'react';
import InputPublic from './../../components/inputPublic';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';

const ModalAddAdmin = (props) => {
    const { isDisplay, onClose, onSubmit } = props;
    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(true);
    const [nameError, setNameError] = useState("");

    const handleOnClose = () => {
        setName("");
        onClose();
    }

    const handleOnChange = (e) => {
        setName(e.target.value);
        validate(e.target.value);
    }

    const handleOnSubmit = () => {
        if (validate(name)) {
            onSubmit(name);
            setName("");
        }
    }

    const validate = (value) => {
        if (!value) {
            setNameValid(false);
            setNameError("Поле обязательно для заполения")
            return false;
        }

        return true;
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
                            <h2 class="modal__title">Назначить руководителя учреждения</h2>
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
                                <button type="button" class="e-btn e-btn--filled" onClick={() => handleOnSubmit()}>Назначить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ModalAddAdmin;

