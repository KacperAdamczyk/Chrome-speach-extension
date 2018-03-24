/* @flow */
import React from 'react';

import {History} from '../../../../../models/history';

import './HistoryLogEntry.css';

type Props = {
    entry: History
};

function HistoryLogEntry(props: Props) {
    return (
        <div className={`log-entry ${props.entry.recognised ? 'log-entry--recognised' : 'log-entry--unrecognised'}`}>
            <div className="log-entry__command">{props.entry.command}</div>
            <div className="log-entry__time">{props.entry.time}</div>
        </div>
    );
}

export default HistoryLogEntry;