import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { ListChildren } from '../Children/children.actions';
import { ListSubscriptions, Unsubscribe,  ListInvitations, AcceptInvitation } from './communities.actions';
import SymbolDefs from '../../assets/images/useful/svg/theme/symbol-defs.svg';



export class Communities extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'subscriptions',
            invitationChildrenElements: []
        }

        this.invitationChildrenElements = [];
    }

    initInvitationChildrenElements() {
        const invitationChildrenElements = {}; 
        
        this.props.invitations.map(i => { 
            invitationChildrenElements[i.id] = { children: {} };
            
            this.props.children.list.map(c => {
                const element = { selected: false }
                console.log(element);
                invitationChildrenElements[i.id].children[c.id] = { id: c.id, selected: false };
            });
        });

        this.invitationChildrenElements = invitationChildrenElements;
    }

    componentDidMount = () => {
        this.props.ListChildren();
        this.props.ListSubscriptions();
        this.props.ListInvitations();  
    } 

    handleChildrenFilter = (child) => {
        this.setState({selectedChild: child});
        this.props.ListSubscriptions(child ? child.id : undefined);
        console.log('handleChildrenFilter: ', this.state.selectedChild ? [ this.state.selectedChild.id ] : []);
    }

    handleInviteChildSelect(inviteId, childId) {
        this.invitationChildrenElements[inviteId].children[childId].selected = 
            !this.invitationChildrenElements[inviteId].children[childId].selected;
    }

    handleAcceptInvitation(invitationId) {
        const acceptChildren = [];

        Object.entries(this.invitationChildrenElements[invitationId].children)
                                     .forEach(([key, value]) => { if (value.selected) acceptChildren.push(key) });

        if (acceptChildren.length !== 0) {
            this.props.AcceptInvitation({ id: invitationId, children: acceptChildren } );
        }   
    }

    handleUnsubscribe(communityId) {
        this.props.Unsubscribe(communityId);
    }

    

    renderTabs() {
        return <ul id="communityNav" role="tablist" className="nav">
            <li className="nav-item">
                <a id="subscriptions-tab" 
                    data-toggle="tab" 
                    href="#subscriptions" 
                    role="tab" 
                    aria-controls="subscriptions" 
                    className={`nav-link ${this.state.activeTab === 'subscriptions' ? "active" : ""}`}
                    aria-selected={this.state.activeTab === 'subscriptions' ? "true" : "false"}
                    onClick={() => this.setState({ activeTab: 'subscriptions' })} >
                        Подписки
                    <span className="count">{ this.props.subscriptions && this.props.subscriptions.length > 0 ? `(${this.props.subscriptions.length})` : '' }</span>
                </a>
            </li>
            <li className="nav-item">
                <a id="invitations-tab" 
                    data-toggle="tab" 
                    href="#invitations" 
                    role="tab" 
                    aria-controls="invitations" 
                    className={`nav-link ${this.state.activeTab === 'invitations' ? "active" : ""}`}
                    aria-selected={this.state.activeTab === 'invitations' ? "true" : "false"}
                    onClick={() => this.setState({ activeTab: 'invitations' })}>
                        Приглашения
                        <span className="count">{ this.props.invitations && this.props.invitations.length > 0 ? `(${this.props.invitations.length})` : ''}</span>
                </a>
            </li>
        </ul>
    }

    renderSubscriptions() {
        // TODO: Make controlled radiobuttons on children filter (current uncontrolled); 
        const children = this.props.children.list;
        
        return (
            <div id="subscriptions" role="tabpanel" aria-labelledby="subscriptions-tab" className={`tab-pane fade show ${this.state.activeTab === 'subscriptions' ? 'active' : 'hide' }`}>
                <div className="c-all-communities__filters c-all-communities-filters">
                    { (() => {
                        if (children.length !== 0) {
                            return <div className="e-child-filter-line"><span className="e-child-filter-line__title">Дети:</span>
                                <div className="e-child-filter-line__select">
                                    <button className="e-child-filter-line__btn">
                                        <span className="e-child-filter-line__current">
                                            { this.state.selectedChild ? this.state.selectedChild.name : 'Все' }
                                        </span>
                                        <svg width="1em" height="1em" className="icon icon-down-arrow ">
                                            <use xlinkHref={`${SymbolDefs}#icon-down-arrow`}></use>
                                        </svg>
                                        <div className="e-child-filter-line__dropdown">
                                            <div className="form-radio">
                                                <input type="radio" name="childrens" id="all" className="e-radio" 
                                                    checked={ !this.state.selectedChild }
                                                    onChange={ () => this.handleChildrenFilter() } />
                                                <label htmlFor="all" className="e-label">Все</label>
                                            </div>
                                            { children.map(child => 
                                                <div className="form-radio" key={ child.id }>
                                                    <input type="radio" name="childrens" id={ `childFilter-${child.id}` } className="e-radio" 
                                                        checked={ this.state.selectedChild && child.id === this.state.selectedChild.id  } 
                                                        onChange={ () => this.handleChildrenFilter(child) } />
                                                    <label htmlFor={ `childFilter-${child.id}` } className="e-label">{ child.name }</label>
                                                </div>
                                            ) }
                                        </div>
                                    </button>
                                </div>
                            </div>
                        }
                    })() }
                    <div className="c-all-communities-filters__items">
                        { (() => {
                           if (this.props.subscriptions.length === 0) {
                                return (
                                    <div className="c-empty-block">
                                        <div className="c-empty-block__ico">
                                            <svg width="1em" height="1em" className="icon icon-community ">
                                                <use xlinkHref={`${SymbolDefs}#icon-community`}></use>
                                            </svg>
                                        </div>
                                        <div className="c-empty-block__desc">
                                            <span className="c-empty-block__text">У вас нет подписок. </span>
                                            <span className="c-empty-block__text">Вы можете найти сообщества через глобальный поиск.</span>
                                        </div>
                                    </div>
                                )
                           } else {
                                return this.props.subscriptions.map(subscr =>
                                    <div className="c-event-item" key={ subscr.id }>
                                        <div className="c-event-item__img">
                                            {/* <img src="s/images/tmp_file/community.jpg" alt="" /> */}
                                            {/* TODO: add image for community */}
                                        </div>
                                        <div className="c-event-item__info">
                                            <a href="#" className="c-event-item__title">{ subscr.name }</a>
                                            <span className="c-event-item__subtitle">{ subscr.career }</span>
                                        </div>
                                        <div className="c-edit__wrapper">
                                            <button type="button" className="c-edit">
                                                <svg width="1em" height="1em" className="icon icon-border-down ">
                                                    <use xlinkHref={`${SymbolDefs}#icon-border-down`}></use>
                                                </svg>
                                                <div className="c-edit__options">
                                                    <div className="c-edit__items">
                                                        <a href="#" className="c-edit__item" onClick={ () => this.handleUnsubscribe(subscr.id) } >Отписаться</a>
                                                        <a href="#" className="c-edit__item">В избранное</a>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>  
                                ) 
                           }
                        })() }
                    </div>
                </div>
            </div>
        )
    }

    renderInvitations() {
        this.initInvitationChildrenElements()
        return (
            <div id="invitations" role="tabpanel" aria-labelledby="invitations-tab" className={`tab-pane fade show ${this.state.activeTab === 'invitations' ? 'active' : 'hide' }`}>
                <div className="c-all-communities-filters__items">
                    { (() => {
                        if (this.props.invitations.length === 0) {
                            return (
                                <div className="c-empty-block">
                                    <div className="c-empty-block__ico">
                                        <svg width="1em" height="1em" className="icon icon-community ">
                                            <use xlinkHref={`${SymbolDefs}#icon-community`}></use>
                                        </svg>
                                    </div>
                                    <div className="c-empty-block__desc">
                                        <span className="c-empty-block__text">У вас нет приглашений. </span>
                                        <span className="c-empty-block__text">Вы можете найти сообщества через глобальный поиск.</span>
                                    </div>
                                </div>
                            )
                        } else {
                            return this.props.invitations.map(invite => 
                                <div className="c-event-item" key={ invite.id }>
                                    <div className="c-event-item__img">
                                        {/* TODO: Add community image */}
                                        {/* <img src="s/images/tmp_file/community.jpg" alt="" /> */}
                                    </div>
                                    <div className="c-event-item__info">
                                        <a href="#" className="c-event-item__title">{ invite.community.name }</a>
                                        <span className="c-event-item__subtitle">{ invite.community.career }</span>
                                    </div>
                                    <div className="c-event-item__invitations c-event-item-invitations">
                                        <div className="c-event-item-invitations__accept">
                                            <button type="button" className="e-btn e-btn--outline c-event-item-invitations__btn">Вступить</button>
                                            <div className="c-event-item-invitations__options c-event-item-invitations-options">
                                                <h4 className="c-event-item-invitations-options-title">Дети в сообществе</h4>
                                                <div className="c-event-item-invitations-options-list">
                                                    { this.props.children.list.map(child =>
                                                        <div className="e-box" key={ child.id }>
                                                            <input type="checkbox" 
                                                                id={ `invite-${invite.id}-acceptChild-${child.id}` }
                                                                onChange={ () => this.handleInviteChildSelect(invite.id, child.id) }
                                                                selected={ this.invitationChildrenElements[invite.id].children[child.id] } 
                                                                className="e-checkbox" />
                                                            <label htmlFor={ `invite-${invite.id}-acceptChild-${child.id}` } className="e-label">{ child.name }</label>
                                                        </div> 
                                                    )}
                                                </div>
                                                <button type="button"
                                                    className="e-btn e-btn--filled c-event-item-invitations-options-btn"
                                                    onClick={ () => this.handleAcceptInvitation(invite.id) }>
                                                        Подтвердить
                                                </button>
                                            </div>
                                        </div>
                                        <div className="c-event-item-invitations__dissmiss">
                                            <button type="button" className="e-btn e-btn--outline c-event-item-invitations__btn">Отклонить</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })() }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="c-all-communities">
                <h2 className="e-title--md">Сообщества</h2>
                <div className="c-all-communities__wrapper">
                    <div className="c-all-communities__nav e-nav-line">
                        { this.renderTabs() }
                        <div id="communityNavContent" className="tab-content">
                            { this.renderSubscriptions() }
                            { this.renderInvitations() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.communities,
        children: state.children
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { ListSubscriptions, Unsubscribe, ListInvitations, ListChildren, AcceptInvitation },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Communities);