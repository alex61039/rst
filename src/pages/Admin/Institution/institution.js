import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as institutionsActions from './institution.actions';
import * as dictionaryActions from './../../Dictionary/dictionary.actions';
import SymbolDefs from './../../../assets/images/useful/svg/theme/symbol-defs.svg';
import InstitutionInfo from './institution.info';
import ModalAddAmin from './../../../components/modals/modalAddAdmin';
import ModalVerifyUser from './../../../components/modals/modalVerifyUser';
import ModalAddInstitution from './../../../components/modals/modalAddInstitution';
import ModalConfirmDelete from './../../../components/modals/modalConfirmDelete';
import { ReactComponent as InstitutionIcon } from "./../../../assets/images/useful/svg/institution.svg";
import InstitutionEmployee from './institution.employee';
import { ActionIsAllowed } from './../../../utils/permission';
import * as ActionType from './../../../constants/actionType';

class Institution extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "info",
            id: 0,
            isModalAdminDisplay: false,
            isModalVerifyUserDisplay: false,
            modalAddInstitutionDisplay: false,
            isModalDeleteDisplay: false,
        }

        const { ListCities, ListDistricts, ListMunicipalUnions } = this.props;

        ListCities();
        ListDistricts();
        ListMunicipalUnions();
    }

    UNSAFE_componentWillReceiveProps(nextProps, context) {
        if (nextProps.institution.data.adminUser !== this.props.institution.data.adminUser) {
            this.props.ListEmployees(this.state.id)
        }
    }

    componentDidMount() {
        const { GetInstitution, ListEmployees } = this.props;
        let param = new URLSearchParams(this.props.match.params)
        this.setState({
            id: param.get("id")
        })
        GetInstitution(param.get("id"))
        ListEmployees(param.get("id"))
    }

    handleSelectParent() {

    }

    handleChangeTab(name) {
        const { GetInstitution, ListEmployees } = this.props;
        this.setState({ activeTab: name })
        if (name === "info") {
            GetInstitution(this.state.id)
        } else if (name === "workers") {
            ListEmployees(this.state.id)
        }
    }

    handleAddGlobalAmin(name) {
        const { institution, AddAdmin } = this.props;
        AddAdmin(institution.data.id, name, "GlobalAdmin")
        this.setState({ isModalAdminDisplay: false })
    }

    handleAddUser(name, position) {
        const { institution, AddEmployee, ListEmployees } = this.props;
        AddEmployee(institution.data.id, name, "Employee", position)
        this.setState({ isModalVerifyUserDisplay: false })
        ListEmployees(institution.data.id)
    }

    handleSetAdmin(name) {
        const { institution, UpdateEmployee } = this.props;
        UpdateEmployee(institution.data.id, name, "Admin")
    }

    handleDeleteEmployee(userId) {
        const { DeleteEmployee, institution } = this.props;
        DeleteEmployee(institution.data.id, userId)
    }

    handleDeleteInstitution() {
        const { DeleteInstitution, institution } = this.props;
        DeleteInstitution(institution.data.id)
    }

    handleOnChangeInstitutionField(e) {
        const { ChangeDataField } = this.props;
        ChangeDataField(e.target.name, e.target.value);
    }

    handleOnChangeInstitutionSelect(field, e) {
        const { ChangeDataField } = this.props;
        ChangeDataField(field, e.value);
    }

    handleOnSubmitInstitution() {
        const { EditInstitution, institution } = this.props;
        EditInstitution(institution.data)
        this.setState({ modalAddInstitutionDisplay: false });
    }

    renderInfo() {
        const { institution, auth } = this.props;
        return (
            <div id="info" role="tabpanel" aria-labelledby="info-tab" class={`tab-pane fade ${this.state.activeTab === 'info' ? 'show active' : 'hide'}`}>
                <div class="c-institutions-page__lead c-institutions-page-lead">
                    <div class="c-institutions-page-lead__change-img">
                        {
                            institution.data.mainPhoto ? <img src={institution.data.mainPhoto} class="c-institutions-page-lead__img" /> : <InstitutionIcon class="c-institutions-page-lead__img" />
                        }
                    </div>
                    <div class="c-institutions-page-lead__desc">
                        {
                            institution.data.adminUser ?
                                <b class="c-institutions-page-lead__name">{institution.data.adminUser}</b>
                                :
                                ActionIsAllowed(ActionType.IS_ALLOW_SET_GLOBAL_ADMIN, auth) ?
                                    <b class="c-institutions-page-lead__name" style={{ cursor: "pointer" }} onClick={() => this.setState({ isModalAdminDisplay: true })}>Назначить руководителя</b>
                                    : <b class="c-institutions-page-lead__name">Назначить руководителя</b>
                        }
                        <span class="c-institutions-page-lead__section">Главный администратор учреждения</span>
                    </div>
                </div>
                <InstitutionInfo data={institution.data} />
            </div>
        );
    }

    renderWorkers() {
        const { institution, auth } = this.props;
        return (
            <div id="workers" role="tabpanel" aria-labelledby="workers-tab" class={`tab-pane fade ${this.state.activeTab === 'workers' ? 'show active' : 'hide'}`}>
                <div class="c-institutions-page__modals">
                    {
                        ActionIsAllowed(ActionType.IS_ALLOW_VERIFY_USER, auth) && <button type="button" class="e-btn e-btn--plus" onClick={() => this.setState({ isModalVerifyUserDisplay: true })}>Верифицировать</button>
                    }
                </div>
                <InstitutionEmployee
                    data={institution.employees}
                    onSetAdmin={this.handleSetAdmin.bind(this)}
                    onDelete={this.handleDeleteEmployee.bind(this)}
                    isAllowChangeRole={ActionIsAllowed(ActionType.IS_ALLOW_CHANGE_ROLE, auth)}
                    isAllowDelete={ActionIsAllowed(ActionType.IS_ALLOW_SET_GLOBAL_ADMIN, auth)}
                    isAllowSetGlobalAdmin={ActionIsAllowed(ActionType.IS_ALLOW_SET_GLOBAL_ADMIN, auth)} />
            </div >
        );
    }

    renderCommunity() {
        return (
            <div id="community" role="tabpanel" aria-labelledby="community-tab" class={`tab-pane fade ${this.state.activeTab === 'community' ? 'show active' : 'hide'}`}>
                <div class="c-institutions-page__modals">
                    <button type="button" class="e-btn e-btn--plus">Привязать</button>
                </div>
                <div class="c-institutions-page__lists">
                    <div class="c-event-item">
                        <div class="c-event-item__img"><img src="s/images/tmp_file/community.jpg" alt="" />
                        </div>
                        <div class="c-event-item__info"><a href="#" class="c-event-item__title">Кастинг для танца</a><span class="c-event-item__subtitle">Футбол</span>
                        </div>
                        <div class="c-edit__wrapper">
                            <button type="button" class="c-edit">
                                <svg width="1em" height="1em" className="icon icon-border-down">
                                    <use xlinkHref={`${SymbolDefs}#icon-border-down`}></use>
                                </svg>
                                <div class="c-edit__options">
                                    <div class="c-edit__items"><a href="#" class="c-edit__item">Отвязать от учреждения</a>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="c-event-item">
                        <div class="c-event-item__img"><img src="s/images/tmp_file/community.jpg" alt="" />
                        </div>
                        <div class="c-event-item__info"><a href="#" class="c-event-item__title">Кастинг для танца</a><span class="c-event-item__subtitle">Футбол</span>
                        </div>
                    </div>
                    <div class="c-event-item">
                        <div class="c-event-item__img"><img src="s/images/tmp_file/community.jpg" alt="" />
                        </div>
                        <div class="c-event-item__info"><a href="#" class="c-event-item__title">Кастинг для танца</a><span class="c-event-item__subtitle">Футбол</span>
                        </div>
                        <div class="c-edit__wrapper">
                            <button type="button" class="c-edit">
                                <svg width="1em" height="1em" className="icon icon-border-down">
                                    <use xlinkHref={`${SymbolDefs}#icon-border-down`}></use>
                                </svg>
                                <div class="c-edit__options">
                                    <div class="c-edit__items"><a href="#" class="c-edit__item">Отвязать от учреждения</a>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="c-event-item">
                        <div class="c-event-item__img"><img src="s/images/tmp_file/community.jpg" alt="" />
                        </div>
                        <div class="c-event-item__info"><a href="#" class="c-event-item__title">Кастинг для танца</a><span class="c-event-item__subtitle">Футбол</span>
                        </div>
                        <div class="c-edit__wrapper">
                            <button type="button" class="c-edit">
                                <svg width="1em" height="1em" className="icon icon-border-down">
                                    <use xlinkHref={`${SymbolDefs}#icon-border-down`}></use>
                                </svg>
                                <div class="c-edit__options">
                                    <div class="c-edit__items"><a href="#" class="c-edit__item">Отвязать от учреждения</a>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div >
                </div >
            </div >
        );
    }

    renderEvents() {
        return (
            <div id="events" role="tabpanel" aria-labelledby="events-tab" class={`tab-pane fade ${this.state.activeTab === 'events' ? 'show active' : 'hide'}`}>
                <div class="c-institutions-page__lists">
                    <div class="c-event-item">
                        <div class="c-event-item__img"><img src="s/images/tmp_file/community.jpg" alt="" />
                        </div>
                        <div class="c-event-item__info"><a href="#" class="c-event-item__title">Финал “Кубка чемпионов”</a><span class="c-event-item__date">18.03.2020 20:30</span><span class="c-event-item__subtitle">Футбольная школа “Смена”</span>
                        </div>
                    </div>
                    <div class="c-event-item">
                        <div class="c-event-item__img"><img src="s/images/tmp_file/community.jpg" alt="" />
                        </div>
                        <div class="c-event-item__info"><a href="#" class="c-event-item__title">Битва роботов</a><span class="c-event-item__date">05.02.2020 19:23</span><span class="c-event-item__subtitle">Робототехника</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderTabs() {
        const { institution } = this.props;
        return (
            <ul id="institutionsNav" role="tablist" class="nav">
                <li class="nav-item"><a id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info" onClick={() => this.handleChangeTab('info')} aria-selected={this.state.activeTab === 'info' ? "true" : "false"} class={`nav-link ${this.state.activeTab === 'info' ? "active" : ""}`}>Инфо</a></li>
                <li class="nav-item"><a id="workers-tab" data-toggle="tab" href="#workers" role="tab" aria-controls="workers" onClick={() => this.setState({ activeTab: 'workers' })} aria-selected={this.state.activeTab === 'workers' ? "true" : "false"} class={`nav-link ${this.state.activeTab === 'workers' ? "active" : ""}`}>Сотрудники<span class="count">({institution.employees ? institution.employees.length : 0})</span></a></li>
                {
                    /*
                        <li class="nav-item"><a id="community-tab" data-toggle="tab" href="#community" role="tab" aria-controls="community" onClick={() => this.setState({ activeTab: 'community' })} aria-selected={this.state.activeTab === 'community' ? "true" : "false"} class={`nav-link ${this.state.activeTab === 'community' ? "active" : ""}`}>Сообщества <span class="count">(5)</span></a></li>
                        <li class="nav-item"><a id="events-tab" data-toggle="tab" href="#events" role="tab" aria-controls="events" onClick={() => this.setState({ activeTab: 'events' })} aria-selected={this.state.activeTab === 'events' ? "true" : "false"} class={`nav-link ${this.state.activeTab === 'events' ? "active" : ""}`}>События <span class="count">(1)</span></a></li>
                    */
                }
            </ul>
        );
    }

    renderModals() {
        const { dictionary, institution } = this.props;
        return (
            <>
                <ModalVerifyUser
                    isDisplay={this.state.isModalVerifyUserDisplay}
                    onClose={() => this.setState({ isModalVerifyUserDisplay: false })}
                    onSubmit={this.handleAddUser.bind(this)}
                />
                <ModalAddAmin
                    isDisplay={this.state.isModalAdminDisplay}
                    onClose={() => this.setState({ isModalAdminDisplay: false })}
                    onSubmit={this.handleAddGlobalAmin.bind(this)}
                />
                <ModalConfirmDelete
                    isDisplay={this.state.isModalDeleteDisplay}
                    onClose={() => this.setState({ isModalDeleteDisplay: false })}
                    onSubmit={this.handleDeleteInstitution.bind(this)}
                    title="Удалить учреждение"
                    text="Вы действительно хотите удалить учреждение"
                />
                <ModalAddInstitution
                    isDisplay={this.state.modalAddInstitutionDisplay}
                    onClose={() => this.setState({ modalAddInstitutionDisplay: false })}
                    onSubmit={this.handleOnSubmitInstitution.bind(this)}
                    onChangeField={this.handleOnChangeInstitutionField.bind(this)}
                    onSelect={this.handleOnChangeInstitutionSelect.bind(this)}
                    districts={dictionary.dictionaries}
                    municipalUnions={dictionary.districts}
                    data={institution.data}
                    actionTitle="Сохранить учреждение"
                />
            </>
        );
    }

    render() {
        const { institution } = this.props;
        console.log(institution)
        return (
            <>
                {this.renderModals()}
                <div class="col-md-6 col-sm-10">
                    <div class="main-content">
                        <div class="c-institutions-page">
                            <h2 class="e-title--md">Учреждение</h2>
                            <div class="c-institutions-page__wrapper">
                                <div class="c-institutions-page__user c-institutions-page-user">
                                    <div class="c-institutions-page-user__change-img">
                                        <div class="c-institutions-page-user__empty-img"></div>
                                    </div>
                                    <div class="c-institutions-page-user__desc">
                                        <b class="c-institutions-page-user__name">{institution.data.name}</b>
                                        <span class="c-institutions-page-user__section">{institution.data.city}</span>
                                    </div>
                                    <div class="c-edit__wrapper">
                                        <button type="button" class="c-edit">
                                            <svg width="1em" height="1em" className="icon icon-border-down">
                                                <use xlinkHref={`${SymbolDefs}#icon-border-down`}></use>
                                            </svg>
                                            <div class="c-edit__options">
                                                <div class="c-edit__items">
                                                    <a href="#" onClick={() => this.setState({ modalAddInstitutionDisplay: true })} class="c-edit__item">Ред. учреждение</a>
                                                    <a href="#" onClick={() => this.setState({ isModalDeleteDisplay: true })} class="c-edit__item">Удалить учреждение</a>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div class="c-institutions-page__nav">
                                    <h3 class="c-institutions-page__title">Главная </h3>
                                    <div class="e-nav-line">
                                        {this.renderTabs()}
                                        <div id="institutionsNavContent" class="tab-content">
                                            {this.renderInfo()}
                                            {this.renderWorkers()}
                                            {this.renderCommunity()}
                                            {this.renderEvents()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="right-side">
                        <div className="c-structure-sidebar">

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        institution: state.institution,
        dictionary: state.dictionary,
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { ...institutionsActions, ...dictionaryActions },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Institution);