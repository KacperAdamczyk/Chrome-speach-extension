/* @flow */
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import type {History} from '../../../../models/history';
import HistoryLogEntry from './HistoryLogEntry/HistoryLogEntry';
import './HistoryLogger.css';
import {clearHistory} from '../../../../store/actions';

type Props = {
    history: History[],
    clearHistory: () => void
}

class HistoryLoggerBase extends Component<Props> {
    logRef = React.createRef();

    componentDidUpdate() {
            this.logRef.current.scrollTop = this.logRef.current.scrollHeight;
    }

    render() {
        return (
            <Fragment>
                <div className='history-log' ref={this.logRef}>
                    <span className='history-log__title'>History:</span>
                    {this.props.history.map((entry, i) => <HistoryLogEntry key={i} entry={entry}/>)}
                </div>
                {
                    !!this.props.history.length &&
                    <button type="button" className="btn btn-primary history-log__clear-button" onClick={this.props.clearHistory}>Clear</button>
                }
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        history: state.history
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clearHistory: () => dispatch(clearHistory())
    };
}

const HistoryLogger = connect(mapStateToProps, mapDispatchToProps)(HistoryLoggerBase);

export default HistoryLogger;