import React from 'react';
const InputPublic = (props) => {
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
                <input value={data} type={type} placeholder={placeholder} id={name} name={name}
                    autoComplete="off" required="required" className="e-input" onChange={(e) => handleOnChange(e)} />
                {error && <span className="form-group__error">{errorText}</span>}
            </div>
        </div>
    );
}

export default InputPublic;