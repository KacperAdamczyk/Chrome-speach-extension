/* @flow */
import React, {Component, Fragment} from 'react';

import type {State} from '../../../store/store';
import {addHistory} from '../../../store/actions';
import type {Settings} from '../../../models/settings';
import type {History} from '../../../models/history';
import {connect} from 'react-redux';
import HistoryLogger from './HistoryLogger/HistoryLogger';
import CommandRecognition from './CommandRecognition';
import CommandExecutor from './CommandExecutor';

type Props = {
    settings: Settings,
    addHistory: (history: History) => void
}

class SpeechRecognitionInstanceBase extends Component<Props> {
    BrowserSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speech: any;
    commandExecutor: CommandExecutor;

    componentDidMount() {
        this.speech = new this.BrowserSpeechRecognition();
        this.speech.lang = this.props.settings.lang;
        this.speech.continous = true;

        this.speech.onresult = response => {
            const command = response.results[0][0].transcript;

            const recognised = CommandRecognition.recogniseCommand(command);
            this.props.addHistory(({command, recognised}: History));
        };
        this.speech.onend = () => this.speech.start();

        this.speech.start();

        this.commandExecutor = new CommandExecutor();
    }

    componentDidUpdate() {
        this.speech.lang = this.props.settings.lang;
    }

    componentWillUnmount() {
        this.commandExecutor.closeSubscription();
    }

    render() {
        return (
            <Fragment>
                <div className="status">
                    <i className="material-icons status__icon">&#xE029;</i>
                    <span>Listening</span>
                </div>
                <div>
                    <HistoryLogger/>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        settings: state.settings,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addHistory: (history: History) => dispatch(addHistory(history))
    };
}

const SpeechRecognitionInstance = connect(mapStateToProps, mapDispatchToProps)(SpeechRecognitionInstanceBase);

export default SpeechRecognitionInstance;
