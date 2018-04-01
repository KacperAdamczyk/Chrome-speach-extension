/* @flow */
import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import type {History} from '../../../../models/history';
import HistoryLogEntry from './HistoryLogEntry/HistoryLogEntry';
import './HistoryLogger.css';
import {clearHistory} from '../../../../store/actions';

type Props = {
    history: History[],
    clearHistory: () => void
}

let HistoryLogger = (props: Props) => {
    return (
        <Fragment>
            <div className='history-log'>
                <span className='history-log__title'>History:</span>
                {props.history.map((entry, i) => <HistoryLogEntry key={i} entry={entry}/>)}
            </div>
            {
                !!props.history.length &&
                <button type="button" className="btn btn-primary history-log__clear-button" onClick={props.clearHistory}>Clear</button>
            }
        </Fragment>
    );
};

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

HistoryLogger = connect(mapStateToProps, mapDispatchToProps)(HistoryLogger);

export default HistoryLogger;