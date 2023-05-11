import React, { useState, useEffect } from 'react';

const TreeNodeItem = (props) => {
    const { id, name, checked } = props;
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        console.log("TreeNode::", checked)
        setSelected(checked);
    })

    const handleItemSelect = (e) => {
        console.log(selected)
        setSelected(!selected);
    }

    return (
        <li key={`career_${id}`}>
            <div className="c-multiselect__option">
                <label htmlFor={`career_${id}`}>{name}</label>
                <input type="checkbox" id={`career_${id}`} name={id} className="e-checkbox" checked={selected ? "checked" : ""} onChange={(e) => handleItemSelect(e)} />
            </div>
        </li>
    );
}

export default TreeNodeItem;