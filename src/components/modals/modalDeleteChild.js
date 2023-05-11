import React, { useState, useEffect } from 'react';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';

const ModalDeleteChild = (props) => {
    const { isDisplay, onClose, onSubmit, selectedId } = props;

    const handleOnClose = () => {
        onClose();
    }

    const handleOnSubmit = () => {
        onSubmit(selectedId);
    }

    return (
        <div id="modal-child-delete" tabIndex="-1" role="dialog" aria-labelledby="modal-welcome-title" aria-hidden="true" className={`c-modal-child-delete modal fade  ${isDisplay ? 'show' : ''}`} style={{ display: isDisplay ? 'block' : 'none' }}>
            <div role="document" className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => handleOnClose()}>
                        <svg width="1em" height="1em" className="icon icon-close ">
                            <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                        </svg>
                    </button>
                    <div className="modal-body">
                        <div className="c-modal-child-delete__wrapper">
                            <h2 className="modal__title">Удалить профиль ребёнка?</h2>
                            <p className="modal__subtitle modal__subtitle--tac">После удаления все данные будут утеряны безвозвратно</p>
                            <button type="button" data-dismiss="modal" aria-label="Close" className="e-btn e-btn--filled e-btn--mt5" onClick={() => handleOnSubmit()}>Удалить профиль</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ModalDeleteChild;