import React, { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';

const InputAutocomplete = (props) => {
    const { title, data, selectedValue, type, placeholder, name, error, errorText } = props;
    const [value, setValue] = useState("");

    useEffect(() => {
        if (selectedValue) {
            var deafult = data.find(t => t.id === selectedValue);
            if (deafult) setValue(deafult.label)
        }
    }, [selectedValue])

    const handleOnChange = (e) => {
        setValue(e.target.value)
        const { onChange } = props;
        if (onChange)
            onChange(e.target.value);
    }

    const handleOnSelect = (val) => {
        setValue(val)
        const { onChange } = props;
        onChange(val);
    }

    const menuStyle = {
        osition: 'absolute',
        border: '1px solid #3E4B5D',
        borderTop: 0,
        "zIndex": 99,
        top: '100%',
        left: 0,
        right: 0,
        maxHeight: '30rem',
        overflow: 'auto'
    }

    return (
        <>
            <div className={`autocomplete-wrapper form-group e-input-autocomplete ${error ? 'error' : ''}`}>
                <label className="e-label">{title}</label>
                <div className="form-control">
                    <Autocomplete
                        getItemValue={(item) => item.label}
                        items={data}
                        menuStyle={menuStyle}
                        renderItem={(item, isHighlighted) =>
                            <div key={item.id} style={{
                                padding: '0.85rem 1rem',
                                cursor: 'pointer',
                                borderBottom: '1px solid #3E4B5D',
                                background: '#ffffff',
                                color: isHighlighted ? '#707b8b' : '#15171A',
                            }}>
                                {item.label}
                            </div>
                        }
                        wrapperStyle={{ width: '100%' }}
                        value={value}
                        onChange={(e) => handleOnChange(e)}
                        onSelect={(val) => handleOnSelect(val)}
                    />
                    {error && <span className="form-group__error">{errorText}</span>}
                </div>
            </div>
        </>
    );
}

export default InputAutocomplete;