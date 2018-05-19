/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import AceEditor from 'react-ace';
import {CSSTransition} from 'react-transition-group';
import {createSelector} from 'reselect';


import type {Command} from '../../../models/command';
import {selectedCommand, selectedLang, selectedPage} from '../../../store/selectors';
import {editCommand, selectCommand} from '../../../store/actions';

import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import './CodeEditor.css';

type Props = {
    selectCommand: (command: ?Command) => void,
    selectedPage: string,
    selectedLang: string,
    selectedCommand: ?Command,
    editCommand: (command: Command, selectedPage: string, selectedLang: string, selectedCommand: ?Command) => void,
};

type State = {
    value: string,
    sync: boolean
}

class CodeEditorBase extends Component<Props, State> {
    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        const oldVC = prevState.value;
        const newVC = nextProps.selectedCommand && nextProps.selectedCommand.voiceCommand;
        const newCode = nextProps.selectedCommand && nextProps.selectedCommand.codeJS;
        return newVC === oldVC ? null : {value: newCode || '', sync: true};
    }

    state = {
        value: '',
        sync: false
    };

    onEdit = () => {
        if (this.state.sync) return;

        const newCommand: Command = {
            voiceCommand: (this.props.selectedCommand && this.props.selectedCommand.voiceCommand) || '',
            codeJS: this.state.value
        };
        this.props.editCommand(newCommand, this.props.selectedPage, this.props.selectedLang, this.props.selectedCommand);
        this.props.selectCommand(newCommand);
        this.setState({sync: true});
    };
    onChange = (value: string) => this.setState({
        value,
        sync: value === (this.props.selectedCommand && this.props.selectedCommand.codeJS)
    });

    render() {
        return (
            <div>
                <h3>JavaScript Action</h3>
                <AceEditor mode="javascript" theme="tomorrow" name="code-editor" fontSize={14}
                           showPrintMargin={true} showGutter={true} highlightActiveLine={true}
                           height={'45vh'} width={'100%'}
                           value={this.state.value}
                           onChange={this.onChange}
                           setOptions={{
                               enableBasicAutocompletion: true,
                               enableLiveAutocompletion: true,
                               showLineNumbers: true,
                               tabSize: 4,
                           }}
                           editorProps={{$blockScrolling: Infinity}}/>
                <div className='code-editor__toolbar'>
                    <button className='btn btn-primary btn-sm' onClick={this.onEdit}>
                        <i className='material-icons'>edit</i>
                    </button>
                    <CSSTransition in={this.state.sync} timeout={200} classNames='code-editor__toolbar__sync' unmountOnExit>
                        <i className='material-icons code-editor__toolbar__sync'>done</i>
                    </CSSTransition>
                </div>
            </div>
        );
    }
}

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

const mapDispatchToProps = {
    selectCommand,
    editCommand
};

const CodeEditor = connect(mapStateToProps, mapDispatchToProps)(CodeEditorBase);

export default CodeEditor;