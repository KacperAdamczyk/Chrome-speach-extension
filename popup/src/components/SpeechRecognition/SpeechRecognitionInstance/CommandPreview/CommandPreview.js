/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import type {State as StoreState} from '../../../../store/store';
import type {Command} from '../../../../models/command';

import './CommandPreview.css';

type Props = {
    commands: Command[],
}

type State = {
    showCommands: boolean
}

class CommandPreviewBase extends Component<Props, State> {
    state = {
        showCommands: false
    };

    handleChange = (e) => this.setState({showCommands: e.target.checked});

    render() {
        return (
            <div className='command-preview'>
                <div className="custom-control custom-checkbox command-preview__toolbar">
                    <input type="checkbox" className="custom-control-input" id="showCommands"
                           value={this.state.showCommands} onChange={this.handleChange}/>
                    <label className="custom-control-label" htmlFor="showCommands">Show available commands</label>
                    <a href='manager.html' target='_blank' className='command-preview__toolbar__link'>
                        <button className='btn btn-outline-primary btn-sm'><i className='material-icons'>settings</i></button>
                    </a>
                </div>
                {
                    this.state.showCommands &&
                    <ul className='command-preview__list'>
                        {this.props.commands.map(command => <li key={command.voiceCommand}>{command.voiceCommand}</li>)}
                    </ul>
                }
            </div>
        );
    }
}

function mapStateToProps(state: StoreState) {
    return {
        commands: state.commands[state.settings.lang],
    };
}

const CommandPreview = connect(mapStateToProps)(CommandPreviewBase);

export default CommandPreview;