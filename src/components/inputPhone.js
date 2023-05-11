import React from 'react';
import InputMask from 'react-input-mask';

const InputPhone = (props) => {
    const { title, data, type, placeholder, name, error, errorText } = props;
    const handleOnChange = (e) => {
        const { onChange } = props;
        if (onChange)
            onChange(e);
    }

    return (
        <div className={`form-group e-input-autocomplete ${error ? 'error' : ''}`}>
            <label htmlFor="autocomplete-city" className="e-label">{title}</label>
            <div className="form-control">
                <InputMask mask="+7 (999) 999-99-99" className="e-input" value={data} onChange={(e) => handleOnChange(e)} id={name} name={name} />
                {/** 
                <input value={data} type={type} placeholder={placeholder} id={name} name={name}
                    autoComplete="off" required="required" className="e-input" onChange={(e) => handleOnChange(e)} />*/}
                {error && <span className="form-group__error">{errorText}</span>}
            </div>
        </div>
    );
}

export default InputPhone;