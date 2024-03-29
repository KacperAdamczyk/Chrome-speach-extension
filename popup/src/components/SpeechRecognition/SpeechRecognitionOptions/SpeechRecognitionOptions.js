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
            <section className='option-section'>
                <select className='custom-select' value={this.props.settings.lang} onChange={this.handleLangInputChange}>
                    {Object.keys(this.props.commands).map(lang => <option value={lang} key={lang}>{lang}</option>)}
                </select>
            </section>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        commands: state.commands,
        settings: state.settings
    };
}

const mapDispatchToProps = {
    setSettings
};

const SpeechRecognitionOptions = connect(mapStateToProps, mapDispatchToProps)(SpeechRecognitionOptionsBase);

export default SpeechRecognitionOptions;
