import React from 'react';
import InputPrivate from '../../components/inputPrivate';
import * as profileActions from './auth.actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';
import { Link } from "react-router-dom";

const IconMail = () => (
    <svg width="1em" height="1em" className="icon icon-mail ">
        <use xlinkHref={`${SymbolDefs}#icon-mail`}></use>
    </svg>
);

class RecoverPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            confirmPassword: null,
            passwordValid: true,
            confirmPasswordValid: true,
            passwordError: '',
            confirmPasswordError: '',
            isRecoverValid: false,
            userId: null,
            userCode: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.funcValidateRecoverField = this.funcValidateRecoverField.bind(this);
        this.funcValidateRecoverForm = this.funcValidateRecoverForm.bind(this);
    }

    componentDidMount() {
        let param = new URLSearchParams(this.props.location.search)
        this.setState({
            userId: param.get("id"),
            userCode: param.get("code")
        })
    }

    handleSubmit() {
        const { ResetPassword } = this.props;
        if (this.state.userId && this.state.userCode) {
            ResetPassword(this.state.userId, this.state.userCode, this.state.password);
        }
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value }, () => { this.funcValidateRecoverField(name, value) });
    }

    funcValidateRecoverField(fieldName, value) {
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
        let passwordError = this.state.passwordError;
        let confirmPasswordError = this.state.confirmPasswordError;

        switch (fieldName) {
            case 'password':
                let validation = this.funcValidatePassword(value);
                passwordValid = validation.isValid;
                passwordError = validation.message;

                this.setState({ passwordValid: passwordValid });
                if (!passwordValid) break;

                if ((this.state.password !== this.state.confirmPassword) && this.state.confirmPassword) {
                    passwordValid = false;
                    confirmPasswordError = 'Пароли не совпадают';
                    passwordError = 'Пароли не совпадают';
                    this.setState({ confirmPasswordValid: false })
                } else if (this.state.password === this.state.confirmPassword && this.state.password !== '') {
                    passwordValid = true;
                    confirmPasswordError = '';
                    passwordError = '';
                    this.setState({ confirmPasswordValid: true, passwordValid: true })
                }
                break;
            case 'confirmPassword':
                let confirmValidation = this.funcValidatePassword(value);
                confirmPasswordValid = confirmValidation.isValid;
                confirmPasswordError = confirmValidation.message;

                this.setState({ confirmPasswordValid: confirmPasswordValid });
                if (!confirmPasswordValid) break;

                if ((this.state.password !== this.state.confirmPassword) && this.state.password) {
                    confirmPasswordValid = false;
                    confirmPasswordError = 'Пароли не совпадают';
                    passwordError = 'Пароли не совпадают';
                    this.setState({ passwordValid: false })
                } else if (this.state.password === this.state.confirmPassword && this.state.confirmPassword !== '') {
                    confirmPasswordValid = true;
                    confirmPasswordError = '';
                    passwordError = '';
                    this.setState({ passwordValid: true, confirmPasswordValid: true })
                }
                break;
                deafult:
                break;
        }

        this.setState({
            passwordError: passwordError,
            confirmPasswordError: confirmPasswordError
        }, this.funcValidateRecoverForm);
    }

    funcValidateRecoverForm() {
        this.setState({
            isRecoverValid: (this.state.password !== null && this.state.passwordValid)
                && (this.state.confirmPassword && this.state.confirmPasswordValid)
        });
    }

    funcValidatePassword(value) {
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let regexSmall = new RegExp("^(?=.*[a-z])");
        let regexCapital = new RegExp("^(?=.*[A-Z])");
        let regexNumber = new RegExp("^(?=.*[0-9])");
        let regexSpecial = new RegExp("^(?=.*[!@#\$%\^&\*])");
        let regexLenght = new RegExp("^(?=.{8,})");

        let result = {
            isValid: false,
            message: ''
        };

        if (!value || value == '') {
            result.isValid = false;
            result.message = result.isValid ? '' : 'Не указан пароль';
        } else {
            if (!value.match(regexCapital)) {
                result.isValid = false;
                result.message = 'Должен содержать заглавную букву';
            } else if (!value.match(regexSmall)) {
                result.isValid = false;
                result.message = 'Должен содержать прописную букву';
            } else if (!value.match(regexSpecial)) {
                result.isValid = false;
                result.message = 'Должен содержать специальный символ';
            } else if (!value.match(regexNumber)) {
                result.isValid = false;
                result.message = 'Должен содержать минимум одну цифру';
            } else if (!value.match(regexLenght)) {
                result.isValid = false;
                result.message = 'Должен быть не менее 8ми символов';
            } else {
                result.isValid = true;
                result.message = '';
            }
        }

        return result;
    }

    render() {
        const { auth } = this.props;
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
                        {
                            auth.recoverEmailSent
                                ?
                                <div className="c-password-recovery">
                                    <h1 className="e-title--lg">Пароль изменен</h1>
                                    <div className="c-password-recovery__ico">
                                        <IconMail />
                                    </div>
                                    <div className="c-password-recovery__info">
                                        <span className="c-password-recovery__txt"><Link className="e-link e-link--login" to="/auth">Авторизуйтесь</Link></span>
                                        <span> для продолжения. </span>
                                    </div>
                                </div>
                                :
                                <div className="c-password-recovery">
                                    <h1 className="e-title--lg">Новый пароль</h1>
                                    <form className="c-password-recovery__form">
                                        <InputPrivate
                                            title={'Пароль'}
                                            name={'password'}
                                            type={'password'}
                                            isShowButton={true}
                                            error={!this.state.passwordValid}
                                            errorText={this.state.passwordError}
                                            onChange={this.handleInputChange}
                                            value={this.state.password}
                                        />
                                        <InputPrivate
                                            title={'Повторите пароль'}
                                            name={'confirmPassword'}
                                            type={'password'}
                                            isShowButton={true}
                                            error={!this.state.confirmPasswordValid}
                                            errorText={this.state.confirmPasswordError}
                                            onChange={this.handleInputChange}
                                            value={this.state.confirmPassword}
                                        />
                                        <button type="button" className="e-btn e-btn--filled" disabled={!this.state.isRecoverValid} onClick={() => this.handleSubmit()}>Продолжить</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);