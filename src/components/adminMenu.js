import React, { useState } from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';

const AdminMenu = (props) => (
    <div className="c-menu">
        <h3 className="e-title--sm">Меню</h3>
        <div className="c-menu__wrapper">
            <ul className="h-reset-list c-menu__list">
                {
                    /**<li className="c-menu__item"><a href="#" className="c-menu__link">
                    <svg width="1em" height="1em" className="icon icon-smile-bad c-menu__ico">
                        <use xlinkHref={`${SymbolDefs}#icon-smile-bad`}></use>
                    </svg>
                    <span className="c-menu__txt">Жалобы</span></a>
                </li>
                <li className="c-menu__item"><a href="#" className="c-menu__link">
                    <svg width="1em" height="1em" className="icon icon-lock c-menu__ico">
                        <use xlinkHref={`${SymbolDefs}#icon-lock`}></use>
                    </svg>
                    <span className="c-menu__txt">Заблокированное</span></a>
                </li>
                <li className="c-menu__item"><a href="#" className="c-menu__link">
                    <svg width="1em" height="1em" className="icon icon-community c-menu__ico">
                        <use xlinkHref={`${SymbolDefs}#icon-community`}></use>
                    </svg>
                    <span className="c-menu__txt">Права доступа</span></a>
                </li>
                     * 
                     */
                }

                <li className="c-menu__item">
                    <a href="/structure" className="c-menu__link">
                        <svg width="1em" height="1em" className="icon icon-stripe c-menu__ico">
                            <use xlinkHref={`${SymbolDefs}#icon-stripe`}></use>
                        </svg>
                        <span className="c-menu__txt">Структура РОСТ</span>
                    </a>
                </li>
            </ul >
        </div >
    </div >
);

export default AdminMenu;