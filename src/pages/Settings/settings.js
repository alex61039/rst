import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as settingsActions from './settings.actions';
import * as authActions from './../Auth/auth.actions';
import * as dictionaryActions from './../Dictionary/dictionary.actions';
import * as childrenActions from './../Children/children.actions';
import InputPublic from '../../components/inputPublic';
import Select from '../../components/select';
import InputPhone from './../../components/inputPhone';
import InputAutoCompete from '../../components/inputAutoComplete';
import ModalChildInfo from './../../components/modalChildInfo';
import ModalPasswordChange from './../../components/modalPasswordChange';
import ModalDeleteChild from './../../components/modals/modalDeleteChild';
import EmptyBlock from './../../components/emptyBlock';
import InputCheckBox from './../../components/inputCheckbox';
import { ReactComponent as BorderDown } from "./../../assets/images/useful/svg/border-down.svg";
import { ValidateTextField, ValidateEmailField, ValidatePhoneField } from './../../utils/validation';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "personal",
            isDistrictSelected: false,
            isCitySelected: false,
            isRegisterValid: false,
            selectedCity: 0,
            selectedDistrict: 0,
            selectedMunicipal: 0,
            registerPassword: "",
            registerConfirmPassword: "",
            nameValid: true,
            surnameValid: true,
            passwordValid: true,
            confirmPasswordValid: true,
            emailValid: true,
            phoneValid: true,
            cityValid: true,
            districtValid: true,
            municipalValid: true,
            modalChildInfoDisplay: false,
            modalPasswordDisplay: false,
            modalDeleteChildDisplay: false,
            selectedChildIdToDelete: 0,
            errors: {
                name: '',
                surname: '',
                password: '',
                confirmPassword: '',
                email: '',
                phone: '',
                city: '',
                district: '',
                municipal: ''
            }
        }

        const { SettingsEditGet, ListCities, ListDistricts, ListMunicipalUnions, ListChildren, ListCareerDirections, SettingsListRoles } = this.props;
        SettingsEditGet();
        ListCities();
        ListDistricts();
        ListMunicipalUnions();
        ListChildren();
        ListCareerDirections();
        SettingsListRoles();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitPasswordChange = this.handleSubmitPasswordChange.bind(this);
        this.handleChangeChildField = this.handleChangeChildField.bind(this);
        this.handleSubmitNewChild = this.handleSubmitNewChild.bind(this);
        this.handleDeleteChild = this.handleDeleteChild.bind(this);
        this.handleSelectRole = this.handleSelectRole.bind(this);
        this.handleSubmitRole = this.handleSubmitRole.bind(this);
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const { SettingsChangeDataField } = this.props;
        SettingsChangeDataField(name, value);

        let fieldValidationErrors = this.state.errors;

        switch (name) {
            case "name":
                let validationNameResult = ValidateTextField(value);
                this.setState({ nameValid: validationNameResult.isValid })
                fieldValidationErrors.name = validationNameResult.message;
                break;
            case "surname":
                let validationSurnameResult = ValidateTextField(value);
                this.setState({ surnameValid: validationSurnameResult.isValid })
                fieldValidationErrors.surname = validationSurnameResult.message;
                break;
            case "email":
                let validationEmailResult = ValidateEmailField(value);
                this.setState({ emailValid: validationEmailResult.isValid })
                fieldValidationErrors.email = validationEmailResult.message;
                break;
            case 'phone':
                let validationPhoneResult = ValidatePhoneField(value);
                this.setState({ phoneValid: validationPhoneResult.isValid })
                fieldValidationErrors.phone = validationPhoneResult.message;
                break;
            default:
                break;
        }

        this.setState({ errors: fieldValidationErrors });
    }

    handleSelectChange(field, e) {
        const { SettingsChangeDataField } = this.props;
        if (field === 'cityId') {
            SettingsChangeDataField(field, 1);
        } else {
            SettingsChangeDataField(field, e.value);
        }
    }

    handleSubmit() {
        const { SettingsEditSubmit, settings } = this.props;
        SettingsEditSubmit(settings.data);
    }

    handleSubmitPasswordChange(oldPassword, password, confirmPassword) {
        const { ChangePassword } = this.props;
        ChangePassword("", oldPassword, password, confirmPassword)
    }

    handleChangeChildField(field, value) {
        const { ChangeDataField, children } = this.props;
        if (field === "careers") {
            let careers = children.data.careers;
            for (let i = 0; i < value.length; i++) {
                let indexOf = careers.findIndex((f) => f.id === value[i].id);
                if (indexOf === -1) {
                    careers.push(value[i]);
                } else {
                    careers.splice(indexOf, 1)
                }
            }
            ChangeDataField(field, careers);
        } else {
            ChangeDataField(field, value);
        }
    }

    handleSubmitNewChild() {
        const { children, AddChild, EditChild, ResetChildData } = this.props;
        if (children.data.id) {
            EditChild(children.data)
        } else {
            AddChild(children.data)
        }
        ResetChildData();
    }

    handleCloseChildInfo() {
        const { ResetChildData } = this.props;
        this.setState({ modalChildInfoDisplay: false })
        ResetChildData();
    }

    handleConfirmDeleteChild(id) {
        this.setState({ selectedChildIdToDelete: id, modalDeleteChildDisplay: true })
    }

    handleDeleteChild(id) {
        const { DeleteChild } = this.props;
        this.setState({ selectedChildIdToDelete: 0, modalDeleteChildDisplay: false })
        DeleteChild(id);
    }

    handleEditChild(id) {
        const { GetChildren } = this.props;
        GetChildren(id);
        this.setState({ modalChildInfoDisplay: true })
    }

    handleSelectRole(role) {
        const { SettingsChangeRoleField, settings } = this.props;
        SettingsChangeRoleField(role, !settings.role[role])
    }

    handleSubmitRole() {
        const { SettingsSubmitRole, settings } = this.props;
        SettingsSubmitRole(settings.role);
    }

    renderTabs() {
        return (
            <ul id="settingsyNav" role="tablist" className="nav">
                <li className="nav-item"><a id="personal-tab" data-toggle="tab" href="#personal" role="tab" aria-controls="personal" onClick={() => this.setState({ activeTab: 'personal' })} aria-selected={this.state.activeTab === 'personal' ? "true" : "false"} className={`nav-link ${this.state.activeTab === 'personal' ? "active" : ""}`}>Персональные</a></li>
                <li className="nav-item"><a id="children-tab" data-toggle="tab" href="#children" role="tab" aria-controls="children" onClick={() => this.setState({ activeTab: 'children' })} aria-selected={this.state.activeTab === 'children' ? "true" : "false"} className={`nav-link ${this.state.activeTab === 'children' ? "active" : ""}`}>Дети</a></li>
                <li className="nav-item"><a id="role-tab" data-toggle="tab" href="#role" role="tab" aria-controls="role" onClick={() => this.setState({ activeTab: 'role' })} aria-selected={this.state.activeTab === 'role' ? "true" : "false"} className={`nav-link ${this.state.activeTab === 'role' ? "active" : ""}`}>Роль в системе</a></li>
            </ul>
        );
    }

    renderPersonal() {
        const { settings, dictionary } = this.props;
        let selectedDistrict = dictionary.dictionaries.find(t => t.id == settings.data.districtId)
        let filteredDistricts = settings.data.districtId !== 0 ? dictionary.districts.filter(t => t.districtId == settings.data.districtId) : dictionary.districts;
        let selectedMunicipal = filteredDistricts.find(t => t.id == settings.data.municipalUnionId)
        return (
            <>
                <ModalPasswordChange
                    isDisplay={this.state.modalPasswordDisplay}
                    onClosePasswordModal={() => this.setState({ modalPasswordDisplay: false })}
                    submitPasswordChange={this.handleSubmitPasswordChange}
                />
                <div id="personal" role="tabpanel" aria-labelledby="personal-tab" className={`tab-pane fade show ${this.state.activeTab === 'personal' ? 'active' : 'hide'}`}>
                    <div className="c-settings__head">
                        <b className="c-settings__title">ID {settings.data.personalNumber}</b>
                        <a href="#" className="c-settings__action" onClick={() => this.setState({ modalPasswordDisplay: true })}>Сменить пароль</a>
                    </div>
                    <form className="c-settings__form c-settings-form">
                        <div className="c-settings-form__wrapper">
                            <div className="c-settings-form__column">
                                <InputPublic
                                    title={'Имя'}
                                    name={'name'}
                                    type={'text'}
                                    placeholder={''}
                                    error={!this.state.nameValid}
                                    errorText={this.state.errors.name}
                                    onChange={this.handleInputChange}
                                    data={settings.data.name}
                                />
                                <InputPublic
                                    title={'Фамилия'}
                                    name={'surname'}
                                    type={'text'}
                                    placeholder={''}
                                    error={!this.state.surnameValid}
                                    errorText={this.state.errors.surname}
                                    onChange={this.handleInputChange}
                                    data={settings.data.surname}
                                />
                                <InputPublic
                                    title={'Email'}
                                    name={'email'}
                                    type={'text'}
                                    placeholder={''}
                                    error={!this.state.emailValid}
                                    errorText={this.state.errors.email}
                                    onChange={this.handleInputChange}
                                    data={settings.data.email}
                                />

                                <InputPhone
                                    title={'Телефон'}
                                    name={'phone'}
                                    type={'number'}
                                    placeholder={''}
                                    error={!this.state.phoneValid}
                                    errorText={this.state.errors.phone}
                                    onChange={this.handleInputChange}
                                    data={settings.data.phone}
                                />
                            </div>
                            <div className="c-settings-form__column">
                                <InputAutoCompete
                                    title={'Город'}
                                    name={'cityId'}
                                    type={'text'}
                                    placeholder={'Начните вводить'}
                                    data={[
                                        { id: 1, label: 'Санкт-Петербург' }
                                    ]}
                                    selectedValue={settings.data.cityId}
                                    onChange={(e) => this.handleSelectChange("cityId", e)}
                                    error={!this.state.selectedCityValid}
                                    errorText={this.state.errors.city} />
                                <Select
                                    title={'Район'}
                                    name='districtId'
                                    selectedValue={selectedDistrict ? { value: selectedDistrict.id, label: selectedDistrict.name } : {}}
                                    data={dictionary.dictionaries}
                                    onChange={(e) => this.handleSelectChange("districtId", e)}
                                    error={!this.state.districtValid}
                                    errorText={this.state.errors.district}
                                />
                                <div className="c-entry__line">
                                    <Select
                                        title={'Округ'}
                                        name='municipalUnionId'
                                        selectedValue={selectedMunicipal ? { value: selectedMunicipal.id, label: selectedMunicipal.name } : {}}
                                        data={filteredDistricts}
                                        onChange={(e) => this.handleSelectChange("municipalUnionId", e)}
                                        error={!this.state.municipalValid}
                                        errorText={this.state.errors.municipal}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="c-settings-form__btn-wrapper">
                            <div className="c-settings-form__column">
                                <button type="button" className="e-btn e-btn--filled c-settings-form__btn" onClick={() => this.handleSubmit()}>Сохранить</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    renderChildren() {
        const { children, dictionary, settings } = this.props;
        return (
            <>
                <ModalDeleteChild
                    isDisplay={this.state.modalDeleteChildDisplay}
                    selectedId={this.state.selectedChildIdToDelete}
                    onClose={() => this.setState({ modalDeleteChildDisplay: false, selectedChildIdToDelete: 0 })}
                    onSubmit={this.handleDeleteChild}
                />
                <ModalChildInfo
                    isDisplay={this.state.modalChildInfoDisplay}
                    onCloseChildInfoModal={this.handleCloseChildInfo.bind(this)}
                    careerDirections={dictionary.careerDirections}
                    data={children.data}
                    onChangeField={this.handleChangeChildField}
                    onSubmit={this.handleSubmitNewChild}
                />
                <div id="children" role="tabpanel" aria-labelledby="children-tab" className={`tab-pane fade show ${this.state.activeTab === 'children' ? 'active' : 'hide'}`}>
                    <div className="c-settings__children c-settings-children">
                        <div className="c-settings-children__modals">
                            <button type="button" className="e-btn e-btn--plus" onClick={() => this.setState({ modalChildInfoDisplay: true })}>Добавить ребенка</button>
                        </div>
                        <div className="c-settings-children__list">
                            {
                                children.list.length === 0 ?
                                    <EmptyBlock />
                                    :
                                    children.list.map((item, i) => {
                                        return (
                                            <div className="c-settings-children__item c-settings-children-item" key={i}>
                                                <div className="c-settings-children-item__info"><b className="c-settings-children-item__title">{item.name}, {item.age}</b><span className="c-settings-children-item__id">ID: {item.personalNumber}</span></div>
                                                <div className="c-edit__wrapper">
                                                    <button type="button" className="c-edit">
                                                        <BorderDown />
                                                        <div className="c-edit__options">
                                                            <div className="c-edit__items">
                                                                <a href="#" onClick={() => this.handleEditChild(item.id)} className="c-edit__item">Редактировать</a>
                                                                <a href="#" onClick={() => this.handleConfirmDeleteChild(item.id)} className="c-edit__item">Удалить</a>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                            }
                        </div>
                    </div >
                </div >
            </>
        );
    }

    renderRole() {
        const { settings } = this.props;
        return (
            <div id="role" role="tabpanel" aria-labelledby="role-tab" className={`tab-pane fade show ${this.state.activeTab === 'role' ? 'active' : 'hide'}`}>
                <form className="c-settings__form c-settings-form c-settings-form--roles">
                    <div className="c-settings-form__wrapper">
                        <div className="c-settings-form__column">
                            <InputCheckBox
                                title="Родитель"
                                tooltipTitle="Официальный представитель"
                                tooltipText="Официальный представитель - это законный родитель ребенка. Здесь будет полноценный текст про представителя."
                                onChoseRole={this.handleSelectRole}
                                roleId="isParentRole"
                                isSelected={settings.role.isParentRole}
                            />
                            <InputCheckBox
                                title="Самозанятый"
                                tooltipTitle="Репетитор"
                                tooltipText="Репетитор - это законный родитель ребенка. Здесь будет полноценный текст про представителя."
                                onChoseRole={this.handleSelectRole}
                                roleId="isSelfEmployeeRole"
                                isSelected={settings.role.isSelfEmployeeRole}
                            />
                        </div>
                        <div className="c-settings-form__column">
                            <InputCheckBox
                                title="Сотрудник"
                                tooltipTitle="Сотрудник учреждения"
                                tooltipText="Сотрудник учреждения - это законный родитель ребенка. Здесь будет полноценный текст про представителя."
                                onChoseRole={this.handleSelectRole}
                                roleId="isEmployeeRole"
                                isSelected={settings.role.isEmployeeRole}
                            />
                        </div>
                    </div >
                    <div className="c-settings-form__btn-wrapper">
                        <div className="c-settings-form__column">
                            <button type="button" className="e-btn e-btn--filled c-settings-form__btn" onClick={() => this.handleSubmitRole()}>Сохранить</button>
                        </div>
                    </div>
                </form >
            </div >
        );
    }

    render() {
        return (
            <>
                <div className="c-settings">
                    <h2 className="e-title--md">Настройки</h2>
                    <div className="c-settings__wrapper">
                        <div className="c-settings__nav e-nav-line">
                            {this.renderTabs()}
                            <div id="settingsyNavContent" className="tab-content">
                                {this.renderPersonal()}
                                {this.renderChildren()}
                                {this.renderRole()}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        settings: state.settings,
        dictionary: state.dictionary,
        children: state.children
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { ...settingsActions, ...authActions, ...dictionaryActions, ...childrenActions },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);