import React from 'react';

const TextArea = (props) => {
    const { title, data, name, onChange } = props;

    return (
        <div className="form-group h100">
            <label className="e-label">{title}</label>
            <div className="form-control">
                <textarea id={name} name={name} value={data} className="e-textarea" onChange={(e) => onChange(e)}></textarea>
            </div>
        </div>
    );
}

export default TextArea;