import React, { useState } from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';

const Menu = (props) => {
    return (
        <div className="c-menu">
            <h3 className="e-title--sm">Меню</h3>
            <div className="c-menu__wrapper">
                <ul className="h-reset-list c-menu__list">
                    <li className="c-menu__item">
                        <a href="/profile" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-user c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-user`}></use>
                            </svg>
                            <span className="c-menu__txt">Моя страница</span>
                        </a>
                    </li>
                    {
                        /**
                         * <li className="c-menu__item">
                        <a href="#" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-girl c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-girl`}></use>
                            </svg>
                            <span className="c-menu__txt">Полина</span>
                        </a>
                    </li>
                    <li className="c-menu__item">
                        <a href="#" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-boy c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-boy`}></use>
                            </svg>
                            <span className="c-menu__txt">Егор</span>
                        </a>
                    </li>
                         */
                    }
                </ul>
                <ul className="h-reset-list c-menu__list">
                    <li className="c-menu__item">
                        <a href="/communities" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-community c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-community`}></use>
                            </svg>
                            <span className="c-menu__txt">Сообщества</span>
                        </a>
                    </li>
                    <li className="c-menu__item">
                        <a href="/settings" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-settings c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-settings`}></use>
                            </svg>
                            <span className="c-menu__txt">Настройки</span>
                        </a>
                    </li>
                </ul>
                {
                    /**
                     * <ul className="h-reset-list c-menu__list">
                    <li className="c-menu__item">
                        <a href="#" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-stripe c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-stripe`}></use>
                            </svg>
                            <span className="c-menu__txt">Лента</span>
                        </a>
                    </li>
                    <li className="c-menu__item">
                        <a href="#" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-community c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-community`}></use>
                            </svg>
                            <span className="c-menu__txt">Сообщества</span>
                        </a>
                    </li>
                    <li className="c-menu__item">
                        <a href="#" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-event c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-event`}></use>
                            </svg>
                            <span className="c-menu__txt">События</span>
                        </a>
                    </li>
                    <li className="c-menu__item">
                        <a href="#" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-alert c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-alert`}></use>
                            </svg>
                            <span className="c-menu__txt">Уведомления</span>
                        </a>
                    </li>
                    <li className="c-menu__item">
                        <a href="#" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-favourite c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-favourite`}></use>
                            </svg>
                            <span className="c-menu__txt">Избранное</span>
                        </a>
                    </li>
                    <li className="c-menu__item">
                        <a href="#" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-settings c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-settings`}></use>
                            </svg>
                            <span className="c-menu__txt">Настройки</span>
                        </a>
                    </li>
                </ul>
                <ul className="h-reset-list c-menu__list">
                    <li className="c-menu__item">
                        <a href="#" className="c-menu__link">
                            <svg width="1em" height="1em" className="icon icon-star c-menu__ico">
                                <use xlinkHref={`${SymbolDefs}#icon-star`}></use>
                            </svg>
                            <span className="c-menu__txt">Возможности</span>
                        </a>
                    </li>
                </ul >

                     */
                }
            </div >
        </div >
    );
}

export default Menu;