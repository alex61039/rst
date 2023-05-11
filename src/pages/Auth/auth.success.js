import React from 'react';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';
import { Link } from "react-router-dom";
import * as profileActions from './auth.actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

const IconMail = () => (
    <svg width="1em" height="1em" className="icon icon-mail ">
        <use xlinkHref={`${SymbolDefs}#icon-mail`}></use>
    </svg>
);

class RegisterSuccess extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { ConfirmEmail } = this.props;
        let param = new URLSearchParams(this.props.location.search)
        ConfirmEmail(param.get("id"), param.get("code"))
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <div className="left-side">
                        <div className="mobile-burger">
                            <div className="mobile-burger__head">
                                <button type="button" className="mobile-burger__btn js-close-mmenu"><span></span></button>
                            </div>
                            <div className="mobile-burger__content">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-10">
                    <div className="main-content">
                        <div className="c-password-recovery">
                            <h1 className="e-title--lg">Почта подтверждена</h1>
                            <div className="c-password-recovery__ico">
                                <IconMail />
                            </div>
                            <div className="c-password-recovery__info">
                                <span className="c-password-recovery__txt">Авторизуйтесь</span>
                                <span> для продолжения. </span>
                                <div className="c-entry__line c-entry__line--mt">
                                    <button type="button" className="e-btn e-btn--filled" onClick={() => this.props.history.push("/auth")}>Авторизация</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="right-side">
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { ...profileActions },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSuccess);