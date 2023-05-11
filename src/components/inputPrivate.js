import React, { useState, useEffect } from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';

const ShowPassword = () => (
    <svg width="1em" height="1em" className="icon icon-open-eye ">
        <use xlinkHref={`${SymbolDefs}#icon-open-eye`}></use>
    </svg>
);

const HidePassword = () => (
    <svg width="1em" height="1em" className="icon icon-close-eye ">
        <use xlinkHref={`${SymbolDefs}#icon-close-eye`}></use>
    </svg>
);

const InputPrivate = (props) => {
    const { title, name, error, errorText, isShowButton, data, isClear } = props;
    const [isDisplayPassword, setDisplayPassword] = useState(false);

    const handleOnChange = (e) => {
        const { onChange } = props;
        if (onChange)
            onChange(e);
    }

    return (
        <div className={`form-group password-ico ${error ? 'error' : ''}`} >
            <label htmlFor="userPassword" className="e-label">{title}</label>
            <div className="form-control">
                <input value={data} type={isDisplayPassword ? "text" : "password"}
                    id={name} name={name} autoComplete="off" required="required" className="e-input" onChange={(e) => handleOnChange(e)} />
                {
                    isShowButton &&
                    <button type="button" className="e-password-display" onClick={() => setDisplayPassword(!isDisplayPassword)}>
                        {
                            isDisplayPassword ? <ShowPassword /> : <HidePassword />
                        }
                    </button>
                }

                {error && <span className="form-group__error">{errorText}</span>}
            </div>
        </div >
    );
}

export default InputPrivate;