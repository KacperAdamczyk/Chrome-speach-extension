/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import type {State} from '../../../store/store';
import type {Settings} from '../../../models/settings';
import {setSettings} from '../../../store/actions';

import './SpeechRecognitionOptions.css';

type Props = {
    commands: any,
    settings: Settings;
    setSettings: (settings: Settings) => void
}

class SpeechRecognitionOptionsBase extends Component<Props> {
    handleLangInputChange = (e) => {
        this.props.setSettings({lang: e.target.value});
    };

    render() {
        return (
            <div className="options">
                <select value={this.props.settings.lang} onChange={this.handleLangInputChange}>
                    {Object.keys(this.props.commands).map(lang => <option value={lang}>{lang}</option>)}
                </select>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        commands: state.commands,
        settings: state.settings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSettings: (settings: Settings) => dispatch(setSettings(settings))
    };
}

const SpeechRecognitionOptions = connect(mapStateToProps, mapDispatchToProps)(SpeechRecognitionOptionsBase);

export default SpeechRecognitionOptions;
