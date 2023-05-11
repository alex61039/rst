import React, { useState, useEffect } from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';

const Select = (props) => {
    const { title, data, error, errorText, selectedValue } = props;
    const [selected, setSelected] = useState("Не выбрано")

    useEffect(() => {
        if (selectedValue) {
            setSelected(selectedValue.label)
        }
    }, [selectedValue])

    const selectList = data && data.length > 0 ? data.map(t => {
        return {
            value: t.id,
            label: t.name
        }
    }) : [];

    const handleChange = (e) => {
        setSelected(e.label)
        const { onChange } = props;
        onChange(e);
    }

    return (
        <div className="c-select">
            <label className="e-label">{title}</label>
            <div className="c-select__wrapper">
                <div className="c-select__trigger"><span>{selected}</span>
                    <div className="c-select__arrow">
                        <svg width="1em" height="1em" className="icon icon-down-arrow ">
                            <use xlinkHref={`${SymbolDefs}#icon-down-arrow`}></use>
                        </svg>
                    </div>
                </div>
                <div className={`c-select__options`}>
                    {selectList.map((el, key) => {
                        return <span key={key} data-value={key} onClick={() => handleChange(el)} className="c-select__option">{el.label}</span>
                    })}
                </div>
                {error && <span className="form-group__error">{errorText}</span>}
            </div>
        </div>
    );
}

export default Select;