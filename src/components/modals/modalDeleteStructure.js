import React, { useState } from 'react';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';

const ModalRemoveStructure = (props) => {
    const { isDisplay, onClose, onSubmit } = props;
    const [confirm, setConfirm] = useState(false);

    const handleOnClose = () => {
        onClose();
    }

    const handleOnSubmit = () => {
        setConfirm(false)
        onSubmit();
    }

    const FirstRemoveConfirmation = () => (
        <div id="modal-inst-remove1" tabIndex="-1" role="dialog" aria-labelledby="modal-remove1" aria-hidden="true" className={`c-modal-inst-remove modal fade  ${isDisplay ? 'show' : ''}`} style={{ display: isDisplay ? 'block' : 'none' }}>
            <div role="document" className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => handleOnClose()}>
                        <svg width="1em" height="1em" className="icon icon-close ">
                            <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                        </svg>
                    </button>
                    <div className="modal-body">
                        <div className="c-modal-file-load__wrapper">
                            <h2 className="modal__title">Удалить структуру?</h2>
                            <p className="modal__subtitle modal__subtitle--tac">Все созданные учреждения в это структуре будут так же удалены </p>
                            <button type="buttton" className="e-btn e-btn--filled c-modal-inst-remove__btn" onClick={() => setConfirm(true)}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );

    const SecondRemovalConfirmation = () => (
        <div id="modal-inst-remove2" tabIndex="-1" role="dialog" aria-labelledby="modal-remove2" aria-hidden="true" className={`c-modal-inst-remove modal fade  ${isDisplay ? 'show' : ''}`} style={{ display: isDisplay ? 'block' : 'none' }}>
            <div role="document" className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => handleOnClose()}>
                        <svg width="1em" height="1em" className="icon icon-close ">
                            <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                        </svg>
                    </button>
                    <div className="modal-body">
                        <div className="c-modal-file-load__wrapper">
                            <h2 className="modal__title">Удалить структуру?</h2>
                            <p className="modal__subtitle modal__subtitle--tac">Вы уверены?</p>Отменить это действие будет невозможно.
                        <button type="buttton" className="e-btn e-btn--filled e-btn--red c-modal-inst-remove__btn" onClick={() => handleOnSubmit()}>Да, удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

    return (
        <>
            {
                confirm === false ? <FirstRemoveConfirmation /> : <SecondRemovalConfirmation />
            }
        </>
    );
}

export default ModalRemoveStructure;