import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import ModalUploadPhoto from './../../components/modalUploadPhoto';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';
import * as profileActions from './profile.actions';
import * as authActions from './../Auth/auth.actions';
import InputCheckBox from './../../components/inputCheckbox';
import Cookies from "cookies-js";

const EmptyPhoto = () => (
    <svg width="1em" height="1em" className="icon icon-photo">
        <use xlinkHref={`${SymbolDefs}#icon-photo`}></use>
    </svg>
);

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LP: false,
            isGreetingDisplay: false,
            isRoleDisplay: false,
            isRoleSelected: false,
            showHint: false,
            showKids: false,
            selectedRoles: []
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSelectRole = this.handleSelectRole.bind(this);
        this.submitSelectedRole = this.submitSelectedRole.bind(this);

        const { getProfileDetails } = this.props;
        let accessToken = Cookies.get("access_token");
        if (accessToken) {
            getProfileDetails();
        }


    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { profile } = this.props;
        if (nextProps) {
            this.setState({
                isRoleDisplay: nextProps.profile.data.isFirstLogin
            })
        } else {
            this.setState({
                isRoleDisplay: profile.data.isFirstLogin
            })
        }

    }

    toggleModal() {
        this.setState({
            LP: !this.state.LP
        })
    }
    handleFileChange(file) {
        const { uploadPhoto } = this.props;
        if (file) {
            uploadPhoto(file)
        }
    }
    handleLogout() {
        const { ProfileLogout } = this.props;
        ProfileLogout();
    }
    handleProfileHintHide() {
        const { ProfileHintHide, ChangeDataField } = this.props;
        ChangeDataField("isDisplayHint", false)
        ProfileHintHide();
    }
    handleSelectRole(role) {
        let selectedRoles = this.state.selectedRoles;
        if (role && selectedRoles.indexOf(role) == -1) {
            selectedRoles.push(role)
        } else if (role && selectedRoles.indexOf(role) !== -1) {
            selectedRoles.splice(selectedRoles.indexOf(role), 1);
        }

        this.setState({ selectedRoles: selectedRoles, isRoleSelected: selectedRoles && selectedRoles.length > 0 })
    }
    submitSelectedRole(skip) {
        const { ProfileChoseRole, ChangeDataField } = this.props;
        ChangeDataField("isFirstLogin", false)
        if (skip) {
            this.setState({ isRoleDisplay: false });
        } else {
            this.setState({ isRoleDisplay: false, isGreetingDisplay: true });
        }

        ProfileChoseRole();
    }
    renderRoleModal() {
        return (
            <div id="modal-select-role" tabIndex="-1" role="dialog" aria-labelledby="modal-select-role-title" aria-hidden="true" className={`modal fade c-modal-select-role ${this.state.isRoleDisplay ? 'show' : ''}`} style={{ display: this.state.isRoleDisplay ? 'block' : 'none' }}>
                <div role="document" className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => this.setState({ isRoleDisplay: false })}>
                            <svg width="1em" height="1em" className="icon icon-close ">
                                <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                            </svg>
                        </button>
                        <div className="modal-body">
                            <div className="c-modal-select-role__wrapper">
                                <h2 className="modal__title">Выберете роль :</h2>
                                <p className="modal__subtitle modal__subtitle--tac">Выберите одну или несколько ролей в системе. В дальейшем вы сможете поменять их в настройках.</p>

                                <InputCheckBox
                                    title="Родитель"
                                    tooltipTitle="Официальный представитель"
                                    tooltipText="Официальный представитель - это законный родитель ребенка. Здесь будет полноценный текст про представителя."
                                    onChoseRole={this.handleSelectRole}
                                    roleId={1}
                                />
                                <InputCheckBox
                                    title="Самозанятый"
                                    tooltipTitle="Репетитор"
                                    tooltipText="Репетитор - это законный родитель ребенка. Здесь будет полноценный текст про представителя."
                                    onChoseRole={this.handleSelectRole}
                                    roleId={2}
                                />
                                <InputCheckBox
                                    title="Сотрудник"
                                    tooltipTitle="Сотрудник учреждения"
                                    tooltipText="Сотрудник учреждения - это законный родитель ребенка. Здесь будет полноценный текст про представителя."
                                    onChoseRole={this.handleSelectRole}
                                    roleId={3}
                                />
                                <button className="e-btn e-btn--filled c-modal-select-role__next" disabled={!this.state.isRoleSelected} onClick={() => this.submitSelectedRole(false)}>Продолжить</button>
                                <button data-dismiss="modal" aria-label="Close" className="e-btn--clear c-modal-select-role__skip" onClick={() => this.submitSelectedRole(true)}>Пропустить</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    renderGreetingModal() {
        return (
            <div id="modal-welcome" tabIndex="-1" role="dialog" aria-labelledby="modal-welcome-title" aria-hidden="true" className={`modal fade c-modal-welcome ${this.state.isGreetingDisplay ? 'show' : ''}`} style={{ display: this.state.isGreetingDisplay ? 'block' : 'none' }}>
                <div role="document" className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => this.setState({ isGreetingDisplay: false })}>
                            <svg width="1em" height="1em" className="icon icon-close ">
                                <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                            </svg>
                        </button>
                        <div className="modal-body">
                            <div className="c-modal-welcome__wrapper">
                                <h2 className="modal__title">Добро пожаловать!</h2>
                                <p className="modal__subtitle modal__subtitle--tac">Здесь будет большой текст с приветствием для пользователя. Здесь будет большой текст с приветствием для пользователя. Здесь будет большой текст с приветствием для пользователя.</p>
                                <button type="button" data-dismiss="modal" aria-label="Close" className="e-btn e-btn--filled e-btn--mt5" onClick={() => this.setState({ isGreetingDisplay: false })}>Продолжить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
    render() {
        const { profile } = this.props;
        let isOpenModal = this.state.LP;
        return (
            <div className="c-my-page">
                <h2 className="e-title--md">Моя страница</h2>
                <div className="c-my-page__wrapper">
                    <div className="c-my-page__user c-my-page-user">
                        <button type="button" data-toggle="modal" data-target="#modal-file-load" className="c-my-page-user__change-img h-object-fit" onClick={() => this.setState({ LP: true })}>
                            {
                                profile.data.mainPhoto ?
                                    <img src={profile.data.mainPhoto} alt="" className="c-my-page-user__img" />
                                    : <EmptyPhoto />
                            }

                        </button>

                        <div className="c-my-page-user__desc">
                            <b className="c-my-page-user__title">{profile.data.name + " " + profile.data.surname}</b>
                            <span className="c-my-page-user__city">{profile.data.city}</span>
                        </div>
                        <button type="button" className="c-my-page-user__options">
                            <svg width="1em" height="1em" className="icon icon-border-down ">
                                <use xlinkHref={`${SymbolDefs}#icon-border-down`}></use>
                            </svg>
                            <div className="c-my-page-user__options-list">
                                <div className="c-my-page-user__options-items">
                                    <a href="/settings" className="c-my-page-user__options-item">Редактировать профиль</a>
                                    <a href="/auth" onClick={() => this.handleLogout()} className="c-my-page-user__options-item">Выйти из профиля</a>
                                </div>
                            </div>
                        </button>
                    </div>

                    {
                        profile.data.isDisplayHint &&
                        <div className="c-my-page__hint c-my-page-hint">
                            <div className="c-my-page-hint__head">
                                <h3 className="c-my-page-hint__title">Подсказка</h3>
                                <button type="button" className="c-my-page-hint__remove" onClick={() => this.handleProfileHintHide()}>
                                    <svg width="1em" height="1em" className="icon icon-border-close ">
                                        <use xlinkHref={`${SymbolDefs}#icon-border-close`}></use>
                                    </svg>
                                </button>
                            </div>
                            <p className="c-my-page-hint__text">
                                Перейдите в настройки и выберите одну или несколько ролей для более расширенного функционала: родитель - сможет добавлять своих детей, самозанятый и сотрудник - создавать сообщества и события.
                            </p>
                        </div>
                    }

                    <div className="c-my-page__info c-my-page-info">
                        <div className="c-my-page-info__head">
                            <b className="c-my-page-info__title">Информация</b>
                            {/*<a href="" className="c-my-page-info__edit">ред.</a>*/}
                        </div>

                        <div className="c-my-page-info__list">
                            {
                                (profile.data.children && profile.data.children.length > 0) ?
                                    profile.data.children.map((item, i) => {
                                        return (
                                            <div className="c-my-page-info__item c-my-page-info-item" key={i}>
                                                <a href="#" className="c-my-page-info-item__information">{item.name}, {item.age}</a>
                                                <span className="c-my-page-info-item__specialize">{item.careers}</span>
                                            </div>
                                        );
                                    })
                                    : <div className="c-my-page-info__item c-my-page-info-item c-my-page-info__empty c-my-page-info-empty">
                                        <svg width="1em" height="1em" className="icon icon-community ">
                                            <use xlinkHref={`${SymbolDefs}#icon-community`}></use>
                                        </svg>
                                        <span className="c-my-page-info-empty__txt">Добавьте информацию о ваших детях</span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                {
                    isOpenModal && <ModalUploadPhoto onFileSelected={this.handleFileChange} toggleModal={this.toggleModal} modal={true} step={1} onClose={() => this.setState({ LP: false })} />
                }
                {this.renderGreetingModal()}
                {this.renderRoleModal()}
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { ...profileActions, ...authActions },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);