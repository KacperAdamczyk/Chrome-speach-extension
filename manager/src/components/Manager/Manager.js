/* @flow */
import React, {Fragment} from 'react';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';

import {selectedCommand, selectedLang, selectedPage} from '../../store/selectors';
import CodeEditor from './CodeEditor/CodeEditor';
import type {Command} from '../../models/command';
import PageSelector from './PageSelector/PageSelector';
import LangSelector from './LangSelector/LangSelector';
import CommandSelector from './CommandSelector/CommandSelector';
import MetatagsInfo from './MetatagsInfo/MetatagsInfo';

import './Manager.css';

type Props = {
    selectedPage: ?string,
    selectedLang: ?string,
    selectedCommand: ?Command,
}

let Manager = (props: Props) => {
    const isLangSelectorVisible = !!props.selectedPage;
    const isCommandSelectorVisible = isLangSelectorVisible && !!props.selectedLang;
    const isCommandEditorVisible = isCommandSelectorVisible && !!props.selectedCommand;
    return (
        <Fragment>
            <div className='manager-toolbar'>
                <button className='btn btn-primary btn-sm'>Reset to default</button>
            </div>
            <div className='manager'>
                <PageSelector/>
                <CSSTransition in={isLangSelectorVisible} timeout={500} classNames="manager__element-" unmountOnExit>
                    <LangSelector/>
                </CSSTransition>

                <CSSTransition in={isCommandSelectorVisible} timeout={500} classNames="manager__element-" unmountOnExit>
                    <CommandSelector/>
                </CSSTransition>

                <CSSTransition in={isCommandEditorVisible} timeout={500} classNames="manager__element-" unmountOnExit>
                    <div>
                        <CodeEditor/>
                        <MetatagsInfo/>
                    </div>
                </CSSTransition>
            </div>
        </Fragment>
    );
};

const mapStateToProps = createSelector(
    selectedPage,
    selectedLang,
    selectedCommand,
    (selectedPage, selectedLang, selectedCommand) => ({
        selectedPage,
        selectedLang,
        selectedCommand
    })
);

Manager = connect(mapStateToProps)(Manager);

export default Manager;