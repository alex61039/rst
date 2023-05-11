import React, { useState, useEffect } from 'react';
import TreeNodeItem from './treeNodeItem';

const TreeNode = (props) => {
    const { i, name, id, data, selectItems } = props;
    const [expand, setExpand] = useState(false);
    const [items, setItems] = useState([]);
    const [isSelected, setSelected] = useState(false)

    useEffect(() => {
        setItems(data)
        console.log(data)
        var isAllSelected = data.filter(t => t.isSelected);

        if (isAllSelected && isAllSelected.length == data.length) {
            setSelected(true)
        } else {
            setSelected(false)
        }
    })

    const handleSelectAll = (e) => {
        console.log(e)
        let selectedItems = items;
        for (let i = 0; i < selectedItems.length; i++) {
            selectedItems[i].isSelected = !selectedItems[i].isSelected;
        }
        setItems(selectedItems);
        selectItems(selectedItems);
        setSelected(!isSelected)
    }

    return (
        <li key={i}>
            <div className="c-multiselect__option">
                <label onClick={() => setExpand(!expand)}>{expand ? "-" : "+"}</label><label htmlFor="programmer">{name}</label>
                <input type="checkbox" id="programmer" name={id} className="e-checkbox" checked={isSelected} onChange={(e) => handleSelectAll(e)} />
            </div>
            {
                (items.length && expand) &&
                <ul className="h-reset-list">
                    {
                        items.map((item) => {
                            console.log("TreeNode::", item)
                            return (
                                <TreeNodeItem id={item.id} name={item.name} checked={item.isSelected} />
                            );
                        })
                    }
                </ul>
            }
        </li>
    );
}

export default TreeNode;