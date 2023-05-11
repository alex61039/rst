import React, { useState, useEffect } from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';
import "react-image-crop/dist/ReactCrop.css";
import InputDate from './../components/inputDate';
import InputPublic from './../components/inputPublic';
import Select from './../components/select';
import MultiSelect from './../components/multiSelect';

const ModalChildInfo = (props) => {
    const { isDisplay, careerDirections, onChangeField, data, onSubmit, onCloseChildInfoModal } = props;
    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(true);
    const [nameError, setNameError] = useState("");
    const [surname, setSurname] = useState("");
    const [surnameValid, setSurnameValid] = useState(true);
    const [surnameError, setSurnameError] = useState("");
    const [secondName, setSecondName] = useState("");
    const [secondNameValid, setSecondNameValid] = useState(true);
    const [secondNameError, setSecondNameError] = useState("");
    const [selectedSexValid, setSelectedSexValid] = useState(true);
    const [selectedSexError, setSelectedSexError] = useState("");
    const [selectedCareers, setSelectedCareer] = useState([]);
    const [careers, setCareers] = useState([]);

    useEffect(() => {
        //console.log(data)
        //console.log(careerDirections)
        if (data && data.careers) {
            for (let i = 0; i < careerDirections.length; i++) {
                for (let j = 0; j < careerDirections[i].careers.length; j++) {
                    let checked = data.careers.find(t => t.id === careerDirections[i].careers[j].id);
                    //console.log(checked)
                    if (checked) {
                        careerDirections[i].careers[j].isSelected = true;
                    }
                }
            }
        }
        //console.log(careerDirections)
        setCareers(careerDirections);
    }, [careerDirections, data])

    const handleOnClose = () => {
        resetForm();
        onCloseChildInfoModal();
    }

    const resetForm = () => {

    }

    const handleOnSubmit = () => {
        resetForm();
        onSubmit();
        onCloseChildInfoModal();
    }

    const handleInputChange = (e) => {
        onChangeField(e.target.name, e.target.value)
        console.log(e)
    }

    const handleSexChange = (e) => {
        console.log(e)
        onChangeField("sex", e.value)
    }

    const handleCareerChange = (e) => {
        onChangeField("careers", e)
    }

    const datas = {
        label: 'search me',
        value: 'searchme',
        children: [
            {
                label: 'search me too',
                value: 'searchmetoo',
                children: [
                    {
                        label: 'No one can get me',
                        value: 'anonymous1',
                    },
                    {
                        label: 'No one can get me',
                        value: 'anonymous2',
                    },
                    {
                        label: 'No one can get me',
                        value: 'anonymous3',
                    },
                ],
            },
        ],
    }

    const onChange = (currentNode, selectedNodes) => {
        console.log('onChange::', currentNode, selectedNodes)
    }
    const onAction = (node, action) => {
        console.log('onAction::', action, node)
    }
    const onNodeToggle = currentNode => {
        console.log('onNodeToggle::', currentNode)
    }

    const handleCareerDirectionChange = (e) => {
        let directions = careers.filter(t => t.id === parseInt(e.target.name));
        if (directions) {
            let direction = directions[0];
            for (let i = 0; i < direction.careers.length; i++) {
                if (selectedCareers.indexOf(direction.careers[i]) === -1) {
                    selectedCareers.push(direction.careers[i])
                } else {
                    let indexOf = selectedCareers.findIndex(t => t.id === direction.careers[i].id);
                    if (indexOf !== -1) {
                        selectedCareers.splice(indexOf, 1)
                    }
                }

                direction.careers[i].isSelected = !direction.careers[i].isSelected;
            }
            console.log(direction)
        }
        console.log(selectedCareers)
        setCareers(directions);
    }

    return (
        <div id="modal-child-info" tabIndex="-1" role="dialog" aria-labelledby="modal-add-news" aria-hidden="true" className={`c-modal-child-info modal fade  ${isDisplay ? 'show' : ''}`} style={{ display: isDisplay ? 'block' : 'none' }}>
            <div role="document" className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => handleOnClose()}>
                        <svg width="1em" height="1em" className="icon icon-close ">
                            <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                        </svg>
                    </button>
                    <div className="modal-body">
                        <div className="c-modal-child-info__wrapper">
                            <h2 className="modal__title">Информация о ребёнке</h2>
                            <form className="c-modal-child-info__form">
                                {
                                    /**
                                     * <InputPublic
                                    title={'Фамилия'}
                                    name={'surname'}
                                    type={'text'}
                                    placeholder={''}
                                    error={!surnameValid}
                                    errorText={surnameError}
                                    onChange={(e) => handleInputChange(e)}
                                    data={surname}
                                />
                                     */
                                }

                                <InputPublic
                                    title={'Имя'}
                                    name={'name'}
                                    type={'text'}
                                    placeholder={''}
                                    error={!nameValid}
                                    errorText={nameError}
                                    onChange={(e) => handleInputChange(e)}
                                    data={data.name}
                                />
                                {
                                    /**
                                     * <InputPublic
                                    title={'Отчество'}
                                    name={'secondName'}
                                    type={'text'}
                                    placeholder={''}
                                    error={!secondNameValid}
                                    errorText={secondNameError}
                                    onChange={(e) => handleInputChange(e)}
                                    data={secondName}
                                />
                                     */
                                }
                                <InputDate
                                    title={'Дата рождения'}
                                    name={'birthDay'}
                                    type={'text'}
                                    placeholder={''}
                                    error={!nameValid}
                                    errorText={nameError}
                                    onChange={(e) => handleInputChange(e)}
                                    data={data.birthDay}
                                />

                                <Select
                                    title={'Пол'}
                                    data={[{ id: 1, name: 'Мужской' }, { id: 0, name: 'Женский' }]}
                                    onChange={(e) => handleSexChange(e)}
                                    error={!selectedSexValid}
                                    errorText={selectedSexError}
                                    selectedValue={(data.sex == 'Male' || data.sex == 1) ? { value: 1, label: 'Мужской' } : { value: 0, label: 'Женский' }}
                                />
                                <MultiSelect
                                    data={careers}
                                    title="Профориентация"
                                    onCareerChange={handleCareerChange}
                                    onCareerDirectionChange={handleCareerDirectionChange}
                                    selectedItems={selectedCareers} />
                                <button type="button" className="e-btn e-btn--filled e-btn--md" onClick={() => handleOnSubmit()}>Сохранить</button>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
}

export default ModalChildInfo;