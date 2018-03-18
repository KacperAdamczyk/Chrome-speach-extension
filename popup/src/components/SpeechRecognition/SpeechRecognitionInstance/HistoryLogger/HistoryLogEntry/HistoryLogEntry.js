import React from 'react';

import {History} from '../../../../../models/history';

type Props = {
    entry: History
};

function HistoryLogEntry(props: Props) {
    return (
      <div>{props.entry.command}</div>
    );
}

export default HistoryLogEntry;