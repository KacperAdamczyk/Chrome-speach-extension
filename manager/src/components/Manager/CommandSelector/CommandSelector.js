/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import type {Command} from '../../../models/command';
import ListSelector from '../../ListSelector/ListSelector';
import {commandsSelector, selectedCommand, selectedLang, selectedPage} from '../../../store/selectors';
import {addNewCommand, deleteCommand, editCommand, selectCommand} from '../../../store/actions';
import Editor from '../../Editor/Editor';
import CommandExtender from '../../Editor/CommandExtender/CommandExtender';

type Props = {
    commands: ?Command[],
    selectCommand: (command: ?Command) => void,
    selectedPage: string,
    selectedLang: string,
    selectedCommand: ?Command,
    addNewCommand: (command: Command, selectedPage: string, selectedLang: string) => void,
    editCommand: (command: Command, selectedPage: string, selectedLang: string, selectedCommand: ?Command) => void,
    deleteCommand: (selectedPage: string, selectedLang: string, selectedCommand: ?Command) => void
}

class CommandSelectorBase extends Component<Props> {
    regexp = /[a-z0-9 ]/g;
    commandKeyExtractor = (command: ?Command) => command ? command.voiceCommand : '';

    onAdd = (voiceCommand: string) => {
        const newCommand = {voiceCommand, codeJS: ''};
        this.props.addNewCommand(newCommand, this.props.selectedPage, this.props.selectedLang);
        this.props.selectCommand(newCommand);
    };
    onEdit = (voiceCommand: string) => {
        const editTo = {voiceCommand, codeJS: (this.props.selectedCommand && this.props.selectedCommand.codeJS) || ''};
        this.props.editCommand(editTo, this.props.selectedPage, this.props.selectedLang, this.props.selectedCommand);
        this.props.selectCommand(editTo);
    };
    onDelete = () => {
        this.props.deleteCommand(this.props.selectedPage, this.props.selectedLang, this.props.selectedCommand);
        this.props.selectCommand(null);
    };

    render() {
        return (
            <div>
                <h3>Command</h3>
                <ListSelector itemList={this.props.commands} selected={this.props.selectedCommand}
                              onSelect={this.props.selectCommand} keyExtractor={this.commandKeyExtractor}>
                    <Editor selected={this.commandKeyExtractor(this.props.selectedCommand)}
                            onAdd={this.onAdd} onEdit={this.onEdit} onDelete={this.onDelete}
                            placeholder='command' filter={this.regexp}>
                        {
                            (setTransformer) => (
                                <CommandExtender setTransformer={setTransformer}/>
                            )
                        }
                    </Editor>
                </ListSelector>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    commandsSelector,
    selectedPage,
    selectedLang,
    selectedCommand,
    (commands, selectedPage, selectedLang, selectedCommand) => ({
        commands,
        selectedPage,
        selectedLang,
        selectedCommand
    })
);

const mapDispatchToProps = {
    selectCommand,
    addNewCommand,
    editCommand,
    deleteCommand
};

const CommandSelector = connect(mapStateToProps, mapDispatchToProps)(CommandSelectorBase);

export default CommandSelector;
