import React, { useState, useEffect } from 'react';

const InputDate = (props) => {
    const { title, data, placeholder, name, error, errorText } = props;
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [selectedDate, setDate] = useState(new Date())

    useEffect(() => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        setMaxDate(yyyy + '-' + mm + '-' + dd);
        setMinDate((yyyy - 18) + '-' + mm + '-' + dd)

        if (data) {
            let bd = new Date(data)
            let bdDays = bd.getDate();
            let bdMonth = bd.getMonth() + 1;
            if (bdDays < 10) {
                bdDays = '0' + bdDays
            }
            if (bdMonth < 10) {
                bdMonth = '0' + bdMonth
            }
            setDate(bd.getFullYear() + '-' + bdMonth + '-' + bdDays)
        }

    }, [data])

    const handleOnChange = (e) => {
        const { onChange } = props;
        if (onChange)
            onChange(e);
    }

    return (
        <div className={`form-group e-input-autocomplete ${error ? 'error' : ''}`}>
            <label htmlFor={name} className="e-label">{title}</label>
            <div className="form-control">
                <input value={selectedDate} type="date" placeholder={placeholder} id={name} name={name}
                    autoComplete="off" required="required" className="e-input" onChange={(e) => handleOnChange(e)}
                    min={minDate}
                    max={maxDate}
                    placeholder="dd-mm-yyyy"
                    required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
                {error && <span className="form-group__error">{errorText}</span>}
            </div>
        </div>
    );
}

export default InputDate;