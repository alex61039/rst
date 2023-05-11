import React from 'react';
import SymbolDefs from './../../../assets/images/useful/svg/theme/symbol-defs.svg';

const InstitutionEmployeeItem = (props) => (
    <div class="c-user-item black-title">
        <div class="c-user-item__img">
            <img src={props.mainPhoto} alt="" />
        </div>
        <div class="c-user-item__info">
            <span class="c-user-item__name">{props.name}</span>
            <span class="c-user-item__role">{props.roleName}</span>
        </div>
        {
            (props.isAllowChangeRole || props.isAllowSetGlobalAdmin || props.isAllowDelete) &&
            <div class="c-edit__wrapper">
                <button type="button" class="c-edit">
                    <svg width="1em" height="1em" className="icon icon-border-down">
                        <use xlinkHref={`${SymbolDefs}#icon-border-down`}></use>
                    </svg>
                    <div class="c-edit__options">
                        <div class="c-edit__items">
                            {
                                (props.role !== "GlobalAdmin" && props.isAllowChangeRole && props.role !== "Admin") && <a href="#" onClick={() => props.onSetAdmin(props.email)} class="c-edit__item">Сделать администратором</a>
                            }
                            {
                                (props.role === "GlobalAdmin" && props.isAllowSetGlobalAdmin) && <a href="#" onClick={() => props.onDelete(props.id)} class="c-edit__item">Убрать из учреждения</a>
                            }
                            {
                                (props.role !== "GlobalAdmin" && props.isAllowDelete) && <a href="#" onClick={() => props.onDelete(props.id)} class="c-edit__item">Убрать из учреждения</a>
                            }
                        </div>
                    </div>

                </button>
            </div>
        }

    </div>
)

const InstitutionEmployee = (props) => {
    const { data, onDelete, onSetAdmin, isAllowDelete, isAllowChangeRole, isAllowSetGlobalAdmin } = props;
    return (
        <div class="c-institutions-page__lists">
            {
                data.map((item, i) => {
                    return (
                        <InstitutionEmployeeItem
                            key={i}
                            id={item.id}
                            email={item.email}
                            name={item.name}
                            roleName={item.roleName}
                            role={item.role}
                            mainPhoto={item.mainPhoto}
                            onSetAdmin={onSetAdmin}
                            onDelete={onDelete}
                            isAllowChangeRole={isAllowChangeRole}
                            isAllowDelete={isAllowDelete}
                            isAllowSetGlobalAdmin={isAllowSetGlobalAdmin} />
                    );
                })
            }
        </div>
    );
}

export default InstitutionEmployee;