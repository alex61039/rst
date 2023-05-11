import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as structureActions from './structure.actions';
import * as dictionaryActions from './../../Dictionary/dictionary.actions';
import StructureParent from './structureParent';
import ModalAddInstitution from './../../../components/modals/modalAddInstitution';
import ModalAddStructure from './../../../components/modals/modalAddStructure';
import ModalDeleteFailed from './../../../components/modals/modalDeleteFailed';
import ModalDeleteStructure from './../../../components/modals/modalDeleteStructure';

class Structure extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalAddStructureDisplay: false,
            modalEditStructureDisplay: false,
            modalDeleteDisplay: false,
            modalDeleteFailedDisplay: false,
            modalAddInstitutionDisplay: false,
            selectedItemToDelete: 0,
            selectedItemToEdit: 0
        }

        const { ListStuctures, ListCities, ListDistricts, ListMunicipalUnions } = this.props;
        ListStuctures();
        ListCities();
        ListDistricts();
        ListMunicipalUnions();

        this.handleSelectParent = this.handleSelectParent.bind(this);
        this.handleOnChangeNewStructure = this.handleOnChangeNewStructure.bind(this);
        this.handleSubmitAddStructure = this.handleSubmitAddStructure.bind(this);
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
        this.handleOnChangeInstitutionField = this.handleOnChangeInstitutionField.bind(this);
        this.handleOnChangeInstitutionSelect = this.handleOnChangeInstitutionSelect.bind(this);
        this.handleOnSubmitInstitution = this.handleOnSubmitInstitution.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps, context) {
        this.setState({ modalDeleteFailedDisplay: nextProps.structure.deleteFailed })
    }

    handleSelectParent(id, name) {
        let struct = {
            id: id,
            name: name
        }
        console.log(struct)
        const { structure, ChangeSelectedField, ListStuctures } = this.props;
        let selectedItems = structure.selectedStructures;
        if (selectedItems.length === 0 && id !== null) {
            selectedItems.push(struct);
        } else if (id === null) {
            selectedItems = [];
        } else {
            let item = selectedItems.find(t => t.id === id);
            let ind = selectedItems.indexOf(item);
            if (ind !== -1) {
                selectedItems.splice(0, ind);
            } else {
                selectedItems.push(struct);
            }

            for (let i = 0; i < selectedItems.length; i++) {
                if (selectedItems.length - 1 - i > 0) {
                    let a = selectedItems[selectedItems.length - 1 - i];
                    let b = selectedItems[i];
                    selectedItems[i] = a;
                    selectedItems[selectedItems.length - 1 - i] = b;
                }
            }
        }


        ChangeSelectedField("selectedStructures", selectedItems);
        ListStuctures(id);
    }

    handleSubmitAddStructure() {
        const { AddStructure, structure, ListStuctures } = this.props;
        AddStructure(structure.structure);
        ListStuctures(structure.structure.parentId);
    }

    handleOnChangeNewStructure(field, value) {
        const { ChangeDataField, structure } = this.props;
        if (structure.selectedStructures && structure.selectedStructures.length > 0) {
            ChangeDataField("parentId", structure.selectedStructures[0].id);
        } else {
            ChangeDataField("parentId", null);
        }

        ChangeDataField(field, value);
    }

    handleConfirmDelete(id) {
        this.setState({ selectedItemToDelete: id, modalDeleteDisplay: true })
    }

    handleOnDelete() {
        const { DeleteStructure } = this.props;
        DeleteStructure(this.state.selectedItemToDelete)
        this.setState({ selectedItemToDelete: 0, modalDeleteDisplay: false })
    }

    handleOnChangeInstitutionField(e) {
        const { ChangeInstitutionField } = this.props;
        ChangeInstitutionField(e.target.name, e.target.value);
    }

    handleOnChangeInstitutionSelect(field, e) {
        const { ChangeInstitutionField } = this.props;
        ChangeInstitutionField(field, e.value);
    }

    handleOnSubmitInstitution() {
        const { AddInstitution, structure } = this.props;
        structure.institution.structureId = this.state.selectedItemToEdit;
        AddInstitution(structure.institution)
        this.setState({ selectedItemToEdit: 0, modalAddInstitutionDisplay: false });
    }

    handleOnSubmitEditStructure(id, name) {
        const { EditStructure } = this.props;
        EditStructure(id, name);
    }

    render() {
        const { structure, dictionary } = this.props;
        return (
            <>
                <ModalAddInstitution
                    isDisplay={this.state.modalAddInstitutionDisplay}
                    onClose={() => this.setState({ modalAddInstitutionDisplay: false, selectedItemToEdit: 0 })}
                    onSubmit={this.handleOnSubmitInstitution}
                    onChangeField={this.handleOnChangeInstitutionField}
                    onSelect={this.handleOnChangeInstitutionSelect}
                    districts={dictionary.dictionaries}
                    municipalUnions={dictionary.districts}
                    data={structure.institution}
                    actionTitle="Создать учреждение"
                />
                <ModalDeleteFailed
                    isDisplay={this.state.modalDeleteFailedDisplay}
                    onClose={() => this.setState({ modalDeleteFailedDisplay: false })}
                    onSubmit={() => this.setState({ modalDeleteFailedDisplay: false })} />
                <ModalDeleteStructure
                    isDisplay={this.state.modalDeleteDisplay}
                    onClose={() => this.setState({ modalDeleteDisplay: false })}
                    onSubmit={this.handleOnDelete} />
                <ModalAddStructure isDisplay={this.state.modalAddStructureDisplay}
                    onClose={() => this.setState({ modalAddStructureDisplay: false })}
                    onSubmit={this.handleSubmitAddStructure}
                    onChangeField={this.handleOnChangeNewStructure}
                    name={structure.structure.name}
                    nameValid={true}
                    actionTitle="Добавить" />
                <div className="col-md-6 col-sm-10">
                    <div className="main-content">
                        <div className="c-structure">
                            <h2 className="e-title--md">Структура РОСТ</h2>
                            <div className="c-structure__wrapper">
                                <button type="button" className="c-structure__menu e-btn e-btn--filled">Уровни</button>
                                {
                                    (structure && structure.structures && structure.structures.children) ?
                                        structure.structures.children.map((item, i) => {
                                            return (
                                                <StructureParent
                                                    id={item.id} name={item.name} key={i}
                                                    institutions={item.institutions}
                                                    onSelectParent={this.handleSelectParent}
                                                    onDelete={this.handleConfirmDelete}
                                                    onAddInstitution={() => this.setState({ modalAddInstitutionDisplay: true, selectedItemToEdit: item.id })}
                                                    onEditSubmit={this.handleOnSubmitEditStructure.bind(this)}
                                                />
                                            );
                                        })
                                        : ''
                                }
                                <button type="button" className="e-btn e-btn--outline c-structure__add" onClick={() => this.setState({ modalAddStructureDisplay: true })}>Добавить структуру</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="right-side">
                        <div className="c-structure-sidebar">
                            <div className="mobile-burger__head">
                                <button type="button" className="mobile-burger__btn js-close-mmenu mobile-burger__close"><span></span></button>
                            </div>
                            <ul className="c-structure-sidebar__list h-reset-list">
                                {
                                    structure && structure.selectedStructures.map((item, i) => {
                                        return (
                                            <li className="c-structure-sidebar__item" key={i}>
                                                <a href="#" onClick={() => this.handleSelectParent(item.id, item.name)}>{item.name}</a>
                                            </li>
                                        );
                                    })
                                }
                                <li className="c-structure-sidebar__item"><a href="#" onClick={() => this.handleSelectParent(null, "Верхний уровень")}>Верхний уровень</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        structure: state.structure,
        dictionary: state.dictionary
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { ...structureActions, ...dictionaryActions },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Structure);