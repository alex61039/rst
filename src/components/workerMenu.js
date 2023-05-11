import React, { useState } from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';
import { ReactComponent as InstitutionIcon } from "./../assets/images/useful/svg/institution-menu.svg";

const WorkerMenu = (props) => {
    return (
        <div class="c-menu">
            <h3 class="e-title--sm">Меню</h3>
            <div class="c-menu__wrapper">
                <ul class="h-reset-list c-menu__list">
                    <li class="c-menu__item">
                        <a href="/worker/communities" class="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-community c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-community`}></use>
                            </svg>
                            <span class="c-menu__txt">Сообщества</span>
                        </a>
                    </li>
                    <li class="c-menu__item">
                        <a href="/worker/events" class="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-event c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-event`}></use>
                            </svg>
                            <span class="c-menu__txt">События</span>
                        </a>
                    </li>
                    {
                        props.isInstitutionDisplay &&
                        <li class="c-menu__item">
                            <a href="/worker" class="c-menu__link">
                                <InstitutionIcon className="c-menu__ico" />
                                <span class="c-menu__txt">Учреждение</span>
                            </a>
                        </li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default WorkerMenu;