import React, { Component, useState } from 'react';

export class ModalAddCommunity extends Component {

    constructor(props) {
        super(props);

        this.isDisplay = props.isDisplay;
    }

    handleOnClose = () => {
        const { onCloseModalAddCommunity } = this.props;
        onCloseModalAddCommunity();
    }

    render() {
        console.log(this.props);
        return (
            <div id="modal-create-community" tabindex="-1" role="dialog" aria-labelledby="modal-create-event" aria-hidden="true"
                className={`c-modal-create-community modal fade ${ this.props.isDisplay ? 'show' : ''}`} 
                style={{ display: this.props.isDisplay ? 'block' : 'none' }}>
                <div role="document" className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close">
                            {/* <svg width="1em" height="1em" className="icon icon-close ">
                                <use xlink:href="s/images/useful/svg/theme/symbol-defs.svg#icon-close"></use>
                            </svg> */}
                        </button>
                        <div className="modal-body">
                            <div className="c-modal-create-community__wrapper">
                                <div className="c-modal-create-community__head">
                                    <button type="button" className="c-modal-create-community__img">
                                        {/* <svg width="1em" height="1em" className="icon icon-photo-big ">
                                            <use xlink:href="s/images/useful/svg/theme/symbol-defs.svg#icon-photo-big"></use>
                                        </svg> */}
                                    </button>
                                    <h2 className="modal__title">Создать сообщество</h2>
                                </div>
                                <form className="c-modal-create-community__form">
                                    <div className="c-modal-create-community__form-col">
                                        <div className="form-group">
                                            <label for="name" className="e-label">Название сообщества</label>
                                            <div className="form-control">
                                                <input type="text" id="name" name="name" autocomplete="off" className="e-input" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="c-multiselect">
                                                <label className="e-label">Отрасль</label>
                                                <div className="c-multiselect__wrapper">
                                                    <div className="c-multiselect__trigger"><span>Не выбрано</span>
                                                        <div className="c-multiselect__arrow">
                                                            {/* <svg width="1em" height="1em" className="icon icon-down-arrow ">
                                                                <use
                                                                    xlink:href="s/images/useful/svg/theme/symbol-defs.svg#icon-down-arrow">
                                                                </use>
                                                            </svg> */}
                                                        </div>
                                                    </div>
                                                    <div className="c-multiselect__options">
                                                        <ul className="h-reset-list">
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="programmer">- Програмирование</label>
                                                                    <input type="checkbox" id="programmer" className="e-checkbox" />
                                                                </div>
                                                                <ul className="h-reset-list">
                                                                    <li>
                                                                        <div className="c-multiselect__option">
                                                                            <label for="java">+ Java</label>
                                                                            <input type="checkbox" id="java" className="e-checkbox" />
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="c-multiselect__option">
                                                                            <label for="cplus">C++</label>
                                                                            <input type="checkbox" id="cplus" className="e-checkbox" />
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="aerobic">+ Аэробика</label>
                                                                    <input type="checkbox" id="aerobic" className="e-checkbox" />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="football">+ Футбол</label>
                                                                    <input type="checkbox" id="football" className="e-checkbox" />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="robot">+ Робототехника</label>
                                                                    <input type="checkbox" id="robot" className="e-checkbox" />
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="c-select w100-sm">
                                            <label className="e-label">Тип</label>
                                            <div className="c-select__wrapper">
                                                <div className="c-select__trigger"><span>Не выбрано</span>
                                                    <div className="c-select__arrow">
                                                        {/* <svg width="1em" height="1em" className="icon icon-down-arrow ">
                                                            <use
                                                                xlink:href="s/images/useful/svg/theme/symbol-defs.svg#icon-down-arrow">
                                                            </use>
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div className="c-select__options"><span data-value='13'
                                                        className="c-select__option selected"></span><span data-value='14'
                                                        className="c-select__option">1</span><span data-value='15'
                                                        className="c-select__option">2</span><span data-value='16'
                                                        className="c-select__option">3</span><span data-value='17'
                                                        className="c-select__option">4</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="c-multiselect">
                                                <label className="e-label">Отрасль</label>
                                                <div className="c-multiselect__wrapper">
                                                    <div className="c-multiselect__trigger"><span>Не выбрано</span>
                                                        <div className="c-multiselect__arrow">
                                                            {/* <svg width="1em" height="1em" className="icon icon-down-arrow ">
                                                                <use
                                                                    xlink:href="s/images/useful/svg/theme/symbol-defs.svg#icon-down-arrow">
                                                                </use>
                                                            </svg> */}
                                                        </div>
                                                    </div>
                                                    <div className="c-multiselect__options">
                                                        <ul className="h-reset-list">
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="programmer">- Програмирование</label>
                                                                    <input type="checkbox" id="programmer" className="e-checkbox" />
                                                                </div>
                                                                <ul className="h-reset-list">
                                                                    <li>
                                                                        <div className="c-multiselect__option">
                                                                            <label for="java">+ Java</label>
                                                                            <input type="checkbox" id="java" className="e-checkbox" />
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="c-multiselect__option">
                                                                            <label for="cplus">C++</label>
                                                                            <input type="checkbox" id="cplus" className="e-checkbox" />
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="aerobic">+ Аэробика</label>
                                                                    <input type="checkbox" id="aerobic" className="e-checkbox" />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="football">+ Футбол</label>
                                                                    <input type="checkbox" id="football" className="e-checkbox" />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="robot">+ Робототехника</label>
                                                                    <input type="checkbox" id="robot" className="e-checkbox" />
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="c-multiselect">
                                                <label className="e-label">Профориентация</label>
                                                <div className="c-multiselect__wrapper">
                                                    <div className="c-multiselect__trigger"><span>Не выбрано</span>
                                                        <div className="c-multiselect__arrow">
                                                            {/* <svg width="1em" height="1em" className="icon icon-down-arrow ">
                                                                <use
                                                                    xlink:href="s/images/useful/svg/theme/symbol-defs.svg#icon-down-arrow">
                                                                </use>
                                                            </svg> */}
                                                        </div>
                                                    </div>
                                                    <div className="c-multiselect__options">
                                                        <ul className="h-reset-list">
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="programmer">- Програмирование</label>
                                                                    <input type="checkbox" id="programmer" className="e-checkbox" />
                                                                </div>
                                                                <ul className="h-reset-list">
                                                                    <li>
                                                                        <div className="c-multiselect__option">
                                                                            <label for="java">+ Java</label>
                                                                            <input type="checkbox" id="java" className="e-checkbox" />
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="c-multiselect__option">
                                                                            <label for="cplus">C++</label>
                                                                            <input type="checkbox" id="cplus" className="e-checkbox" />
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="aerobic">+ Аэробика</label>
                                                                    <input type="checkbox" id="aerobic" className="e-checkbox" />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="football">+ Футбол</label>
                                                                    <input type="checkbox" id="football" className="e-checkbox" />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="c-multiselect__option">
                                                                    <label for="robot">+ Робототехника</label>
                                                                    <input type="checkbox" id="robot" className="e-checkbox" />
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="c-select w100-sm">
                                            <label className="e-label">Конфиденциальность</label>
                                            <div className="c-select__wrapper">
                                                <div className="c-select__trigger"><span>Не выбрано</span>
                                                    <div className="c-select__arrow">
                                                        {/* <svg width="1em" height="1em" className="icon icon-down-arrow ">
                                                            <use
                                                                xlink:href="s/images/useful/svg/theme/symbol-defs.svg#icon-down-arrow">
                                                            </use>
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div className="c-select__options"><span data-value='18'
                                                        className="c-select__option selected"></span><span data-value='19'
                                                        className="c-select__option">1</span><span data-value='20'
                                                        className="c-select__option">2</span><span data-value='21'
                                                        className="c-select__option">3</span><span data-value='22'
                                                        className="c-select__option">4</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="e-btn e-btn--filled">Создать сообщество</button>
                                    </div>
                                    <div className="c-modal-create-community__form-col">
                                        <div className="form-group">
                                            <label for="organizator" className="e-label">Город</label>
                                            <div className="form-control">
                                                <input type="text" id="organizator" name="organizator" autocomplete="off"
                                                    className="e-input" />
                                            </div>
                                        </div>
                                        <div className="c-select w100-sm">
                                            <label className="e-label">Район</label>
                                            <div className="c-select__wrapper">
                                                <div className="c-select__trigger"><span>Не выбрано</span>
                                                    <div className="c-select__arrow">
                                                        {/* <svg width="1em" height="1em" className="icon icon-down-arrow ">
                                                            <use
                                                                xlink:href="s/images/useful/svg/theme/symbol-defs.svg#icon-down-arrow">
                                                            </use>
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div className="c-select__options"><span data-value='23'
                                                        className="c-select__option selected"></span><span data-value='24'
                                                        className="c-select__option">1</span><span data-value='25'
                                                        className="c-select__option">2</span><span data-value='26'
                                                        className="c-select__option">3</span><span data-value='27'
                                                        className="c-select__option">4</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="c-select w100-sm">
                                            <label className="e-label">Округ</label>
                                            <div className="c-select__wrapper">
                                                <div className="c-select__trigger"><span>Не выбрано</span>
                                                    <div className="c-select__arrow">
                                                        {/* <svg width="1em" height="1em" className="icon icon-down-arrow ">
                                                            <use
                                                                xlink:href="s/images/useful/svg/theme/symbol-defs.svg#icon-down-arrow">
                                                            </use>
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div className="c-select__options"><span data-value='28'
                                                        className="c-select__option selected"></span><span data-value='29'
                                                        className="c-select__option">1</span><span data-value='30'
                                                        className="c-select__option">2</span><span data-value='31'
                                                        className="c-select__option">3</span><span data-value='32'
                                                        className="c-select__option">4</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="organizator" className="e-label">Адрес</label>
                                            <div className="form-control">
                                                <input type="text" id="organizator" name="organizator" autocomplete="off"
                                                    className="e-input" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}