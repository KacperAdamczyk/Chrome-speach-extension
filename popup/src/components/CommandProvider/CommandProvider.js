/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setCommands, setSettings} from '../../store/actions';
import type {CommandPage} from '../../models/commandPage';
import {Settings} from '../../models/settings';

import './CommandProvider.css';

declare var chrome: any;

type Props = {
    children: any,
    commands: CommandPage,
    setCommands: (commands: CommandPage) => void,
    setSettings: (settings: Settings) => void
}

type State = {
    loading: boolean
};

class CommandProviderBase extends Component<Props, State> {
    componentDidMount() {
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
            tabs => chrome.runtime.sendMessage({type: 'GET_COMMANDS', payload: tabs[0].url},
                commands => this.setCommands(commands)
            )
        );
    }

    setCommands(commands: CommandPage) {
        this.props.setCommands(commands);
        const langs = Object.keys(commands);
        if (!langs.includes('en-US')) this.props.setSettings({lang: langs[0]});
    }

    render() {
        return (
            Object.keys(this.props.commands).length ?
                this.props.children :
                <div className='no-commands'>
                    <span>There are no commands defined that match this website.</span>
                    <a href='manager.html' target='_blank'>
                        <button className='btn btn-outline-primary'>Command manager</button>
                    </a>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        commands: state.commands
    };
}

const mapDispatchToProps = {
    setCommands,
    setSettings
};

const CommandProvider = connect(mapStateToProps, mapDispatchToProps)(CommandProviderBase);

export default CommandProvider;