import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import InputAutoCompete from '../../components/inputAutoComplete';
import InputPrivate from '../../components/inputPrivate';
import InputPublic from '../../components/inputPublic';
import Select from '../../components/select';
import * as profileActions from './auth.actions';
import * as dictionaryActions from './../Dictionary/dictionary.actions';
import InputPhone from './../../components/inputPhone';
import { Link } from "react-router-dom";
import MailSent from '../../components/mailSent';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "login",
            login: "",
            loginIsValid: true,
            loginError: "",
            password: "",
            passwordIsValid: true,
            passwordError: "",
            value: '',
            isLoginValid: false,
            isDistrictSelected: false,
            isCitySelected: false,
            isRegisterValid: false,
            selectedCity: 0,
            selectedDistrict: 0,
            selectedMunicipal: 0,
            registerName: "",
            registerSurname: "",
            registerPassword: "",
            registerConfirmPassword: "",
            registerEmail: "",
            registerPhone: "",
            registerNameValid: true,
            registerSurnameValid: true,
            registerPasswordValid: true,
            registerConfirmPasswordValid: true,
            registerEmailValid: true,
            registerPhoneValid: true,
            selectedCityValid: true,
            selectedDistrictValid: true,
            selectedMunicipalValid: true,
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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginInputChange = this.handleLoginInputChange.bind(this);
        this.handleMunicipalChange = this.handleMunicipalChange.bind(this);
        this.funcValidateRegisterFormFields = this.funcValidateRegisterFormFields.bind(this);

        const { ListCities, ListDistricts } = this.props;
        ListCities();
        ListDistricts();
        //ListMunicipalUnions();
    }

    handleSubmit() {
        var validationResult = this.funcValidateLoginFormFields();
        if (validationResult && this.state.login && this.state.password) {
            const { loginAction } = this.props;
            loginAction(this.state.login, this.state.password)
        }
    }

    handleSubmitRegister() {
        var validationResult = this.funcValidateRegisterFormFields()
        if (validationResult) {
            const { registerAction } = this.props;
            registerAction(this.state.registerEmail, this.state.registerPassword, this.state.registerConfirmPassword,
                this.state.registerName, this.state.registerSurname, this.state.registerPhone, 1, this.state.selectedDistrict, this.state.selectedMunicipal);
        }
    }

    handleCityChange(e) {
        if (e && e !== "") {
            this.setState({
                isCitySelected: true,
                selectedCity: 1
            })
            this.funcValidateRegisterField("selectedCity", 1)
        } else {
            this.setState({
                isCitySelected: false,
                selectedCity: 0,
                selectedDistrict: 0,
                selectedMunicipal: 0,
                selectedDistrictValid: true,
                selectedMunicipalValid: true
            })
            this.funcValidateRegisterField("selectedCity", 0)
            this.funcValidateRegisterField("selectedDistrict", 0)
            this.funcValidateRegisterField("selectedMunicipal", 0)
        }
    }

    handleDistrictChange(e) {
        const { ListMunicipalUnions } = this.props;
        if (e.value > 0) {
            this.setState({ isDistrictSelected: true, selectedDistrict: e.value, selectedMunicipal: 0 })
        } else {
            this.setState({ isDistrictSelected: false, selectedDistrict: 0, selectedMunicipal: 0 })
        }
        this.funcValidateRegisterField("selectedDistrict", e.value)
        ListMunicipalUnions(e.value)
    }

    handleMunicipalChange(e) {
        if (e.value > 0) {
            this.setState({ selectedMunicipal: e.value })
        } else {
            this.setState({ selectedMunicipal: 0 })
        }
        this.funcValidateRegisterField("selectedMunicipal", e.value)
    }

    handleLoginInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value }, () => { this.funcValidateRegisterField(name, value) });
    }

    funcValidateLoginField(fieldName, value) {
        let loginError = this.state.loginError;
        let passwordError = this.state.passwordError;
        switch (fieldName) {
            case 'login':
                var regEx = new RegExp("^([\a-z0-9.%+-]+)@([\a-z0-9а-яё-]+\.)+([\a-z0-9а-яё-]{2,4})$", "iu");
                let indexDog = value ? value.indexOf('@') : -1;
                let indexDot = value ? value.lastIndexOf('.') : -1;
                let loginIsValid = value ? (value.match(regEx) && (indexDog < indexDot)) : false;
                if (!value) {
                    loginError = 'Введите email';
                } else {

                    loginError = loginIsValid ? '' : 'Не верный формат';
                }
                this.setState({ loginIsValid: loginIsValid, loginError: loginError });
                break;
            case 'password':
                let passwordIsValid = value && value !== "";
                passwordError = passwordIsValid ? '' : 'Введите пароль';
                this.setState({ passwordIsValid: passwordIsValid, passwordError: passwordError });
                break;
            default:
                break;

        }
    }

    funcValidateRegisterField(fieldName, value) {
        let fieldValidationErrors = this.state.errors;
        let cyrillicRegexp = new RegExp("^[а-яА-ЯёЁ]+$");
        switch (fieldName) {
            case 'registerEmail':
                //let registerEmailValid = value.match(/^([\a-zA-Z.%+-]+)@([\a-zA-Zа-яА-Я-]+\.)+([\a-zA-Zа-яА-Я]{2,})$/iu);
                var regEx = new RegExp("^([\a-z0-9.%+-]+)@([\a-z0-9а-яё-]+\.)+([\a-z0-9а-яё-]{2,4})$", "iu");
                //let registerEmailValid = value.indexOf('@') > 1 && value.indexOf('.') > 2 && value.length > 6
                let indexDog = value ? value.indexOf('@') : -1;
                let indexDot = value ? value.lastIndexOf('.') : -1;
                let registerEmailValid = value ? (value.match(regEx) && (indexDog < indexDot)) : false;
                if (!value) {
                    fieldValidationErrors.email = 'Введите email';
                } else {

                    fieldValidationErrors.email = registerEmailValid ? '' : 'Не верный формат';
                }
                this.setState({ registerEmailValid: registerEmailValid });
                break;
            case 'registerName':
                let registerNameValid = value && value !== '';
                fieldValidationErrors.name = registerNameValid ? '' : 'Введите имя';
                if (value && value !== '') {
                    registerNameValid = value && value.match(cyrillicRegexp);
                    fieldValidationErrors.name = registerNameValid ? '' : 'Допускаются только русские буквы';
                }
                this.setState({ registerNameValid: registerNameValid });
                break;
            case 'registerSurname':
                let registerSurnameValid = value && value !== '';
                fieldValidationErrors.surname = registerSurnameValid ? '' : 'Введите фамилию';
                if (value && value !== '') {
                    registerSurnameValid = value && value.match(cyrillicRegexp);
                    fieldValidationErrors.surname = registerSurnameValid ? '' : 'Допускаются только русские буквы';
                }
                this.setState({ registerSurnameValid: registerSurnameValid });
                break;
            case 'registerPhone':
                let registerPhoneValid = value && value !== '' && value.lenght !== 18;
                fieldValidationErrors.phone = registerPhoneValid ? '' : 'Введите телефон';
                this.setState({ registerPhoneValid: registerPhoneValid });
                break;
            case 'registerPassword':
                let validation = this.funcValidatePassword(value);
                let registerPasswordValid = validation.isValid;
                fieldValidationErrors.password = validation.message;

                this.setState({ registerPasswordValid: registerPasswordValid });
                if (!registerPasswordValid) break;

                if ((this.state.registerPassword !== this.state.registerConfirmPassword) && this.state.registerConfirmPassword) {
                    registerPasswordValid = false;
                    fieldValidationErrors.password = 'Пароли не совпадают';
                    fieldValidationErrors.confirmPassword = 'Пароли не совпадают';
                    this.setState({
                        registerConfirmPasswordValid: false
                    })
                } else if (this.state.registerPassword === this.state.registerConfirmPassword && this.state.registerPassword !== '') {
                    registerPasswordValid = true;
                    fieldValidationErrors.password = '';
                    fieldValidationErrors.confirmPassword = '';
                    this.setState({
                        registerConfirmPasswordValid: true
                    })
                }
                break;
            case 'registerConfirmPassword':
                let confirmValidation = this.funcValidatePassword(value);
                let registerConfirmPasswordValid = confirmValidation.isValid;
                fieldValidationErrors.confirmPassword = confirmValidation.message;

                this.setState({ registerConfirmPasswordValid: registerConfirmPasswordValid });
                if (!registerConfirmPasswordValid) break;

                if ((this.state.registerPassword !== this.state.registerConfirmPassword) && this.state.registerPassword) {
                    registerConfirmPasswordValid = false;
                    fieldValidationErrors.password = 'Пароли не совпадают';
                    fieldValidationErrors.confirmPassword = 'Пароли не совпадают';
                    this.setState({
                        registerPasswordValid: false
                    })
                } else if (this.state.registerPassword === this.state.registerConfirmPassword && this.state.registerConfirmPassword !== '') {
                    registerConfirmPasswordValid = true;
                    fieldValidationErrors.password = '';
                    fieldValidationErrors.confirmPassword = '';
                    this.setState({
                        registerPasswordValid: true
                    })
                }
            case 'selectedCity':
                let selectedCityValid = value !== 0;
                fieldValidationErrors.city = selectedCityValid ? '' : 'Укажите город';
                this.setState({ selectedCityValid: selectedCityValid });
                break;
            case 'selectedDistrict':
                let selectedDistrictValid = value !== 0;
                fieldValidationErrors.district = selectedDistrictValid ? '' : 'Укажите район';
                this.setState({ selectedDistrictValid: selectedDistrictValid });
                break;
            case 'selectedMunicipal':
                let selectedMunicipalValid = value !== 0;
                fieldValidationErrors.municipal = selectedMunicipalValid ? '' : 'Укажите район';
                this.setState({ selectedMunicipalValid: selectedMunicipalValid });
                break;
                deafult:
                break;
        }
    }

    funcValidateRegisterFormFields() {
        this.funcValidateRegisterField("registerEmail", this.state.registerEmail)
        this.funcValidateRegisterField("registerPhone", this.state.registerPhone)
        this.funcValidateRegisterField("registerName", this.state.registerName)
        this.funcValidateRegisterField("registerSurname", this.state.registerSurname)
        this.funcValidateRegisterField("registerPassword", this.state.registerPassword)
        this.funcValidateRegisterField("registerConfirmPassword", this.state.registerConfirmPassword)
        this.funcValidateRegisterField("selectedCity", this.state.selectedCity)
        this.funcValidateRegisterField("selectedDistrict", this.state.selectedDistrict)
        this.funcValidateRegisterField("selectedMunicipal", this.state.selectedMunicipal)

        let validationResult = ((this.state.registerName !== null && this.state.registerNameValid)
            && (this.state.registerSurname && this.state.registerSurnameValid)
            && (this.state.registerPassword && this.state.registerPasswordValid)
            && (this.state.registerConfirmPassword && this.state.registerConfirmPasswordValid)
            && (this.state.registerEmail && this.state.registerEmailValid)
            && (this.state.registerPhone && this.state.registerPhoneValid));

        this.setState({
            isRegisterValid: validationResult
        });

        return validationResult;
    }

    funcValidateLoginFormFields() {
        this.funcValidateLoginField("login", this.state.login)
        this.funcValidateLoginField("password", this.state.password)

        this.setState({ isLoginValid: (this.state.loginIsValid && this.state.passwordIsValid) })
        return (this.state.loginIsValid && this.state.passwordIsValid);
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

    RenderLogin() {
        const { auth } = this.props;
        return (
            <div id="login" role="tabpanel" aria-labelledby="login-tab" className={`tab-pane ${this.state.activeTab === 'login' ? 'active' : 'hide'}`}>
                <form id="c-entry__login" className="c-entry__login-form">
                    <div className="c-entry__line">
                        <InputPublic
                            title={'Email'}
                            name={'login'}
                            type={'email'}
                            placeholder={''}
                            error={!this.state.loginIsValid}
                            errorText={this.state.loginError}
                            data={this.state.login}
                            onChange={this.handleLoginInputChange}
                        />
                    </div>
                    <div className="c-entry__line">
                        <InputPrivate
                            title={'Пароль'}
                            name={'password'}
                            type={'text'}
                            isShowButton={true}
                            error={!this.state.passwordIsValid}
                            errorText={this.state.passwordError}
                            data={this.state.password}
                            onChange={this.handleLoginInputChange}
                        />
                    </div>
                    <div className="c-entry__line c-entry__line--mt">
                        <button disabled={auth.fetching} type="button" className="e-btn e-btn--filled" onClick={() => this.handleSubmit()}>Войти</button>
                    </div>
                    <div className="c-entry__line">
                        <Link className="e-link e-link--login" to="/forgot">Забыли пароль?</Link>
                    </div>
                </form>
            </div>
        );
    }

    RenderRegister() {
        const { dictionary, auth } = this.props;
        let selectedMunicipal = dictionary.districts.find(t => t.id == this.state.selectedMunicipal)

        return (
            <div id="registation" role="tabpanel" aria-labelledby="registation-tab" className={`tab-pane ${this.state.activeTab === 'registation' ? 'active' : 'hide'}`}>
                <form id="c-entry__registation" className="c-entry__registration-form">
                    <div className="c-entry__line">
                        <InputPublic
                            title={'Имя'}
                            name={'registerName'}
                            type={'text'}
                            placeholder={''}
                            error={!this.state.registerNameValid}
                            errorText={this.state.errors.name}
                            onChange={this.handleInputChange}
                            data={this.state.registerName}
                        />
                        <InputPublic
                            title={'Фамилия'}
                            name={'registerSurname'}
                            type={'text'}
                            placeholder={''}
                            error={!this.state.registerSurnameValid}
                            errorText={this.state.errors.surname}
                            onChange={this.handleInputChange}
                            data={this.state.registerSurname}
                        />
                    </div>
                    <div className="c-entry__line">
                        <InputPublic
                            title={'Email'}
                            name={'registerEmail'}
                            type={'text'}
                            placeholder={''}
                            error={!this.state.registerEmailValid}
                            errorText={this.state.errors.email}
                            onChange={this.handleInputChange}
                            data={this.state.registerEmail}
                        />

                        <InputPhone
                            title={'Телефон'}
                            name={'registerPhone'}
                            type={'number'}
                            placeholder={''}
                            error={!this.state.registerPhoneValid}
                            errorText={this.state.errors.phone}
                            onChange={this.handleInputChange}
                            value={this.state.registerPhone}
                        />
                    </div>
                    <div className="c-entry__line">
                        <InputAutoCompete
                            title={'Город'}
                            name={'autocomplete-city'}
                            type={'text'}
                            placeholder={'Начните вводить'}
                            data={[
                                { id: 1, label: 'Санкт-Петербург' }
                            ]}
                            onChange={this.handleCityChange}
                            error={!this.state.selectedCityValid}
                            errorText={this.state.errors.city} />
                        {/** 
                        <InputPublic
                            title={'Город'}
                            name={'autocomplete-city'}
                            type={'text'}
                            placeholder={''}
                            error={false}
                            errorText={''}
                            data='Санкт-Петербург'
                        />*/}
                        {
                            this.state.isCitySelected &&
                            <Select
                                title={'Район'}
                                data={dictionary.dictionaries}
                                onChange={this.handleDistrictChange}
                                error={!this.state.selectedDistrictValid}
                                errorText={this.state.errors.district}
                            />
                        }

                    </div>
                    {
                        (this.state.isDistrictSelected && this.state.isCitySelected) &&
                        <div className="c-entry__line">
                            <Select
                                title={'Округ'}
                                selectedValue={selectedMunicipal ? { value: selectedMunicipal.id, label: selectedMunicipal.name } : {}}
                                data={dictionary.districts}
                                onChange={this.handleMunicipalChange}
                                error={!this.state.selectedMunicipalValid}
                                errorText={this.state.errors.municipal}
                            />
                        </div>
                    }
                    <div className="c-entry__line">
                        <InputPrivate
                            title={'Пароль'}
                            name={'registerPassword'}
                            type={'password'}
                            error={!this.state.registerPasswordValid}
                            errorText={this.state.errors.password}
                            onChange={this.handleInputChange}
                            value={this.state.registerPassword}
                        />
                        <InputPrivate
                            title={'Повторите пароль'}
                            name={'registerConfirmPassword'}
                            type={'password'}
                            error={!this.state.registerConfirmPasswordValid}
                            errorText={this.state.errors.confirmPassword}
                            onChange={this.handleInputChange}
                            value={this.state.registerConfirmPassword}
                        />
                    </div>
                    <div className="c-entry__line c-entry__line--mt">
                        <button disabled={auth.fetching} type="button" className="e-btn e-btn--filled e-btn--md" onClick={() => this.handleSubmitRegister()}>Зарегистрироваться</button>
                        <span className="c-entry__agreement">Нажимая “Зарегистрироваться” вы даёте согласие на обработку персональных данных</span>
                    </div>
                </form>
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
                                <button type="button" className="mobile-burger__btn js-close-mmenu"><span></span></button>
                            </div>
                            <div className="mobile-burger__content">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-10">
                    <div className="main-content">
                        <div className="c-entry">
                            {
                                auth.confirmEmailSent
                                    ? <MailSent title="Подтвердите почту" email={this.state.registerEmail} />
                                    :
                                    <div className="c-entry__tabs">
                                        <ul id="entryForm" role="tablist" className="nav c-entry__nav">
                                            <li className="nav-item">
                                                <div id="registation-tab" onClick={() => this.setState({ activeTab: 'registation' })} data-toggle="tab" href="#registation" role="tab" aria-controls="registation" aria-selected="true" className={`nav-link ${this.state.activeTab === 'registation' ? 'active' : ''}`}>Регистрация</div>
                                            </li>
                                            <li className="nav-item">
                                                <div id="login-tab" onClick={() => this.setState({ activeTab: 'login' })} data-toggle="tab" role="tab" aria-controls="login" aria-selected="false" className={`nav-link ${this.state.activeTab === 'login' ? 'active' : ''}`}>Вход</div>
                                            </li>
                                        </ul>
                                        <div id="entryFormContent" className="tab-content c-entry__content">
                                            {this.RenderLogin()}
                                            {this.RenderRegister()}
                                        </div>
                                    </div>
                            }
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

/*
const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
    loginAction: () => dispatch(loginAction())
})
*/

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dictionary: state.dictionary
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { ...profileActions, ...dictionaryActions },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);