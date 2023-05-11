import React, { useState } from 'react';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';

const ModalConfirmDelete = (props) => {
    const { isDisplay, onClose, onSubmit, title, text } = props;

    return (
        <div id="modal-inst-remove1" tabIndex="-1" role="dialog" aria-labelledby="modal-remove1" aria-hidden="true" className={`c-modal-inst-remove modal fade  ${isDisplay ? 'show' : ''}`} style={{ display: isDisplay ? 'block' : 'none' }}>
            <div role="document" className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => onClose()}>
                        <svg width="1em" height="1em" className="icon icon-close ">
                            <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                        </svg>
                    </button>
                    <div className="modal-body">
                        <div className="c-modal-file-load__wrapper">
                            <h2 className="modal__title">{title}</h2>
                            <p className="modal__subtitle modal__subtitle--tac">{text}</p>
                            <button type="buttton" className="e-btn e-btn--filled c-modal-inst-remove__btn" onClick={() => onSubmit()}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmDelete;