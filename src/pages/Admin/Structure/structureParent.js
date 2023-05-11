import React, { useState, useEffect } from 'react';
import ModalAddStructure from './../../../components/modals/modalAddStructure';
import SymbolDefs from './../../../assets/images/useful/svg/theme/symbol-defs.svg';

const StructureParent = (props) => {
    const { name, id, institutions, onSelectParent, onDelete, onAddInstitution, onEditSubmit } = props;
    const [toggle, setToggle] = useState(false);
    const [isModalEditDisplay, setModalEditDisplay] = useState(false);
    const [structureName, setStructureName] = useState("");

    useEffect(() => {
        setStructureName(name);
    }, [name])

    const handleOnChange = (name, value) => {
        setStructureName(value);
    }

    const handleEditSubmit = () => {
        if (structureName) {
            onEditSubmit(id, structureName)
        }
    }

    return (
        <>
            <ModalAddStructure isDisplay={isModalEditDisplay}
                onClose={() => setModalEditDisplay(false)}
                onSubmit={handleEditSubmit}
                onChangeField={handleOnChange}
                name={structureName}
                nameValid={true}
                actionTitle="Сохранить" />

            <div className={`c-structure-item-wrap ${toggle ? 'show' : ''}`}>
                <div className="c-structure__item c-structure-item">
                    <div className="c-structure-item__info">
                        <span className="c-structure-item__title" onClick={() => onSelectParent(id, name)}>{name}</span>
                        <button type="button" className="c-structure-item__btn" onClick={() => setToggle(!toggle)}>
                            <svg width="1em" height="1em" className="icon icon-down-arrow">
                                <use xlinkHref={`${SymbolDefs}#icon-down-arrow`}></use>
                            </svg>
                            {
                                toggle ? <span>Скрыть</span> : <span>Учреждения</span>
                            }
                        </button>
                    </div>
                    <div className="c-structure-item__action">
                        <div className="c-edit__wrapper">
                            <button type="button" className="c-edit">
                                <svg width="1em" height="1em" className="icon icon-border-down">
                                    <use xlinkHref={`${SymbolDefs}#icon-border-down`}></use>
                                </svg>
                                <div className="c-edit__options">
                                    <div className="c-edit__items">
                                        <a href="#" onClick={() => onAddInstitution(id)} className="c-edit__item">Создать учреждение</a>
                                        <a href="#" onClick={() => setModalEditDisplay(true)} className="c-edit__item">Редактировать структуру</a>
                                        <a href="#" onClick={() => onDelete(id)} className="c-edit__item">Удалить структуру</a>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                {
                    (toggle && institutions) &&
                    <div className="c-structure__item-list c-structure-item-list">
                        {
                            institutions.map((item, i) => {
                                return (
                                    <a href={`/structure/institution/${item.id}`} className="c-structure__link c-structure-link">
                                        <span className="c-structure-link__title">{item.name}</span>
                                        <svg width="1em" height="1em" className="icon icon-down-arrow">
                                            <use xlinkHref={`${SymbolDefs}#icon-down-arrow`}></use>
                                        </svg>
                                    </a>
                                );
                            })
                        }
                    </div>
                }
            </div></>
    );
}

export default StructureParent;