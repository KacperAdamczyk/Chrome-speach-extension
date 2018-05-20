/* @flow */
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import type {State} from '../../../store/store';
import {addHistory} from '../../../store/actions';
import type {Settings} from '../../../models/settings';
import type {History} from '../../../models/history';
import HistoryLogger from './HistoryLogger/HistoryLogger';
import CommandRecognition from './CommandRecognition';
import CommandExecutor from './CommandExecutor';
import CommandPreview from './CommandPreview/CommandPreview';

import './SpeechRecognitionInstance.css';

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
        this.speech.maxAlternatives = 2;

        this.speech.onresult = response => {
            let commandHistory = [];
            const recognised = Object.values(response.results[0])
                .some(result => {
                    const transcript = (result: any).transcript.toLowerCase();
                     const recognisedCommand = CommandRecognition.recogniseCommand(transcript);
                    commandHistory.push(transcript);
                     if (recognisedCommand) {
                         CommandRecognition.addToExecutionQueue(recognisedCommand);
                         return true;
                     }
                     return false;
                });

            this.props.addHistory(({
                command: commandHistory.join(' | '),
                recognised
            }: History));
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
                <div className="indicator">
                    <span className='indicator__icon'>
                        <div className='indicator__icon__halo'/>
                        <i className='material-icons'>mic</i>
                    </span>
                    <span><small><strong>Listening</strong></small></span>
                </div>
                <div>
                    <CommandPreview/>
                    <HistoryLogger/>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        settings: state.settings
    };
}

const mapDispatchToProps = {
    addHistory
};

const SpeechRecognitionInstance = connect(mapStateToProps, mapDispatchToProps)(SpeechRecognitionInstanceBase);

export default SpeechRecognitionInstance;
