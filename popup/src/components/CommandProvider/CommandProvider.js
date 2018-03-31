/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setCommands} from '../../store/actions';
import type {Command} from '../../models/command';
import type {CommandPage} from '../../models/commandPage';

declare var chrome: any;

type Props = {
    children: any,
    commands: CommandPage,
    setCommands: (commands: Command[]) => void
}

type State = {
    loading: boolean
};

class CommandProviderBase extends Component<Props, State> {
    componentDidMount() {
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
            tabs => chrome.runtime.sendMessage({type: 'GET_COMMANDS', payload: tabs[0].url},
                commands => this.props.setCommands(commands))
        );
    }

    render() {
        return (
            Object.keys(this.props.commands).length ?
            this.props.children :
                <div>There is no commands matching this website.</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        commands: state.commands
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCommands: (commands) =>dispatch(setCommands(commands))
    };
}

const CommandProvider = connect(mapStateToProps, mapDispatchToProps)(CommandProviderBase);

export default CommandProvider;