import React from 'react';
import InputPublic from '../../components/inputPublic';
import * as profileActions from './auth.actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';

const IconMail = () => (
    <svg width="1em" height="1em" className="icon icon-mail ">
        <use xlinkHref={`${SymbolDefs}#icon-mail`}></use>
    </svg>
);

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isEmailValid: true,
            emailError: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.funcValidateEmail = this.funcValidateEmail.bind(this);
    }

    handleInputChange(e) {
        const value = e.target.value;
        this.setState({ email: value }, () => { this.funcValidateEmail(value) });
    }

    handleSubmit() {
        const { ForgotPassword } = this.props;
        ForgotPassword(this.state.email);
    }

    funcValidateEmail(value) {
        let emailError = '';
        var regEx = new RegExp("^([\a-z.%+-]+)@([\a-zа-яё-]+\.)+([\a-zа-яё-]{2,4})$", "iu");
        //let registerEmailValid = value.indexOf('@') > 1 && value.indexOf('.') > 2 && value.length > 6
        let indexDog = value ? value.indexOf('@') : -1;
        let indexDot = value ? value.lastIndexOf('.') : -1;
        let registerEmailValid = value ? (value.match(regEx) && (indexDog < indexDot)) : false;
        if (!value) {
            emailError = 'Введите email';
        } else {
            emailError = registerEmailValid ? '' : 'Не верный формат';
        }

        this.setState({
            isEmailValid: registerEmailValid,
            emailError: emailError
        })
    }

    renderSuccess() {
        return (
            <div className="main-content">
                <div className="c-password-recovery">
                    <h1 className="e-title--lg">Восстановление пароля</h1>
                    <div className="c-password-recovery__ico">
                        <IconMail />
                    </div>
                    <div className="c-password-recovery__info">
                        <span className="c-password-recovery__txt">На ваш электронный адрес</span>
                        <b className="c-password-recovery__email">{this.state.email}</b>
                        <span>отправлено письмо. Перейдите по ссылке из полученного письма. Если письмо не пришло, проверьте папку «Спам». </span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { auth } = this.props;
        return (
            <div className="row">
                <div className="col-md-2">
                    <div className="left-side">
                        <div className="mobile-burger">
                            <div className="mobile-burger__head">
                                <button type="button" className="mobile-burger__btn js-close-mmenu">
                                    <span></span>
                                </button>
                            </div>
                            <div className="mobile-burger__content">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-sm-10">
                    <div className="main-content">
                        {
                            auth.recoverEmailSent
                                ? this.renderSuccess()
                                : <div className="c-password-recovery">
                                    <h1 className="e-title--lg">Восстановление пароля</h1>
                                    <form className="c-password-recovery__form">
                                        <InputPublic
                                            title={'Email'}
                                            name={'userEmail'}
                                            type={'text'}
                                            placeholder={''}
                                            error={!this.state.isEmailValid}
                                            errorText={this.state.emailError}
                                            data={this.state.email}
                                            onChange={this.handleInputChange}
                                        />
                                        <button type="button" className="e-btn e-btn--filled" disabled={!this.state.isEmailValid} onClick={() => this.handleSubmit()}>Продолжить</button>
                                    </form>
                                </div>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);