import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { ListActiveCommunities, ListArchiveCommunities } from './communities.worker.actions';
import { ModalAddCommunity } from '../../../components/modals/modalAddCommunity';
import SymbolDefs from '../../../assets/images/useful/svg/theme/symbol-defs.svg';

export class CommunitiesWorker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'my-tab',
            modalAddCommunityDisplay: false
        }
        
    }

    componentDidMount = () => {
        this.props.ListActiveCommunities();
        this.props.ListArchiveCommunities(); 
    } 

    renderTabs() {
        return (
            <ul id="workplaceNav" role="tablist" className="nav">
                <li className="nav-item">
                    <a id="my-tab" 
                        data-toggle="tab" 
                        href="#my" 
                        role="tab" 
                        aria-controls="my" 
                        className={`nav-link ${this.state.activeTab === 'my-tab' ? "active" : ""}`}
                        aria-selected={this.state.activeTab === 'my-tab' ? "true" : "false"}
                        onClick={() => this.setState({ activeTab: 'my-tab' })} >
                            Мои<span className="count">{ this.props.activeCommunities && this.props.activeCommunities.length > 0 ? `(${this.props.activeCommunities.length})` : '' }</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a id="archive-tab" 
                        data-toggle="tab" 
                        href="#archive" 
                        role="tab" 
                        aria-controls="archive" 
                        className={`nav-link ${this.state.activeTab === 'archive-tab' ? "active" : ""}`}
                        aria-selected={this.state.activeTab === 'archive-tab' ? "true" : "false"}
                        onClick={() => this.setState({ activeTab: 'archive-tab' })}>
                            Архив<span className="count">{ this.props.archiveCommunities && this.props.archiveCommunities.length > 0 ? `(${this.props.subscarchiveCommunitiesriptions.length})` : '' }</span>
                    </a>
                </li>
            </ul>
        )
    }

    renderActiveCommunities() {
        return (
            <div id="my" role="tabpanel" aria-labelledby="my-tab" className={`tab-pane fade show ${this.state.activeTab === 'my-tab' ? 'active' : 'hide' }`}>
                { (() => {
                    if (this.props.activeCommunities.length > 0) {
                        return this.props.activeCommunities.map(community =>
                            <div className="c-event-item" key={ community.id }>
                                <div className="c-event-item__img">
                                    {/* <img src="s/images/tmp_file/community.jpg" alt="" /> */}
                                </div>
                                <div className="c-event-item__info">
                                    <a href="#" className="c-event-item__title">{ community.name }</a>
                                    <span className="c-event-item__subtitle">{ community.career }</span>
                                </div>
                                <div className="c-edit__wrapper">
                                    <button type="button" className="c-edit">
                                        <svg width="1em" height="1em" className="icon icon-border-down ">
                                            <use xlinkHref={ `${SymbolDefs}#icon-border-down` }></use>
                                        </svg>
                                        <div className="c-edit__options">
                                            <div className="c-edit__items">
                                                <a href="#" className="c-edit__item">Убрать в архив</a>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="c-empty-block">
                                <div className="c-empty-block__ico">
                                    <svg width="1em" height="1em" className="icon icon-community ">
                                        <use xlinkHref={ `${SymbolDefs}#icon-community` }></use>
                                    </svg>
                                </div>
                                <div className="c-empty-block__desc">
                                    <span className="c-empty-block__text">У вас нет созданных сообществ</span>
                                </div>
                            </div>
                        )
                    }
                })() }
                
               
            </div>
        )
    }

    renderArchiveCommunities() {
        return (
            <div id="archive" role="tabpanel" aria-labelledby="archive-tab" className={`tab-pane fade show ${this.state.activeTab === 'archive-tab' ? 'active' : 'hide' }`}>
                { (() => {
                    if (this.props.archiveCommunities.length > 0) {
                        return this.props.archiveCommunities.map(community =>
                            <div className="c-event-item black-title" key={ community.id }>
                                <div className="c-event-item__img">
                                    {/* <img src="s/images/tmp_file/community.jpg" alt="" /> */}
                                </div>
                                <div className="c-event-item__info">
                                    <a href="#" className="c-event-item__title">{ community.name }</a>
                                    <span className="c-event-item__subtitle">{ community.career }</span>
                                </div>
                                <div className="c-edit__wrapper">
                                    <button type="button" className="c-edit">
                                        <svg width="1em" height="1em" className="icon icon-border-down ">
                                            <use xlinkHref={ `${SymbolDefs}#icon-border-down` }></use>
                                        </svg>
                                        <div className="c-edit__options">
                                            <div className="c-edit__items"><a href="#" className="c-edit__item">Восстановить</a>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="c-empty-block">
                                <div className="c-empty-block__ico">
                                    <svg width="1em" height="1em" className="icon icon-community ">
                                        <use xlinkHref={ `${SymbolDefs}#icon-community` }></use>
                                    </svg>
                                </div>
                                <div className="c-empty-block__desc">
                                    <span className="c-empty-block__text">Здесь будут храниться удалённые сообщества</span>
                                </div>
                            </div>
                        )
                    }
                })() }
            </div>
        )
    }

    render() {
        return (
            <>
                <ModalAddCommunity
                    isDisplay={this.state.modalAddCommunityDisplay}
                    onCloseModalAddCommunity={() => this.setState({ modalAddCommunityDisplay: false })}
                />
                <div className="col-md-6 col-sm-10">
                    <div className="main-content">
                        <div className="c-workplace">
                            <div className="c-workplace__head">
                                <h2 className="e-title--md">Сообщества</h2>
                            </div>
                            <div className="c-workplace__wrapper">
                                <div className="c-workplace__nav">
                                    <div className="e-nav-line">
                                        { this.renderTabs() }
                                        <div id="workplaceNavContent" className="tab-content">
                                            { this.renderActiveCommunities() }
                                            { this.renderArchiveCommunities() }
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="right-side">
                        <button type="button" class="e-btn e-btn--outline c-workplace__create-btn" onClick={() => this.setState({ modalAddCommunityDisplay: true })}>Создать сообщество</button>
                        <div className="c-ad">
                            <div className="c-ad__items">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

function mapStateToProps(state) {
    return {
        ...state.communitiesWorker,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { ListActiveCommunities, ListArchiveCommunities },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunitiesWorker);