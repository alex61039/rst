import React, { useState } from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';

const InputCheckbox = (props) => {
    const { isSelected } = props;
    return (
        <div className="c-modal-select-role__action-block">
            <div className="e-role"><span>{props.title}</span>
                <input type="checkbox" className="e-checkbox" checked={isSelected} onChange={() => props.onChoseRole(props.roleId)} onClick={() => props.onChoseRole(props.roleId)} />
            </div>
            <div className="e-tooltip">
                <span className="e-tooltip__title">{props.tooltipTitle}</span>
                <button type="button" className="e-tooltip__btn">
                    <svg width="1em" height="1em" className="icon icon-question ">
                        <use xlinkHref={`${SymbolDefs}#icon-question`} ></use>
                    </svg>
                    <div className="e-tooltip__wrapper">
                        <p className="e-tooltip__text">{props.tooltipText}</p>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default InputCheckbox;