import React from 'react';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';

const ModalDeleteFailed = (props) => {
    const { isDisplay, onClose, onSubmit, showItem } = props;

    const handleOnClose = () => {
        onClose();
    }

    const handleOnSubmit = () => {
        onSubmit(showItem);
    }

    return (
        <div id="modal-inst-remove3" tabIndex="-1" role="dialog" aria-labelledby="modal-remove3" aria-hidden="true" className={`c-modal-inst-remove modal fade  ${isDisplay ? 'show' : ''}`} style={{ display: isDisplay ? 'block' : 'none' }}>
            <div role="document" className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => handleOnClose()}>
                        <svg width="1em" height="1em" className="icon icon-close ">
                            <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                        </svg>
                    </button>
                    <div className="modal-body">
                        <div className="c-modal-file-load__wrapper">
                            <h2 className="modal__title">Невозможно удалить структуру</h2>
                            <p className="modal__subtitle modal__subtitle--tac">Эта структура имеет промежуточный уровень.Сначала удалите предыдущие уровни.</p>
                            <button type="button" className="e-btn e-btn--filled c-modal-inst-remove__btn" onClick={() => handleOnSubmit()}>ОК</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ModalDeleteFailed;