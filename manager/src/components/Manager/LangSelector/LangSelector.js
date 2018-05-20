/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import ListSelector from '../../ListSelector/ListSelector';
import {languagesSelector, selectedLang, selectedPage,} from '../../../store/selectors';
import {addNewLang, deleteLang, editLang, selectLang} from '../../../store/actions';
import LangEditor from '../../LangEditor/LangEditor';

type Props = {
    languages: ?string[],
    selectLang: (lang: ?string) => void,
    selectedPage: ?string,
    selectedLang: ?string,
    addNewLang: (lang: string, selectedPage: string) => void,
    editLang: (lang: string, selectedPage: string, selectedLang: string) => void,
    deleteLang: (selectedPage: string, selectedLang: string) => void
}

class LangSelectorBase extends Component<Props> {
    onAdd = (lang: string) => {
        if (this.props.selectedPage) {
            this.props.addNewLang(lang, this.props.selectedPage);
            this.props.selectLang(lang);
        }
    };
    onEdit = (lang: string) => {
        if (this.props.selectedPage && this.props.selectedLang) {
            this.props.editLang(lang, this.props.selectedPage, this.props.selectedLang);
            this.props.selectLang(lang);
        }
    };
    onDelete = () => {
        if (this.props.selectedPage && this.props.selectedLang) {
            this.props.deleteLang(this.props.selectedPage, this.props.selectedLang);
            this.props.selectLang(null);
        }
    };

    render() {
        return (
            <div>
                <h3>Language</h3>
                <ListSelector itemList={this.props.languages} selected={this.props.selectedLang}
                              onSelect={this.props.selectLang}>
                    <LangEditor selected={this.props.selectedLang} onAdd={this.onAdd} onEdit={this.onEdit}
                                onDelete={this.onDelete}/>
                </ListSelector>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    languagesSelector,
    selectedPage,
    selectedLang,
    (languages, selectedPage, selectedLang) => ({
        languages,
        selectedPage,
        selectedLang
    })
);

const mapDispatchToProps = {
    selectLang,
    addNewLang,
    editLang,
    deleteLang
};

const LangSelector = connect(mapStateToProps, mapDispatchToProps)(LangSelectorBase);

export default LangSelector;