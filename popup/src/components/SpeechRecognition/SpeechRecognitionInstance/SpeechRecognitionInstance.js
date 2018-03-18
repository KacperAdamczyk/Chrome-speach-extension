/* @flow */
import React, {Component} from 'react';

import {State} from "../../../store/store";
import {addHistory} from "../../../store/actions";
import {Settings} from "../../../models/settings";
import {connect} from "react-redux";
import HistoryLogger from "./HistoryLogger/HistoryLogger";
import CommandRecognition from "./CommandRecognition";
import CommandExecutor from "./HistoryLogger/CommandExecutor";

type Props = {
    settings: Settings,
    addHistory: (history: History) => void
}

class SpeechRecognitionInstanceBase extends Component<Props> {
    BrowserSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

    componentDidMount() {
        // const grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase + ';';
        // const speechRecognitionList = new this.SpeechGrammarList();
        // speechRecognitionList.addFromString(grammar, 1);

        this.speech = new this.BrowserSpeechRecognition();
        this.speech.lang = this.props.settings.lang;

        this.speech.continous = true;
        // this.speech.grammars = speechRecognitionList;

        this.speech.onresult = response => {
            console.log(response);
            const command = response.results[0][0].transcript;

            const recognised = CommandRecognition.recogniseCommand(command);
            this.props.addHistory({command, recognised});
        };
        this.speech.onend = () => this.speech.start();

        this.speech.start();

        this.commandExecutor = new CommandExecutor();
    }

    componentWillUnmount() {
        this.commandExecutor.closeSubscription();
    }

    render() {
        return (
            <div>
                <HistoryLogger/>
            </div>
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
    }
}

const SpeechRecognitionInstance = connect(mapStateToProps, mapDispatchToProps)(SpeechRecognitionInstanceBase);

export default SpeechRecognitionInstance;