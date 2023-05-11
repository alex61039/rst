import React, { useState, useEffect } from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';
import TreeNode from './treeNode';

const MultiSelect = (props) => {
    const { data, title, onCareerChange, onCareerDirectionChange, selectedItems } = props;
    const [selected, setSelected] = useState("Не выбрано");

    useEffect(() => {
        for (let i = 0; i < data.length; i++) {
            var selectedDirection = data[i].careers.filter(t => t.isSelected == true);
            if (selectedDirection && selectedDirection.length > 0) {
                setSelected(data[i].name)
            }
        }
    })

    const handleSelectAll = (e) => {
        onCareerDirectionChange(e);
        console.log(test)
    }

    const handleItemSelect = (e) => {
        onCareerChange(e);
        console.log(e)
    }

    const handleSelectItem = (items) => {
        console.log(items)
        onCareerChange(items);
    }

    return (
        <div className="c-multiselect">
            <label className="e-label">{title}</label>
            <div className="c-multiselect__wrapper">
                <div className="c-multiselect__trigger"><span>{selected}</span>
                    <div className="c-multiselect__arrow">
                        <svg width="1em" height="1em" className="icon icon-down-arrow ">
                            <use xlinkHref={`${SymbolDefs}#icon-down-arrow`}></use>
                        </svg>
                    </div>
                    <div className="c-multiselect__options">
                        <ul className="h-reset-list">
                            {
                                data.map((item, i) => {
                                    return (
                                        <TreeNode key={i} i={i} id={item.id} name={item.name} data={item.careers} selectItems={handleSelectItem} />
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MultiSelect;