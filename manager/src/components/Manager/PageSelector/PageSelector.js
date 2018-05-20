/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import ListSelector from '../../ListSelector/ListSelector';
import Editor from '../../Editor/Editor';
import {pagesSelector, selectedPage} from '../../../store/selectors';
import {addNewPage, deletePage, editPage, selectPage} from '../../../store/actions';

type Props = {
    pages: string[],
    selected: ?string,
    selectPage: (page: ?string) => void,
    addNewPage: (page: string) => void,
    editPage: (page: string, selectedPage: ?string) => void,
    deletePage: (page: string) => void
}

class PageSelectorBase extends Component<Props> {
    onAdd = (page: string) => {
        this.props.addNewPage(page);
        this.props.selectPage(page);
    };
    onEdit = (page: string) => {
        this.props.editPage(page, this.props.selected);
        this.props.selectPage(page);
    };
    onDelete = () => void (this.props.selected && this.props.deletePage(this.props.selected) && this.props.selectPage(null));

    render() {
        return (
            <div>
                <h3>Page</h3>
                <ListSelector itemList={this.props.pages} selected={this.props.selected} onSelect={this.props.selectPage}>
                    <Editor selected={this.props.selected} placeholder='page regexp'
                            onAdd={this.onAdd} onEdit={this.onEdit} onDelete={this.onDelete}/>
                </ListSelector>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    pagesSelector,
    selectedPage,
    (pages, selected) => ({
        pages,
        selected,
    })
);

const mapDispatchToProps = {
    selectPage,
    addNewPage,
    editPage,
    deletePage
};

const PageSelector = connect(mapStateToProps, mapDispatchToProps)(PageSelectorBase);

export default PageSelector;
