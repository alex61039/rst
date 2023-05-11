import React, { useState, useEffect } from 'react';
import SymbolDefs from './../../assets/images/useful/svg/theme/symbol-defs.svg';
import InputAutoCompete from './../inputAutoComplete';
import InputPhone from './../inputPhone';
import InputPublic from './../inputPublic';
import Select from './../select';
import TextArea from './../textArea';
import { ValidateTextWithSymbolsField, ValidateEmailField, ValidatePhoneField } from './../../utils/validation';

const educationData = [
    { id: 1, name: 'Общее' },
    { id: 2, name: 'Дополнительное' },
]

const ModalAddInstitution = (props) => {
    const { isDisplay, onClose, onSubmit, onChangeField, onSelect, data, districts, municipalUnions, actionTitle } = props;
    const [filtered, setFiltered] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedMunicipal, setSelectedMunicipal] = useState(null);
    const [selectedEducation, setSelectedEducation] = useState(null);
    const [nameValid, setNameValid] = useState(true);
    const [nameError, setNameError] = useState("");
    const [addressValid, setAddressValid] = useState(true);
    const [addressError, setAddressError] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [phoneValid, setPhoneValid] = useState(true);
    const [phoneError, setPhoneError] = useState("");
    const [cityValid, setCityValid] = useState(true);
    const [cityError, setCityError] = useState("");
    const [districtValid, setDistrictValid] = useState(true);
    const [districtError, setDistrictError] = useState("");
    const [municipalValid, setMunicipalValid] = useState(true);
    const [municipalError, setMunicipalError] = useState("");
    const [educationValid, setEducationValid] = useState(true);
    const [educationError, setEducationError] = useState("");

    useEffect(() => {
        //setFiltered(municipalUnions);
        setSelectedDistrict(districts.find(t => t.id == data.districtId))
        setSelectedMunicipal(municipalUnions.find(t => t.id == data.municipalUnionId))
        setSelectedEducation(educationData.find(t => t.id == data.educationId))
        //setSelectedMunicipal(municipalUnions.find(t => t.id == data.municipalUnionId))        
    }, [municipalUnions, districts, data])

    const handleOnClose = () => {
        onClose();
    }

    const handleOnSubmit = () => {
        if (validateForm()) {
            onSubmit();
        }
    }

    const handleInputChange = (e) => {
        onChangeField(e)
        validateField(e.target.name, e.target.value)
    }

    const handleSelectChange = (field, e) => {
        onSelect(field, e);
        switch (field) {
            case "districtId":
                let filteredMunicipals = municipalUnions.filter(t => t.districtId == e.value);
                setFiltered(filteredMunicipals);
                break;
            default:
                break;
        }

        validateField(field, e.value)
    }

    const validateField = (field, value) => {
        let validationResult = {
            isValid: true,
            message: false
        }
        switch (field) {
            case "name":
                validationResult = ValidateTextWithSymbolsField(value);
                setNameValid(validationResult.isValid)
                setNameError(validationResult.message)
                break;
            case "address":
                validationResult = ValidateTextWithSymbolsField(value);
                setAddressValid(validationResult.isValid)
                setAddressError(validationResult.message)
                break;
            case "email":
                validationResult = ValidateEmailField(value);
                setEmailValid(validationResult.isValid)
                setEmailError(validationResult.message)
                break;
            case "phone":
                validationResult = ValidatePhoneField(value);
                setPhoneValid(validationResult.isValid)
                setPhoneError(validationResult.message)
                break;
            case 'cityId':
                let selectedCityValid = value !== 0;
                setCityValid(selectedCityValid)
                setCityError(selectedCityValid ? '' : 'Укажите город')
                break;
            case 'districtId':
                let selectedDistrictValid = value !== 0;
                setDistrictValid(selectedDistrictValid)
                setDistrictError(selectedDistrictValid ? '' : 'Укажите район')
                break;
            case 'municipalUnionId':
                let selectedMunicipalValid = value !== 0;
                setMunicipalValid(selectedMunicipalValid)
                setMunicipalError(selectedMunicipalValid ? '' : 'Укажите район')
                break;
            case 'educationId':
                let selectedEducationValid = value !== 0;
                setEducationValid(selectedEducationValid)
                setEducationError(selectedEducationValid ? '' : 'Укажите образование')
                break;
            default:
                break;
        }
    }

    const validateForm = () => {
        validateField("name", data.name);
        validateField("address", data.address);
        validateField("email", data.email);
        validateField("phone", data.phone);
        validateField("cityId", data.cityId);
        validateField("districtId", data.districtId);
        validateField("municipalUnionId", data.municipalUnionId);
        validateField("educationId", data.educationId);

        let validationResult = ((data.name !== "" && nameValid)
            && (data.address !== "" && addressValid)
            && (data.email !== "" && emailValid)
            && (data.phone !== "" && phoneValid)
            && (data.cityId !== "" && cityValid)
            && (data.districtId !== "" && districtValid)
            && (data.municipalUnionId !== "" && municipalValid)
            && (data.educationId !== "" && educationValid));

        return validationResult;
    }

    return (
        <div id="modal-inst" tabIndex="-1" role="dialog" aria-labelledby="modal-inst" aria-hidden="true" className={`c-modal-inst-remove modal fade  ${isDisplay ? 'show' : ''}`} style={{ display: isDisplay ? 'block' : 'none' }}>
            <div role="document" className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ marginTop: 40 }}>
                    <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => handleOnClose()}>
                        <svg width="1em" height="1em" className="icon icon-close ">
                            <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                        </svg>
                    </button>
                    <div className="modal-body">
                        <div className="c-modal-send-invite__wrapper">
                            <h2 className="modal__title">Учреждение</h2>
                            <form className="c-modal-send-invite__form">
                                <InputPublic
                                    title={'Название учреждения'}
                                    name={'name'}
                                    type={'text'}
                                    placeholder={''}
                                    onChange={(e) => handleInputChange(e)}
                                    data={data.name}
                                    error={!nameValid}
                                    errorText={nameError}
                                />
                                <TextArea
                                    title={'Описание учреждения (max 200 символов)'}
                                    name={'description'}
                                    onChange={(e) => handleInputChange(e)}
                                    data={data.description}
                                />
                                <InputAutoCompete
                                    title={'Город'}
                                    name={'cityId'}
                                    type={'text'}
                                    placeholder={'Начните вводить'}
                                    data={[
                                        { id: 1, label: 'Санкт-Петербург' }
                                    ]}
                                    selectedValue={data.cityId}
                                    onChange={(e) => handleSelectChange("cityId", e)}
                                    error={!cityValid}
                                    errorText={cityError}
                                />
                                <Select
                                    title={'Район'}
                                    name='districtId'
                                    selectedValue={selectedDistrict ? { value: selectedDistrict.id, label: selectedDistrict.name } : {}}
                                    data={districts}
                                    onChange={(e) => handleSelectChange("districtId", e)}
                                    error={!districtValid}
                                    errorText={districtError}
                                />
                                <Select
                                    title={'Округ'}
                                    name='municipalUnionId'
                                    selectedValue={selectedMunicipal ? { value: selectedMunicipal.id, label: selectedMunicipal.name } : {}}
                                    data={filtered}
                                    onChange={(e) => handleSelectChange("municipalUnionId", e)}
                                    error={!municipalValid}
                                    errorText={municipalError}
                                />
                                <InputPublic
                                    title={'Адрес'}
                                    name={'address'}
                                    type={'text'}
                                    placeholder={''}
                                    onChange={(e) => handleInputChange(e)}
                                    data={data.address}
                                    isValidate={true}
                                    error={!addressValid}
                                    errorText={addressError}
                                />
                                <Select
                                    title={'Образование'}
                                    name={'educationId'}
                                    data={educationData}
                                    selectedValue={selectedEducation ? { value: selectedEducation.id, label: selectedEducation.name } : {}}
                                    onChange={(e) => handleSelectChange("educationId", e)}
                                    error={!educationValid}
                                    errorText={educationError}
                                />
                                <InputPublic
                                    title={'Email'}
                                    name={'email'}
                                    type={'text'}
                                    placeholder={''}
                                    isValidate={true}
                                    onChange={(e) => handleInputChange(e)}
                                    data={data.email}
                                    error={!emailValid}
                                    errorText={emailError}
                                />
                                <InputPhone
                                    title={'Телефон'}
                                    name={'phone'}
                                    type={'number'}
                                    placeholder={''}
                                    isValidate={true}
                                    onChange={(e) => handleInputChange(e)}
                                    data={data.phone}
                                    error={!phoneValid}
                                    errorText={phoneError}
                                />
                                <button type="button" className="e-btn e-btn--filled" onClick={() => handleOnSubmit()}>{actionTitle}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAddInstitution;