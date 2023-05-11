import React, { useState, useEffect } from 'react';
import InputPublic from './../inputPublic';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';

const ModalAddStructure = (props) => {
    const { isDisplay, onClose, onSubmit, selectedId, name, onChangeField, nameValid, nameError, actionTitle } = props;

    const handleOnClose = () => {
        onClose();
    }

    const handleOnSubmit = () => {
        onSubmit();
        onClose();
    }

    const handleInputChange = (e) => {
        onChangeField(e.target.name, e.target.value)
    }

    return (
        <div id="modal-structure" tabIndex="-1" role="dialog" aria-labelledby="modal-add-admin" aria-hidden="true" className={`c-modal-send-invite modal fade ${isDisplay ? 'show' : ''}`} style={{ display: isDisplay ? 'block' : 'none' }}>
            <div role="document" className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => handleOnClose()}>
                        <svg width="1em" height="1em" className="icon icon-close ">
                            <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                        </svg>
                    </button>
                    <div className="modal-body">
                        <div className="c-modal-send-invite__wrapper">
                            <h2 className="modal__title">Структура РОСТ</h2>
                            <form className="c-modal-send-invite__form">
                                <InputPublic
                                    title={'Название структуры'}
                                    name={'name'}
                                    type={'text'}
                                    placeholder={''}
                                    error={!nameValid}
                                    errorText={nameError}
                                    onChange={(e) => handleInputChange(e)}
                                    data={name}
                                />
                                <button type="button" className="e-btn e-btn--filled" onClick={() => handleOnSubmit()}>{actionTitle}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ModalAddStructure;