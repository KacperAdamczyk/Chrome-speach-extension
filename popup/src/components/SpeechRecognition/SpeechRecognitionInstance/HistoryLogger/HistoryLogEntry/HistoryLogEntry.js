/* @flow */
import React from 'react';

import type {History} from '../../../../../models/history';

import './HistoryLogEntry.css';

type Props = {
    entry: History
};

function HistoryLogEntry(props: Props) {
    return (
        <div
            className={`alert history-log-entry ${props.entry.recognised ? 'alert-success' : 'alert-danger'}`}>
            <div className="history-log-entry__command">{props.entry.command}</div>
            <div className="history-log-entry__time">{props.entry.time}</div>
        </div>
    );
}

export default HistoryLogEntry;