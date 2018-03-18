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
            {props.entry.command}
        </div>
    );
}

export default HistoryLogEntry;