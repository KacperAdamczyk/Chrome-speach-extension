/* @flow */
import React from 'react';
import {connect} from "react-redux";

import {History} from '../../../../models/history';
import HistoryLogEntry from "./HistoryLogEntry/HistoryLogEntry";

import './HistoryLogger.css';

type Props = {
    history: History[]
}

let HistoryLogger = (props: Props) => {
    return (
        <div className='history-logger'>
            {props.history.map((entry, i) => <HistoryLogEntry key={i} entry={entry}/>)}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        history: state.history
    };
}

HistoryLogger = connect(mapStateToProps)(HistoryLogger);

export default HistoryLogger;